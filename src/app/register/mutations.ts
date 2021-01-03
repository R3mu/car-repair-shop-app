import { IRegisterState } from './state';
import { IRegister } from './IRegister';

export interface IRegisterMutations {
  SET_REGISTERS(state: IRegisterState, registers: IRegister[]): void;
  SET_CURRENT_REGISTER(state: IRegisterState, register: IRegister): void;
  ADD_REGISTER(state: IRegisterState, register: IRegister): void;
  UPDATE_REGISTER(state: IRegisterState, register: IRegister): void;
  DELETE_REGISTER(state: IRegisterState, register: IRegister): void;
}

export const RegisterMutations: IRegisterMutations = {
  SET_REGISTERS: (state, registers) => {
    state.registers = registers;
  },
  SET_CURRENT_REGISTER: (state, register) => {
    state.currentRegister = register;
  },
  ADD_REGISTER: (state, register) => {
    state.registers.push(register);
  },
  UPDATE_REGISTER: (state, register) => {
    const idx = state.registers.findIndex((item) => item.id === register.id);
    state.registers.splice(idx, 1, register);
  },
  DELETE_REGISTER: (state, register) => {
    const idx = state.registers.findIndex((item) => item.id === register.id);
    state.registers.splice(idx, 1);
  },
};
