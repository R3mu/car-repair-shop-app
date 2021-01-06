import { ActionContext } from 'vuex';
import { IPanelAddTicketState } from './state';
import { IState } from '@/app/state';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';

export interface IPanelAddTicketActions {
  /**
   * put your action names, parameters and return values here, for example:
   * myAction(context: ActionContext<IPanelAddTicketState, IState>, param: any): Promise<any>;
   */
}

export const PanelAddTicketActions: IPanelAddTicketActions = {
  /**
   * here comes the implementation of your actions, for example:
   * myAction({ commit }, param) {
   *   commit('MY_MUTATION);
   * }
   */
};
