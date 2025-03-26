import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './modules/routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
