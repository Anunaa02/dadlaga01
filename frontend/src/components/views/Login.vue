<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    })

    const token = response.data.token

    // Token хадгалах
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // Амжилттай бол post list рүү шилжинэ
    router.push('/')
  } catch (err) {
    error.value = 'Нэвтрэхэд алдаа гарлаа. Имэйл эсвэл нууц үг буруу байна.'
    console.error(err)
  }
}
</script>

<template>
  <div class="login-container">
    <h1>🔐 Нэвтрэх</h1>

    <form @submit.prevent="login">
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>Нууц үг:</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit">Нэвтрэх</button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 40px;
}
input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
}
button {
  padding: 8px 16px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
