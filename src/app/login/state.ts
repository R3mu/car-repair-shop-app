import { ILogin } from './ILogin';

export interface ILoginState {
  /**
   * put your state attributes here, for example:
   * myAttribute: any;
   */
  logins: ILogin[];
  currentLogin: ILogin;
}

export const LoginDefaultState = (): ILoginState => {
  return {
    /**
     * put your default value here, for example:
     * myAttribute: null,
     */
    logins: [],
    currentLogin: null,
  };
};
