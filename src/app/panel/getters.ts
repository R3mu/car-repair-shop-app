import { IPanelState } from './state';
import { IPanel } from './IPanel';

export interface IPanelGetters {
  panels(state: IPanelState): IPanel[];
  currentPanel(state: IPanelState): IPanel;
}

export const PanelGetters: IPanelGetters = {
  panels(state) {
    return state.panels;
  },
  currentPanel(state) {
    return state.currentPanel;
  },
};
