<template>
  <a-card title="Welcome" style="max-width: 400px; margin: 40px auto;">
    <a-tabs v-model:activeKey="activeTab" centered>
      <!-- Login Tab -->
      <a-tab-pane key="login" tab="Login">
        <a-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginFormRef"
          :labelCol="{ span: 6 }"
          :wrapperCol="{ span: 18 }"
          @finish="onLogin"
        >
          <a-form-item label="Email" name="email" required>
            <a-input v-model:value="loginForm.email" />
          </a-form-item>

          <a-form-item label="Password" name="password" required>
            <a-input-password v-model:value="loginForm.password" />
          </a-form-item>

          <a-form-item :wrapperCol="{ offset: 6, span: 18 }">
            <a-button type="primary" html-type="submit" block>Login</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>

      <!-- Register Tab -->
      <a-tab-pane key="register" tab="Register">
        <a-form
          :model="registerForm"
          :rules="registerRules"
          ref="registerFormRef"
          :labelCol="{ span: 6 }"
          :wrapperCol="{ span: 18 }"
          @finish="onRegister"
        >
          <a-form-item label="Name" name="name" required>
            <a-input v-model:value="registerForm.name" />
          </a-form-item>

          <a-form-item label="Email" name="email" required>
            <a-input v-model:value="registerForm.email" />
          </a-form-item>

          <a-form-item label="Password" name="password" required>
            <a-input-password v-model:value="registerForm.password" />
          </a-form-item>

          <a-form-item label="Confirm" name="confirm" required>
            <a-input-password v-model:value="registerForm.confirm" />
          </a-form-item>

          <a-form-item :wrapperCol="{ offset: 6, span: 18 }">
            <a-button type="primary" html-type="submit" block>Register</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'

const activeTab = ref('login')

const loginFormRef = ref(null)
const registerFormRef = ref(null)

const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirm: ''
})

const loginRules = {
  email: [
    { required: true, message: 'Please input your email', trigger: 'blur' },
    { type: 'email', message: 'Invalid email format', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: 'Please input your password', trigger: 'blur' }
  ]
}

const registerRules = {
  name: [{ required: true, message: 'Please input your name', trigger: 'blur' }],
  email: [
    { required: true, message: 'Please input your email', trigger: 'blur' },
    { type: 'email', message: 'Invalid email format', trigger: ['blur', 'change'] }
  ],
  password: [{ required: true, message: 'Please input your password', trigger: 'blur' }],
  confirm: [
    { required: true, message: 'Please confirm your password', trigger: 'blur' },
    {
      validator: (_, value) => {
        if (!value) return Promise.reject('Please confirm your password')
        if (value !== registerForm.password) return Promise.reject('Passwords do not match')
        return Promise.resolve()
      },
      trigger: 'blur'
    }
  ]
}

function onLogin() {
  // Replace with your real login logic
  message.success(`Logged in as ${loginForm.email}`)
  // Example: redirect to profile page here if you want
  // router.push('/profile')
}

function onRegister() {
  // Replace with your real registration logic
  message.success(`Registered user ${registerForm.email}`)
  // After registration, switch to login tab
  activeTab.value = 'login'
}
</script>

<style scoped>
/* Optional styling for centering card */
</style>
