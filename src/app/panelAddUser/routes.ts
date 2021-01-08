import { RouteConfig } from 'vue-router/types/router';

export const PanelAddUserRoutes: RouteConfig[] = [
  {
    path: '/panel-add-user',
    name: 'panelAddUser',
    component: () => import(/* webpackChunkName: "panel-add-user" */ './PanelAddUser/PanelAddUser.vue').then((m: any) => m.default),
  },
];
