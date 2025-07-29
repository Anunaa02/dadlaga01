<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const username = route.params.username || 'johndoe'

const user = reactive({
  name: username,
  email: `${username}@example.com`,
  bio: `This is the bio of ${username}`,
  profilePicture: 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
})

const isEditing = ref(false)
const editableUser = reactive({ name: '', email: '', bio: '' })

function onEditProfile() {
  editableUser.name = user.name
  editableUser.email = user.email
  editableUser.bio = user.bio
  isEditing.value = true
}

function onSaveProfile() {
  user.name = editableUser.name
  user.email = editableUser.email
  user.bio = editableUser.bio
  isEditing.value = false
  message.success('Profile updated successfully')
}

function onCancelEdit() {
  isEditing.value = false
}

// Avatar
const uploadingPicture = ref(false)
const selectedPictureFile = ref(null)
const selectedPictureUrl = ref(null)

function onFileChange(event) {
  const file = event.target.files[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    message.error('Please select a valid image file')
    return
  }
  if (file.size > 2 * 1024 * 1024) {
    message.error('Image must be smaller than 2MB')
    return
  }
  selectedPictureFile.value = file
  selectedPictureUrl.value = URL.createObjectURL(file)
  uploadingPicture.value = true
}

function onConfirmPicture() {
  if (!selectedPictureFile.value) return
  user.profilePicture = selectedPictureUrl.value
  selectedPictureFile.value = null
  selectedPictureUrl.value = null
  uploadingPicture.value = false
  message.success('Profile picture updated')
}

function onCancelPicture() {
  selectedPictureFile.value = null
  selectedPictureUrl.value = null
  uploadingPicture.value = false
}

// Password
const passwordFormRef = ref(null)
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordRules = {
  currentPassword: [{ required: true, message: 'Enter current password', trigger: 'blur' }],
  newPassword: [{ required: true, message: 'Enter new password', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: 'Confirm your password', trigger: 'blur' },
    {
      validator: (_, value) =>
        value !== passwordForm.newPassword
          ? Promise.reject('Passwords do not match')
          : Promise.resolve(),
      trigger: 'blur'
    }
  ]
}

function onChangePassword() {
  message.success('Password changed successfully')
  Object.assign(passwordForm, {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  passwordFormRef.value.resetFields()
}

function onLogout() {
  message.success('Logged out successfully')
  router.push('/login')
}

const posts = ref([
  {
    id: 1,
    username: 'johndoe',
    title: 'My First Post',
    summary: 'This is a short summary...',
    fullText: 'This is the full post content with more detail...',
    avatar: user.profilePicture,
    expanded: false
  },
  {
    id: 2,
    username: 'johndoe',
    title: 'Second Post',
    summary: 'Another quick look...',
    fullText: 'Here is the detailed explanation of my second post...',
    avatar: user.profilePicture,
    expanded: false
  }
])

function toggleReadMore(post) {
  post.expanded = !post.expanded
}

function goToProfile(username) {
  router.push(`/profile/${username}`)
}
</script>

<template>
  <a-card bordered class="profile-card">
    <a-row gutter="24" align="middle">
      <a-col :span="8" class="profile-pic-col">
        <div style="text-align: center;">
          <a-avatar
            :size="180"
            :src="uploadingPicture ? selectedPictureUrl : user.profilePicture"
            shape="square"
            style="cursor: pointer"
            @click="$refs.fileInput.click()"
          />
          <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="onFileChange" />
          <div v-if="uploadingPicture" style="margin-top: 12px;">
            <a-button type="primary" size="small" @click="onConfirmPicture" style="margin-right: 8px">Confirm</a-button>
            <a-button size="small" @click="onCancelPicture">Cancel</a-button>
          </div>
          <div style="margin-top: 8px; font-size: 14px; color: #666;">Click picture to change</div>
        </div>
      </a-col>

      <a-col :span="16" class="profile-info-col">
        <a-typography-title :level="3">User Profile</a-typography-title>

        <div v-if="!isEditing">
          <a-descriptions bordered :column="1" size="middle">
            <a-descriptions-item label="Name">{{ user.name }}</a-descriptions-item>
            <a-descriptions-item label="Email">{{ user.email }}</a-descriptions-item>
            <a-descriptions-item label="Bio">{{ user.bio }}</a-descriptions-item>
          </a-descriptions>
          <a-button type="primary" style="margin-top: 24px;" block @click="onEditProfile">Edit Profile</a-button>
        </div>

        <div v-else>
          <a-form layout="vertical">
            <a-form-item label="Name">
              <a-input v-model:value="editableUser.name" />
            </a-form-item>
            <a-form-item label="Email">
              <a-input v-model:value="editableUser.email" />
            </a-form-item>
            <a-form-item label="Bio">
              <a-textarea v-model:value="editableUser.bio" rows="3" />
            </a-form-item>
            <a-space>
              <a-button type="primary" @click="onSaveProfile">Save</a-button>
              <a-button @click="onCancelEdit">Cancel</a-button>
            </a-space>
          </a-form>
        </div>

        <a-button type="primary" danger style="margin-top: 24px; width: 100%" @click="onLogout">
          Log Out
        </a-button>
      </a-col>
    </a-row>
  </a-card>

  <a-card bordered class="profile-card" style="margin-top: 40px;">
    <a-typography-title :level="4">Change Password</a-typography-title>
    <a-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }" @finish="onChangePassword">
      <a-form-item label="Current Password" name="currentPassword">
        <a-input-password v-model:value="passwordForm.currentPassword" />
      </a-form-item>
      <a-form-item label="New Password" name="newPassword">
        <a-input-password v-model:value="passwordForm.newPassword" />
      </a-form-item>
      <a-form-item label="Confirm Password" name="confirmPassword">
        <a-input-password v-model:value="passwordForm.confirmPassword" />
      </a-form-item>
      <a-form-item :wrapperCol="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" block>Change Password</a-button>
      </a-form-item>
    </a-form>
  </a-card>

  <a-card bordered class="profile-card" style="margin-top: 40px;">
    <a-typography-title :level="4">Posts by {{ user.name }}</a-typography-title>
    <a-card v-for="post in posts" :key="post.id" class="mb-4" :title="post.title">
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <a-avatar :src="post.avatar" style="cursor: pointer" @click="goToProfile(post.username)" />
        <a-button type="link" @click="goToProfile(post.username)" style="margin-left: 8px;">{{ post.username }}</a-button>
      </div>
      <div>
        <p style="margin-left: 32px;">{{ post.expanded ? post.fullText : post.summary }}</p>
        <a-button type="link" size="small" style="margin-left: 32px;" @click="toggleReadMore(post)">
          {{ post.expanded ? 'Show Less' : 'Read More' }}
        </a-button>
      </div>
    </a-card>
  </a-card>
</template>

<style scoped>
.profile-card {
  max-width: 900px;
  margin: 0 auto 40px auto;
  padding: 24px;
  border-radius: 8px;
}
.profile-pic-col {
  display: flex;
  justify-content: center;
}
.profile-info-col {
  display: flex;
  flex-direction: column;
}
.mb-4 {
  margin-bottom: 16px;
}
</style>
