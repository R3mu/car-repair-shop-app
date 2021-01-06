import { Module } from 'vuex';
import { IState } from '@/app/state';
import { UserDefaultState, IUserState } from './state';
import { UserActions } from './actions';
import { UserGetters } from './getters';
import { UserMutations } from './mutations';

export const UserModule: Module<IUserState, IState> = {
  namespaced: true,
  actions: {
    ...UserActions,
  },
  getters: {
    ...UserGetters,
  },
  state: {
    ...UserDefaultState(),
  },
  mutations: {
    ...UserMutations,
  },
};
