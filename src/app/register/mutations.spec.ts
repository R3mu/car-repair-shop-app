import { RegisterMutations } from './mutations';
import { RegisterDefaultState, IRegisterState } from './state';

describe('RegisterMutations', () => {
  let testState: IRegisterState;

  beforeEach(() => {
    testState = RegisterDefaultState();
  });

  test('it should set registers', () => {
    const expected = [{ id: '1' }];

    RegisterMutations.SET_REGISTERS(testState, expected);
    expect(testState.registers).toEqual(expected);
  });

  test('it should set currentRegister', () => {
    const expected = { id: '1' };

    RegisterMutations.SET_CURRENT_REGISTER(testState, expected);
    expect(testState.currentRegister).toEqual(expected);
  });

  test('it should add and update a register', () => {
    const register = { id: '1' };
    RegisterMutations.ADD_REGISTER(testState, register);
    expect(testState.registers).toEqual([register]);

    register.id = '2';

    RegisterMutations.UPDATE_REGISTER(testState, register);
    expect(testState.registers).toEqual([register]);
  });

  test('it should delete a register', () => {
    const register = { id: '1' };
    RegisterMutations.ADD_REGISTER(testState, register);
    expect(testState.registers).toHaveLength(1);

    RegisterMutations.DELETE_REGISTER(testState, register);
    expect(testState.registers).toHaveLength(0);
  });
});
