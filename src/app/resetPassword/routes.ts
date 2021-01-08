import { RouteConfig } from 'vue-router/types/router';

export const ResetPasswordRoutes: RouteConfig[] = [
  {
    path: '/reset-password',
    name: 'resetPassword',
    component: () => import(/* webpackChunkName: "reset-password" */ './ResetPassword/ResetPassword.vue').then((m: any) => m.default),
  },
];
