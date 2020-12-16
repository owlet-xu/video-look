import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import HomePage from '../views/home/home.vue';

Vue.use(Router);

export const constantRouterMap: RouteConfig[] = [
  { path: '/', name: 'Router.Home', component: HomePage }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
});

export default router;
