import { RouteConfig } from 'vue-router/types/router';

export const RegisterRoutes: RouteConfig[] = [
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ './Register/Register.vue').then((m: any) => m.default),
  },
];
