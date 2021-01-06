import { Module } from 'vuex';
import { IState } from '@/app/state';
import { PanelAddTicketDefaultState, IPanelAddTicketState } from './state';
import { PanelAddTicketActions } from './actions';
import { PanelAddTicketGetters } from './getters';
import { PanelAddTicketMutations } from './mutations';

export const PanelAddTicketModule: Module<IPanelAddTicketState, IState> = {
  namespaced: true,
  actions: {
    ...PanelAddTicketActions,
  },
  getters: {
    ...PanelAddTicketGetters,
  },
  state: {
    ...PanelAddTicketDefaultState(),
  },
  mutations: {
    ...PanelAddTicketMutations,
  },
};
