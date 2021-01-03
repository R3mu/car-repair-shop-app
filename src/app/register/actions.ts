import { ActionContext } from 'vuex';
import { IState } from '@/app/state';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';
import { IRegisterState } from './state';
import { IRegister } from './IRegister';

export interface IRegisterActions {
  fetchRegisters(context: ActionContext<IRegisterState, IState>): Promise<any>;
  fetchRegister(context: ActionContext<IRegisterState, IState>, id: string): Promise<any>;
  addRegister(context: ActionContext<IRegisterState, IState>, register: IRegister): Promise<any>;
  updateRegister(context: ActionContext<IRegisterState, IState>, register: IRegister): Promise<any>;
  deleteRegister(context: ActionContext<IRegisterState, IState>, register: IRegister): Promise<any>;
}

export const RegisterActions: IRegisterActions = {
  async fetchRegisters({ commit }) {
    try {
      const response = await HttpService.get<IRegister[]>('/Register');
      commit('SET_REGISTERS', response.data);
    } catch (e) {
      throw e;
    }
  },
  async fetchRegister({ commit }, id) {
    try {
      const response = await HttpService.get<IRegister>(`/Register/${ id }`);
      commit('SET_CURRENT_REGISTER', response.data);
    } catch (e) {
      throw e;
    }
  },
  async addRegister({ commit }, register) {
    try {
      const response = await HttpService.post<IRegister>('/Register', register);
      commit('ADD_REGISTER', response.data);
    } catch (e) {
      throw e;
    }
  },
  async updateRegister({ commit }, register) {
    try {
      const response = await HttpService.put<IRegister>(`/Register/${ register.id }`, register);
      commit('UPDATE_REGISTER', response.data);
    } catch (e) {
      throw e;
    }
  },
  async deleteRegister({ commit }, register) {
    try {
      await HttpService.delete<IRegister>(`/Register/${ register.id }`);
      commit('DELETE_REGISTER', register);
    } catch (e) {
      throw e;
    }
  },
};
