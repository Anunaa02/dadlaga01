// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyProfile from '../components/MyProfile.vue'
import UserProfile from '../components/UserProfile.vue'
import Login from '../components/Login.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/profile', name: 'MyProfile', component: MyProfile },
  { path: '/login', name: 'Login', component: Login },
  { path: '/user/:username', name: 'UserProfile', component: UserProfile }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
