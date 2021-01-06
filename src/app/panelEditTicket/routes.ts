import { RouteConfig } from 'vue-router/types/router';

export const PanelEditTicketRoutes: RouteConfig[] = [
  {
    path: '/panel-edit-ticket',
    name: 'panelEditTicket',
    component: () => import(/* webpackChunkName: "panel-edit-ticket" */ './PanelEditTicket/PanelEditTicket.vue').then((m: any) => m.default),
  },
];
