<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
// Script хэсэг шаардлагагүй (одоо router ашиглаж байгаа тул route бүр өөр өөр component ачаалдаг)
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Нүүр</router-link>
      <router-link to="/login">Нэвтрэх</router-link>
      <router-link to="/posts/create">Пост нэмэх</router-link>
    </nav>

    <router-view /> <!-- Энд route-уудын дагуу Login.vue, PostList.vue гэх мэт харагдана -->
  </div>
</template>

<style scoped>
nav {
  background: #f0f0f0;
  padding: 10px;
}
nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #333;
}
nav a.router-link-active {
  font-weight: bold;
  color: #007BFF;
}
</style>