<script setup>
import { ref } from 'vue';
import api from '../services/api';

const title = ref('');
const content = ref('');

const createPost = async () => {
  try {
    await api.post('/posts', {
      title: title.value,
      content: content.value
    });
    alert('Post амжилттай нэмэгдлээ!');
    title.value = '';
    content.value = '';
  } catch (error) {
    console.error(error);
    alert('Алдаа гарлаа!');
  }
};
</script>

<template>
  <form @submit.prevent="createPost">
    <input v-model="title" placeholder="Гарчиг" />
    <textarea v-model="content" placeholder="Агуулга"></textarea>
    <button type="submit">Post нэмэх</button>
  </form>
</template>
