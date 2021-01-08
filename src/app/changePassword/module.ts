import { Module } from 'vuex';
import { IState } from '@/app/state';
import { ChangePasswordDefaultState, IChangePasswordState } from './state';

export const ChangePasswordModule: Module<IChangePasswordState, IState> = {
  namespaced: true,
  state: {
    ...ChangePasswordDefaultState(),
  },
};
