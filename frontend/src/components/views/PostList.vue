<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

// posts массивыг бэлдэнэ
const posts = ref([])

// Компонент ачааллах үед Laravel API-с өгөгдөл татна
onMounted(async () => {
  try {
    const response = await api.get('/posts')
    posts.value = response.data
  } catch (error) {
    console.error('Өгөгдөл татахад алдаа гарлаа:', error)
  }
})
</script>

<template>
  <div class="post-list">
    <h1> Бүх постууд</h1>

    <div v-if="posts.length === 0">
      <p>Пост алга байна.</p>
    </div>

    <div v-else>
      <div
        v-for="post in posts"
        :key="post.id"
        class="post-item"
      >
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <small>🕒 Үүсгэсэн огноо: {{ new Date(post.created_at).toLocaleString() }}</small>
        <hr />
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-list {
  max-width: 700px;
  margin: auto;
  padding: 20px;
}
.post-item {
  margin-bottom: 20px;
}
</style>
