import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('@/views/About.vue')
  }, {
    path: '/socket',
    name: 'socket',
    component: () => import('@/views/AboutSocket.vue')
  }]
});

export default router;