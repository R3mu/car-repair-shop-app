import { PanelGetters } from './getters';
import { PanelDefaultState, IPanelState } from './state';

describe('PanelGetters', () => {
  let testState: IPanelState;

  beforeEach(() => {
    testState = PanelDefaultState();
  });

  test('it should get the panels', () => {
    expect(PanelGetters.panels(testState)).toEqual(testState.panels);
  });

  test('it should get the panels', () => {
    expect(PanelGetters.currentPanel(testState)).toEqual(testState.currentPanel);
  });
});
