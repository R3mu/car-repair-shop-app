import { ILoginState } from './state';
import { ILogin } from './ILogin';

export interface ILoginGetters {
  logins(state: ILoginState): ILogin[];
  currentLogin(state: ILoginState): ILogin;
}

export const LoginGetters: ILoginGetters = {
  logins(state) {
    return state.logins;
  },
  currentLogin(state) {
    return state.currentLogin;
  },
};
