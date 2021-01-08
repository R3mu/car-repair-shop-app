import { Module } from 'vuex';
import { IState } from '@/app/state';
import { UserDefaultState, IUserState } from './state';

export const UserModule: Module<IUserState, IState> = {
  namespaced: true,
  state: {
    ...UserDefaultState(),
  },
};
