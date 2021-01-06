import { ActionContext, Commit, Dispatch } from 'vuex';
import MockAdapter from 'axios-mock-adapter';
import { UserDefaultState, IUserState } from './state';
import { IState } from '@/app/state';
import { UserActions } from './actions';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';

describe('UserActions', () => {
  let testContext: ActionContext<IUserState, IState>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
      state: UserDefaultState(),
    } as ActionContext<IUserState, IState>;

    mockAxios = new MockAdapter(HttpService);
  });

  test('Please write the tests for the actions here', () => {
    // here is an example: https://github.com/vuesion/vuesion/blob/master/src/app/counter/actions.spec.ts
    expect(true).toBeFalsy();
  });
});
