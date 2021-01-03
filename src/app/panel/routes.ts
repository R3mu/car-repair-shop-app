import { RouteConfig } from 'vue-router/types/router';

export const PanelRoutes: RouteConfig[] = [
  {
    path: '/panel',
    name: 'panel',
    component: () => import(/* webpackChunkName: "panel" */ './Panel/Panel.vue').then((m: any) => m.default),
  },
];
