import { ActionContext } from 'vuex';
import { IUserState } from './state';
import { IState } from '@/app/state';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';

export interface IUserActions {
  /**
   * put your action names, parameters and return values here, for example:
   * myAction(context: ActionContext<IUserState, IState>, param: any): Promise<any>;
   */
}

export const UserActions: IUserActions = {
  /**
   * here comes the implementation of your actions, for example:
   * myAction({ commit }, param) {
   *   commit('MY_MUTATION);
   * }
   */
};
