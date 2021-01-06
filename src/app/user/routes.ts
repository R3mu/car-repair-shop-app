import { RouteConfig } from 'vue-router/types/router';

export const UserRoutes: RouteConfig[] = [
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ './User/User.vue').then((m: any) => m.default),
  },
];
