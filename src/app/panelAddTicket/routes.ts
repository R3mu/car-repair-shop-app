import { RouteConfig } from 'vue-router/types/router';

export const PanelAddTicketRoutes: RouteConfig[] = [
  {
    path: '/panel-add-ticket',
    name: 'panelAddTicket',
    component: () => import(/* webpackChunkName: "panel-add-ticket" */ './PanelAddTicket/PanelAddTicket.vue').then((m: any) => m.default),
  },
];
