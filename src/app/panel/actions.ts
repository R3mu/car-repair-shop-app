import { ActionContext } from 'vuex';
import { IState } from '@/app/state';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';
import { IPanelState } from './state';
import { IPanel } from './IPanel';

export interface IPanelActions {
  fetchPanels(context: ActionContext<IPanelState, IState>): Promise<any>;
  fetchPanel(context: ActionContext<IPanelState, IState>, id: string): Promise<any>;
  addPanel(context: ActionContext<IPanelState, IState>, panel: IPanel): Promise<any>;
  updatePanel(context: ActionContext<IPanelState, IState>, panel: IPanel): Promise<any>;
  deletePanel(context: ActionContext<IPanelState, IState>, panel: IPanel): Promise<any>;
}

export const PanelActions: IPanelActions = {
  async fetchPanels({ commit }) {
    try {
      const response = await HttpService.get<IPanel[]>('/panel');
      commit('SET_PANELS', response.data);
    } catch (e) {
      throw e;
    }
  },
  async fetchPanel({ commit }, id) {
    try {
      const response = await HttpService.get<IPanel>(`/panel/${ id }`);
      commit('SET_CURRENT_PANEL', response.data);
    } catch (e) {
      throw e;
    }
  },
  async addPanel({ commit }, panel) {
    try {
      const response = await HttpService.post<IPanel>('/panel', panel);
      commit('ADD_PANEL', response.data);
    } catch (e) {
      throw e;
    }
  },
  async updatePanel({ commit }, panel) {
    try {
      const response = await HttpService.put<IPanel>(`/panel/${ panel.id }`, panel);
      commit('UPDATE_PANEL', response.data);
    } catch (e) {
      throw e;
    }
  },
  async deletePanel({ commit }, panel) {
    try {
      await HttpService.delete<IPanel>(`/panel/${ panel.id }`);
      commit('DELETE_PANEL', panel);
    } catch (e) {
      throw e;
    }
  },
};
