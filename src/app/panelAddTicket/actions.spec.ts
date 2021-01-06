import { ActionContext, Commit, Dispatch } from 'vuex';
import MockAdapter from 'axios-mock-adapter';
import { PanelAddTicketDefaultState, IPanelAddTicketState } from './state';
import { IState } from '@/app/state';
import { PanelAddTicketActions } from './actions';
import { HttpService } from '@/app/shared/services/HttpService/HttpService';

describe('PanelAddTicketActions', () => {
  let testContext: ActionContext<IPanelAddTicketState, IState>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    testContext = {
      dispatch: jest.fn() as Dispatch,
      commit: jest.fn() as Commit,
      state: PanelAddTicketDefaultState(),
    } as ActionContext<IPanelAddTicketState, IState>;

    mockAxios = new MockAdapter(HttpService);
  });

  test('Please write the tests for the actions here', () => {
    // here is an example: https://github.com/vuesion/vuesion/blob/master/src/app/counter/actions.spec.ts
    expect(true).toBeFalsy();
  });
});
