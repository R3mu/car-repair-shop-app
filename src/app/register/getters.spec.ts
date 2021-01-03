import { RegisterGetters } from './getters';
import { RegisterDefaultState, IRegisterState } from './state';

describe('RegisterGetters', () => {
  let testState: IRegisterState;

  beforeEach(() => {
    testState = RegisterDefaultState();
  });

  test('it should get the registers', () => {
    expect(RegisterGetters.registers(testState)).toEqual(testState.registers);
  });

  test('it should get the registers', () => {
    expect(RegisterGetters.currentRegister(testState)).toEqual(testState.currentRegister);
  });
});
