import {Module} from 'vuex';
import {IState} from '@/app/state';
import {PanelViewTicketDefaultState, IPanelViewTicketState} from './state';

export const PanelViewTicketModule: Module<IPanelViewTicketState, IState> = {
    namespaced: true,
    state: {
        ...PanelViewTicketDefaultState(),
    },
};
