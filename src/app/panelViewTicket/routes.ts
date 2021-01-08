import {RouteConfig} from 'vue-router/types/router';

export const PanelViewTicketRoutes: RouteConfig[] = [
    {
        path: '/panel-view-ticket',
        name: 'panelViewTicket',
        component: () => import(/* webpackChunkName: "panel-view-ticket" */ './PanelViewTicket/PanelViewTicket.vue').then((m: any) => m.default),
    },
];
