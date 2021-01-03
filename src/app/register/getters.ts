import { IRegisterState } from './state';
import { IRegister } from './IRegister';

export interface IRegisterGetters {
  registers(state: IRegisterState): IRegister[];
  currentRegister(state: IRegisterState): IRegister;
}

export const RegisterGetters: IRegisterGetters = {
  registers(state) {
    return state.registers;
  },
  currentRegister(state) {
    return state.currentRegister;
  },
};
