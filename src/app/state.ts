import { AppDefaultState, IAppState } from './app/state';
import { AuthDefaultState, IAuthState } from './shared/modules/auth/state';
import { ICounterState } from './example/counter/state';
import { ILoginState } from './login/state';
import { IRegisterState } from './register/state';
import { IDashboardState } from './dashboard/state';
import { IPanelState } from './panel/state';

export interface IState {
  [key: string]: any;

  app?: IAppState;
  auth?: IAuthState;
  counter?: ICounterState;
  login?: ILoginState;
  register?: IRegisterState;
  dashboard?: IDashboardState;
  panel?: IPanelState;
}

export const DefaultState: IState = {
  app: {
    ...AppDefaultState(),
    ...AuthDefaultState(),
  },
};
