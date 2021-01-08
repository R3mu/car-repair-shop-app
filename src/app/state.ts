import { AppDefaultState, IAppState } from './app/state';
import { AuthDefaultState, IAuthState } from './shared/modules/auth/state';
import { ILoginState } from './login/state';
import { IRegisterState } from './register/state';
import { IPanelState } from './panel/state';
import { IPanelEditTicketState } from './panelEditTicket/state';
import { IPanelAddTicketState } from './panelAddTicket/state';
import { IUserState } from './user/state';
import { IResetPasswordState } from './resetPassword/state';
import { IChangePasswordState } from './changePassword/state';
import { IPanelViewTicketState } from './panelViewTicket/state';
import { IPanelAddUserState } from './panelAddUser/state';

export interface IState {
  [key: string]: any;

  app?: IAppState;
  auth?: IAuthState;
  login?: ILoginState;
  register?: IRegisterState;
  panel?: IPanelState;
  panelEditTicket?: IPanelEditTicketState;
  panelAddTicket?: IPanelAddTicketState;
  user?: IUserState;
  resetPassword?: IResetPasswordState;
  changePassword?: IChangePasswordState;
  panelViewTicket?: IPanelViewTicketState;
  panelAddUser?: IPanelAddUserState;
}

export const DefaultState: IState = {
  app: {
    ...AppDefaultState(),
    ...AuthDefaultState(),
  },
};
