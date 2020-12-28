import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import Home from '../views/home/home.vue';
import VideoPreview from '../views/video-preview/video-preview.vue';
import MatchChinese from '../views/match-chinese/match-chinese.vue';

Vue.use(Router);

export const constantRouterMap: RouteConfig[] = [
  {
    path: '/', name: 'Router.Home', component: Home,
    children: [
      {path: '/video-preview', name: 'Router.VideoPreview', component: VideoPreview},
      {path: '/match-chinese', name: 'Router.MatchChinese', component: MatchChinese}
    ]
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
});

export default router;
