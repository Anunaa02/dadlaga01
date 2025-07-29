<!-- src/components/UserProfile.vue -->
<template>
  <a-card bordered class="profile-card">
    <a-row gutter="24" align="middle">
      <a-col :span="8" class="profile-pic-col">
        <div style="text-align: center;">
          <a-avatar :size="150" :src="user.profilePicture" />
        </div>
      </a-col>
      <a-col :span="16">
        <a-typography-title :level="3">{{ user.name }}</a-typography-title>
        <p style="color: #888;">{{ user.bio }}</p>
      </a-col>
    </a-row>

    <a-divider />

    <a-typography-title :level="4">Posts</a-typography-title>
    <a-card v-for="post in posts" :key="post.id" class="mb-4">
      <h3>{{ post.title }}</h3>
      <p>{{ post.summary }}</p>
    </a-card>
  </a-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const user = ref({
  name: '',
  bio: '',
  profilePicture: ''
})
const posts = ref([])

onMounted(() => {
  const username = route.params.username
  // TODO: Fetch user data and posts by username from backend or local data
  // Example mock data:
  user.value = {
    name: username,
    bio: 'This is the bio of ' + username,
    profilePicture: 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
  }
  posts.value = [
    { id: 1, title: 'My first post', summary: 'This is a summary' },
    { id: 2, title: 'Second post', summary: 'Another summary' }
  ]
})
</script>

<style scoped>
.profile-card {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}
.mb-4 {
  margin-bottom: 16px;
}
</style>
