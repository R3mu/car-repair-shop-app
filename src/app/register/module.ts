import { Module } from 'vuex';
import { IState } from '@/app/state';
import { RegisterDefaultState, IRegisterState } from './state';

export const RegisterModule: Module<IRegisterState, IState> = {
  namespaced: true,
  state: {
    ...RegisterDefaultState(),
  },
};
