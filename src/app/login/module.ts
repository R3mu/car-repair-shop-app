import { Module } from 'vuex';
import { IState } from '@/app/state';
import { LoginDefaultState, ILoginState } from './state';
import { LoginActions } from './actions';
import { LoginGetters } from './getters';
import { LoginMutations } from './mutations';

export const LoginModule: Module<ILoginState, IState> = {
  namespaced: true,
  actions: {
    ...LoginActions,
  },
  getters: {
    ...LoginGetters,
  },
  state: {
    ...LoginDefaultState(),
  },
  mutations: {
    ...LoginMutations,
  },
};
