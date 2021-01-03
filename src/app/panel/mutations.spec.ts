import { PanelMutations } from './mutations';
import { PanelDefaultState, IPanelState } from './state';

describe('PanelMutations', () => {
  let testState: IPanelState;

  beforeEach(() => {
    testState = PanelDefaultState();
  });

  test('it should set panels', () => {
    const expected = [{ id: '1' }];

    PanelMutations.SET_PANELS(testState, expected);
    expect(testState.panels).toEqual(expected);
  });

  test('it should set currentPanel', () => {
    const expected = { id: '1' };

    PanelMutations.SET_CURRENT_PANEL(testState, expected);
    expect(testState.currentPanel).toEqual(expected);
  });

  test('it should add and update a panel', () => {
    const panel = { id: '1' };
    PanelMutations.ADD_PANEL(testState, panel);
    expect(testState.panels).toEqual([panel]);

    panel.id = '2';

    PanelMutations.UPDATE_PANEL(testState, panel);
    expect(testState.panels).toEqual([panel]);
  });

  test('it should delete a panel', () => {
    const panel = { id: '1' };
    PanelMutations.ADD_PANEL(testState, panel);
    expect(testState.panels).toHaveLength(1);

    PanelMutations.DELETE_PANEL(testState, panel);
    expect(testState.panels).toHaveLength(0);
  });
});
