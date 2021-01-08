import { Module } from 'vuex';
import { IState } from '@/app/state';
import { LoginDefaultState, ILoginState } from './state';

export const LoginModule: Module<ILoginState, IState> = {
  namespaced: true,
  state: {
    ...LoginDefaultState(),
  },
};
