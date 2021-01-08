import { RouteConfig } from 'vue-router/types/router';

export const ChangePasswordRoutes: RouteConfig[] = [
  {
    path: '/change-password',
    name: 'changePassword',
    component: () => import(/* webpackChunkName: "change-password" */ './ChangePassword/ChangePassword.vue').then((m: any) => m.default),
  },
];
