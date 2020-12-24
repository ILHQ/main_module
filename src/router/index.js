import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import(/* webpackChunkName: "Home" */ '@/pages/Home.vue');

Vue.use(VueRouter);

let routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径
  routes
});

export default router;
