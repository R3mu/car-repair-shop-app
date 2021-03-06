import Vue from 'vue';
import VueRouter, {Route, RouteRecord} from 'vue-router';
import Meta from 'vue-meta';
import {AppRoutes} from './app/routes';
import {HomeRoutes} from './home/routes';
import {store} from '@/app/store';
import {LoginRoutes} from './login/routes';
import {RegisterRoutes} from './register/routes';
import {PanelRoutes} from './panel/routes';
import {PanelEditTicketRoutes} from './panelEditTicket/routes';
import {PanelAddTicketRoutes} from './panelAddTicket/routes';
import {UserRoutes} from './user/routes';
import {ResetPasswordRoutes} from './resetPassword/routes';
import {ChangePasswordRoutes} from './changePassword/routes';
import {PanelViewTicketRoutes} from './panelViewTicket/routes';
import { PanelAddUserRoutes } from './panelAddUser/routes';

Vue.use(VueRouter);
Vue.use(Meta);

export const router: VueRouter = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [...AppRoutes, ...HomeRoutes, ...LoginRoutes, ...RegisterRoutes, ...PanelRoutes, ...PanelEditTicketRoutes, ...PanelAddTicketRoutes, ...UserRoutes, ...ResetPasswordRoutes, ...ChangePasswordRoutes, ...PanelViewTicketRoutes, ...PanelAddUserRoutes],
    scrollBehavior(to: Route, from: Route, savedPosition: { x: number; y: number }) {
        if (to.hash) {
            return {selector: to.hash};
        }
        return savedPosition || {x: 0, y: 0};
    },
});

// example guard
// TODO remove or adjust in production code
router.beforeEach((to: Route, from: Route, next: any) => {
    if (to.matched.some((record: RouteRecord) => record.meta.requiresAuth)) {
        const isAuthenticated = store.getters['auth/isAuthenticated'];

        if (!isAuthenticated) {
            next({path: '/', query: {redirect: to.fullPath}});
        } else {
            next();
        }
    } else {
        next();
    }
});
