import { Module } from 'vuex';
import { IState } from '@/app/state';
import { PanelDefaultState, IPanelState } from './state';
import { PanelActions } from './actions';
import { PanelGetters } from './getters';
import { PanelMutations } from './mutations';

export const PanelModule: Module<IPanelState, IState> = {
  namespaced: true,
  actions: {
    ...PanelActions,
  },
  getters: {
    ...PanelGetters,
  },
  state: {
    ...PanelDefaultState(),
  },
  mutations: {
    ...PanelMutations,
  },
};
