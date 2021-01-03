import { IRegister } from './IRegister';

export interface IRegisterState {
  /**
   * put your state attributes here, for example:
   * myAttribute: any;
   */
  registers: IRegister[];
  currentRegister: IRegister;
}

export const RegisterDefaultState = (): IRegisterState => {
  return {
    /**
     * put your default value here, for example:
     * myAttribute: null,
     */
    registers: [],
    currentRegister: null,
  };
};
