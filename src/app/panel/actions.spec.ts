import { ActionContext, Commit, Dispatch } from 'vuex';
import MockAdapter from 'axios-mock-adapter';
import { IState } from '@/app/state';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';
import { PanelActions } from './actions';
import { PanelDefaultState, IPanelState } from './state';

describe('PanelActions', () => {
  let testContext: ActionContext<IPanelState, IState>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
      state: PanelDefaultState(),
    } as ActionContext<IPanelState, IState>;

    mockAxios = new MockAdapter(HttpService);
  });

  describe('fetchPanels', () => {
    test('it should call SET_PANELS on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = {};

      mockAxios.onGet('/panel').reply(200, expected);

      await PanelActions.fetchPanels(testContext);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['SET_PANELS', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onGet('/panel').reply(500);

      try {
        await PanelActions.fetchPanels(testContext);
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('fetchPanel', () => {
    test('it should call SET_CURRENT_PANEL on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = {};

      mockAxios.onGet('/panel/1').reply(200, expected);

      await PanelActions.fetchPanel(testContext, '1');

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['SET_CURRENT_PANEL', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onGet('/panel/1').reply(500);

      try {
        await PanelActions.fetchPanel(testContext, '1');
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('addPanel', () => {
    test('it should call ADD_PANEL on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = {};

      mockAxios.onPost('/panel').reply(200, expected);

      await PanelActions.addPanel(testContext, expected);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['ADD_PANEL', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onPost('/panel').reply(500);

      try {
        await PanelActions.addPanel(testContext, {});
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('updatePanel', () => {
    test('it should call UPDATE_PANEL on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = { id: '1' };

      mockAxios.onPut('/panel/1').reply(200, expected);

      await PanelActions.updatePanel(testContext, expected);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['UPDATE_PANEL', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onPut('/panel/1').reply(500);

      try {
        await PanelActions.updatePanel(testContext, { id: '1' });
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });

  describe('deletePanel', () => {
    test('it should call DELETE_PANEL on success', async () => {
      const commitMock: jest.Mock = testContext.commit as jest.Mock;
      const expected = { id: '1' };

      mockAxios.onDelete('/panel/1').reply(200, expected);

      await PanelActions.deletePanel(testContext, expected);

      const actual = commitMock.mock.calls[0];

      expect(actual).toEqual(['DELETE_PANEL', expected]);
    });

    test('it should throw an error on failure', async () => {
      mockAxios.onDelete('/panel/1').reply(500);

      try {
        await PanelActions.deletePanel(testContext, { id: '1' });
      } catch (e) {
        expect(e.message).toEqual('Request failed with status code 500');
      }
    });
  });
});
