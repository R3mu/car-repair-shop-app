import { Module } from 'vuex';
import { IState } from '@/app/state';
import { RegisterDefaultState, IRegisterState } from './state';
import { RegisterActions } from './actions';
import { RegisterGetters } from './getters';
import { RegisterMutations } from './mutations';

export const RegisterModule: Module<IRegisterState, IState> = {
  namespaced: true,
  actions: {
    ...RegisterActions,
  },
  getters: {
    ...RegisterGetters,
  },
  state: {
    ...RegisterDefaultState(),
  },
  mutations: {
    ...RegisterMutations,
  },
};
