import { ActionContext, Commit, Dispatch } from 'vuex';
import MockAdapter from 'axios-mock-adapter';
import { IState } from '@/app/state';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';
import { RegisterActions } from './actions';
import { RegisterDefaultState, IRegisterState } from './state';

describe('RegisterActions', () => {
  let testContext: ActionContext<IRegisterState, IState>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
      state: RegisterDefaultState(),
    } as ActionContext<IRegisterState, IState>;

    mockAxios = new MockAdapter(HttpService);
  });

  describe('fetchRegisters', () => {
    test('it should call SET_REGISTERS on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = {};

      mockAxios.onGet('/Register').reply(200, expected);

      await RegisterActions.fetchRegisters(testContext);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['SET_REGISTERS', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onGet('/Register').reply(500);

      try {
        await RegisterActions.fetchRegisters(testContext);
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('fetchRegister', () => {
    test('it should call SET_CURRENT_REGISTER on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = {};

      mockAxios.onGet('/Register/1').reply(200, expected);

      await RegisterActions.fetchRegister(testContext, '1');

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['SET_CURRENT_REGISTER', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onGet('/Register/1').reply(500);

      try {
        await RegisterActions.fetchRegister(testContext, '1');
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('addRegister', () => {
    test('it should call ADD_REGISTER on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = {};

      mockAxios.onPost('/Register').reply(200, expected);

      await RegisterActions.addRegister(testContext, expected);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['ADD_REGISTER', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onPost('/Register').reply(500);

      try {
        await RegisterActions.addRegister(testContext, {});
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('updateRegister', () => {
    test('it should call UPDATE_REGISTER on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = { id: '1' };

      mockAxios.onPut('/Register/1').reply(200, expected);

      await RegisterActions.updateRegister(testContext, expected);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['UPDATE_REGISTER', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onPut('/Register/1').reply(500);

      try {
        await RegisterActions.updateRegister(testContext, { id: '1' });
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('deleteRegister', () => {
    test('it should call DELETE_REGISTER on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = { id: '1' };

      mockAxios.onDelete('/Register/1').reply(200, expected);

      await RegisterActions.deleteRegister(testContext, expected);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['DELETE_REGISTER', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onDelete('/Register/1').reply(500);

      try {
        await RegisterActions.deleteRegister(testContext, { id: '1' });
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });
});
