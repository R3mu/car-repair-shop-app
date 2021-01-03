import { LoginMutations } from './mutations';
import { LoginDefaultState, ILoginState } from './state';

describe('LoginMutations', () => {
  let testState: ILoginState;

  beforeEach(() => {
    testState = LoginDefaultState();
  });

  test('it should set logins', () => {
    const expected = [{ id: '1' }];

    LoginMutations.SET_LOGINS(testState, expected);
    expect(testState.logins).toEqual(expected);
  });

  test('it should set currentLogin', () => {
    const expected = { id: '1' };

    LoginMutations.SET_CURRENT_LOGIN(testState, expected);
    expect(testState.currentLogin).toEqual(expected);
  });

  test('it should add and update a login', () => {
    const login = { id: '1' };
    LoginMutations.ADD_LOGIN(testState, login);
    expect(testState.logins).toEqual([login]);

    login.id = '2';

    LoginMutations.UPDATE_LOGIN(testState, login);
    expect(testState.logins).toEqual([login]);
  });

  test('it should delete a login', () => {
    const login = { id: '1' };
    LoginMutations.ADD_LOGIN(testState, login);
    expect(testState.logins).toHaveLength(1);

    LoginMutations.DELETE_LOGIN(testState, login);
    expect(testState.logins).toHaveLength(0);
  });
});
