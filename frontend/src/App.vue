<script setup>
// No logic yet
</script>

<template>
  <a-layout>
    <!-- Only show navbar if NOT on /login -->
    <a-layout-header v-if="$route.path !== '/login'">
      <div class="logo">PostHub</div>
      <a-menu mode="horizontal" theme="dark" :selectedKeys="[selectedKey]">
        <a-menu-item key="home">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item key="profile">
          <router-link to="/profile">Profile</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    <!-- Main content -->
    <a-layout-content style="padding: 24px">
      <router-view />
    </a-layout-content>

    <a-layout-footer v-if="$route.path !== '/login'" style="text-align: center">
      PostHub ©2025
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  computed: {
    selectedKey() {
      return this.$route.path === '/profile' ? 'profile' : 'home'
    }
  }
}
</script>


<style scoped>
.logo {
  color: white;
  font-size: 24px;
  float: left;
  margin-right: 24px;
}
</style>
