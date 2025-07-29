<template>
  <a-layout>
    <a-layout-content style="padding: 24px">
      <a-card v-for="post in posts" :key="post.id" class="mb-4">
        <div class="post-header">
          <a-avatar
            :src="post.avatar"
            size="large"
            style="cursor: pointer; margin-right: 10px"
            @click="goToUser(post.name)"
          />
          <a
            @click="goToUser(post.name)"
            style="font-weight: bold; font-size: 16px; cursor: pointer"
          >
            {{ post.name }}
          </a>
        </div>
        <h3 class="title">{{ post.title }}</h3>
        <p class="sum">{{ expandedPostId === post.id ? post.full : post.summary }}</p>
        <a-button type="link" class="more" @click="toggleExpand(post.id)">
          {{ expandedPostId === post.id ? 'Show Less' : 'Read More' }}
        </a-button>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const expandedPostId = ref(null)

const posts = ref([
  {
    id: 1,
    name: 'tugu',
    avatar: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
    title: 'Vue 3 Basics',
    summary: 'Intro to Vue 3...',
    full: 'This is the full content of Vue 3 Basics post...'
  },
  {
    id: 2,
    name: 'bata',
    avatar: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
    title: 'Using Ant Design Vue',
    summary: 'Enterprise UI components...',
    full: 'This is the full content of Using Ant Design Vue post...'
  }
])

function toggleExpand(postId) {
  expandedPostId.value = expandedPostId.value === postId ? null : postId
}

function goToUser(username) {
  router.push(`/user/${username}`)
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.title {
  margin-left: 16px;
}
.sum,
.more {
  margin-left: 16px;
}
</style>
