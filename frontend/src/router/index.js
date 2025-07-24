import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import PostList from '../views/PostList.vue';
import PostCreate from '../views/PostCreate.vue';

const routes = [
  { path: '/', component: PostList },
  { path: '/login', component: Login },
  { path: '/posts/create', component: PostCreate }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
