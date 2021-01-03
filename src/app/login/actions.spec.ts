import { ActionContext, Commit, Dispatch } from 'vuex';
import MockAdapter from 'axios-mock-adapter';
import { IState } from '@/app/state';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';
import { LoginActions } from './actions';
import { LoginDefaultState, ILoginState } from './state';

describe('LoginActions', () => {
  let testContext: ActionContext<ILoginState, IState>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
      state: LoginDefaultState(),
    } as ActionContext<ILoginState, IState>;

    mockAxios = new MockAdapter(HttpService);
  });

  describe('fetchLogins', () => {
    test('it should call SET_LOGINS on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = {};

      mockAxios.onGet('/Login').reply(200, expected);

      await LoginActions.fetchLogins(testContext);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['SET_LOGINS', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onGet('/Login').reply(500);

      try {
        await LoginActions.fetchLogins(testContext);
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('fetchLogin', () => {
    test('it should call SET_CURRENT_LOGIN on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = {};

      mockAxios.onGet('/Login/1').reply(200, expected);

      await LoginActions.fetchLogin(testContext, '1');

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['SET_CURRENT_LOGIN', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onGet('/Login/1').reply(500);

      try {
        await LoginActions.fetchLogin(testContext, '1');
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('addLogin', () => {
    test('it should call ADD_LOGIN on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = {};

      mockAxios.onPost('/Login').reply(200, expected);

      await LoginActions.addLogin(testContext, expected);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['ADD_LOGIN', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onPost('/Login').reply(500);

      try {
        await LoginActions.addLogin(testContext, {});
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('updateLogin', () => {
    test('it should call UPDATE_LOGIN on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = { id: '1' };

      mockAxios.onPut('/Login/1').reply(200, expected);

      await LoginActions.updateLogin(testContext, expected);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['UPDATE_LOGIN', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onPut('/Login/1').reply(500);

      try {
        await LoginActions.updateLogin(testContext, { id: '1' });
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('deleteLogin', () => {
    test('it should call DELETE_LOGIN on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = { id: '1' };

      mockAxios.onDelete('/Login/1').reply(200, expected);

      await LoginActions.deleteLogin(testContext, expected);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['DELETE_LOGIN', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onDelete('/Login/1').reply(500);

      try {
        await LoginActions.deleteLogin(testContext, { id: '1' });
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });
});
