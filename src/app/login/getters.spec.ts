import { LoginGetters } from './getters';
import { LoginDefaultState, ILoginState } from './state';

describe('LoginGetters', () => {
  let testState: ILoginState;

  beforeEach(() => {
    testState = LoginDefaultState();
  });

  test('it should get the logins', () => {
    expect(LoginGetters.logins(testState)).toEqual(testState.logins);
  });

  test('it should get the logins', () => {
    expect(LoginGetters.currentLogin(testState)).toEqual(testState.currentLogin);
  });
});
