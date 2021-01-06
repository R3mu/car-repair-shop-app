import { Module } from 'vuex';
import { IState } from '@/app/state';
import { PanelEditTicketDefaultState, IPanelEditTicketState } from './state';
import { PanelEditTicketActions } from './actions';
import { PanelEditTicketGetters } from './getters';
import { PanelEditTicketMutations } from './mutations';

export const PanelEditTicketModule: Module<IPanelEditTicketState, IState> = {
  namespaced: true,
  actions: {
    ...PanelEditTicketActions,
  },
  getters: {
    ...PanelEditTicketGetters,
  },
  state: {
    ...PanelEditTicketDefaultState(),
  },
  mutations: {
    ...PanelEditTicketMutations,
  },
};
