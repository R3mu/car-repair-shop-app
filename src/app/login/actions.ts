import { ActionContext } from 'vuex';
import { IState } from '@/app/state';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';
import { ILoginState } from './state';
import { ILogin } from './ILogin';

export interface ILoginActions {
  fetchLogins(context: ActionContext<ILoginState, IState>): Promise<any>;
  fetchLogin(context: ActionContext<ILoginState, IState>, id: string): Promise<any>;
  addLogin(context: ActionContext<ILoginState, IState>, login: ILogin): Promise<any>;
  updateLogin(context: ActionContext<ILoginState, IState>, login: ILogin): Promise<any>;
  deleteLogin(context: ActionContext<ILoginState, IState>, login: ILogin): Promise<any>;
}

export const LoginActions: ILoginActions = {
  async fetchLogins({ commit }) {
    try {
      const response = await HttpService.get<ILogin[]>('/Login');
      commit('SET_LOGINS', response.data);
    } catch (e) {
      throw e;
    }
  },
  async fetchLogin({ commit }, id) {
    try {
      const response = await HttpService.get<ILogin>(`/Login/${ id }`);
      commit('SET_CURRENT_LOGIN', response.data);
    } catch (e) {
      throw e;
    }
  },
  async addLogin({ commit }, login) {
    try {
      const response = await HttpService.post<ILogin>('/Login', login);
      commit('ADD_LOGIN', response.data);
    } catch (e) {
      throw e;
    }
  },
  async updateLogin({ commit }, login) {
    try {
      const response = await HttpService.put<ILogin>(`/Login/${ login.id }`, login);
      commit('UPDATE_LOGIN', response.data);
    } catch (e) {
      throw e;
    }
  },
  async deleteLogin({ commit }, login) {
    try {
      await HttpService.delete<ILogin>(`/Login/${ login.id }`);
      commit('DELETE_LOGIN', login);
    } catch (e) {
      throw e;
    }
  },
};
