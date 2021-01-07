import { AppDefaultState, IAppState } from './app/state';
import { AuthDefaultState, IAuthState } from './shared/modules/auth/state';
import { ICounterState } from './example/counter/state';
import { ILoginState } from './login/state';
import { IRegisterState } from './register/state';
import { IDashboardState } from './dashboard/state';
import { IPanelState } from './panel/state';
import { IPanelEditTicketState } from './panelEditTicket/state';
import { IPanelAddTicketState } from './panelAddTicket/state';
import { IUserState } from './user/state';
import { IResetPasswordState } from './resetPassword/state';
import { IChangePasswordState } from './changePassword/state';
import { IPanelViewTicketState } from './panelViewTicket/state';

export interface IState {
  [key: string]: any;

  app?: IAppState;
  auth?: IAuthState;
  counter?: ICounterState;
  login?: ILoginState;
  register?: IRegisterState;
  dashboard?: IDashboardState;
  panel?: IPanelState;
  panelEditTicket?: IPanelEditTicketState;
  panelAddTicket?: IPanelAddTicketState;
  user?: IUserState;
  resetPassword?: IResetPasswordState;
  changePassword?: IChangePasswordState;
  panelViewTicket?: IPanelViewTicketState;
}

export const DefaultState: IState = {
  app: {
    ...AppDefaultState(),
    ...AuthDefaultState(),
  },
};
