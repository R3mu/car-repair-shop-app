import {Module} from 'vuex';
import {IState} from '@/app/state';
import {PanelEditTicketDefaultState, IPanelEditTicketState} from './state';

export const PanelEditTicketModule: Module<IPanelEditTicketState, IState> = {
    namespaced: true,
    state: {
        ...PanelEditTicketDefaultState(),
    },
};
