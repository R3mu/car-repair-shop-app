import { Module } from 'vuex';
import { IState } from '@/app/state';
import { ResetPasswordDefaultState, IResetPasswordState } from './state';

export const ResetPasswordModule: Module<IResetPasswordState, IState> = {
  namespaced: true,
  state: {
    ...ResetPasswordDefaultState(),
  },
};
