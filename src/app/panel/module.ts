import { Module } from 'vuex';
import { IState } from '@/app/state';
import { PanelDefaultState, IPanelState } from './state';

export const PanelModule: Module<IPanelState, IState> = {
  namespaced: true,
  state: {
    ...PanelDefaultState(),
  },
};
