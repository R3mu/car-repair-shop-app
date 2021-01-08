import {Module} from 'vuex';
import {IState} from '@/app/state';
import {PanelAddTicketDefaultState, IPanelAddTicketState} from './state';

export const PanelAddTicketModule: Module<IPanelAddTicketState, IState> = {
    namespaced: true,
    state: {
        ...PanelAddTicketDefaultState(),
    },
};
