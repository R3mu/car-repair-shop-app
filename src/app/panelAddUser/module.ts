import {Module} from 'vuex';
import {IState} from '@/app/state';
import {PanelAddUserDefaultState, IPanelAddUserState} from './state';

export const PanelAddUserModule: Module<IPanelAddUserState, IState> = {
    namespaced: true,
    state: {
        ...PanelAddUserDefaultState(),
    },
};
