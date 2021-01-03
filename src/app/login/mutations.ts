import { ILoginState } from './state';
import { ILogin } from './ILogin';

export interface ILoginMutations {
  SET_LOGINS(state: ILoginState, logins: ILogin[]): void;
  SET_CURRENT_LOGIN(state: ILoginState, login: ILogin): void;
  ADD_LOGIN(state: ILoginState, login: ILogin): void;
  UPDATE_LOGIN(state: ILoginState, login: ILogin): void;
  DELETE_LOGIN(state: ILoginState, login: ILogin): void;
}

export const LoginMutations: ILoginMutations = {
  SET_LOGINS: (state, logins) => {
    state.logins = logins;
  },
  SET_CURRENT_LOGIN: (state, login) => {
    state.currentLogin = login;
  },
  ADD_LOGIN: (state, login) => {
    state.logins.push(login);
  },
  UPDATE_LOGIN: (state, login) => {
    const idx = state.logins.findIndex((item) => item.id === login.id);
    state.logins.splice(idx, 1, login);
  },
  DELETE_LOGIN: (state, login) => {
    const idx = state.logins.findIndex((item) => item.id === login.id);
    state.logins.splice(idx, 1);
  },
};
