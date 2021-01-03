import { IPanelState } from './state';
import { IPanel } from './IPanel';

export interface IPanelMutations {
  SET_PANELS(state: IPanelState, panels: IPanel[]): void;
  SET_CURRENT_PANEL(state: IPanelState, panel: IPanel): void;
  ADD_PANEL(state: IPanelState, panel: IPanel): void;
  UPDATE_PANEL(state: IPanelState, panel: IPanel): void;
  DELETE_PANEL(state: IPanelState, panel: IPanel): void;
}

export const PanelMutations: IPanelMutations = {
  SET_PANELS: (state, panels) => {
    state.panels = panels;
  },
  SET_CURRENT_PANEL: (state, panel) => {
    state.currentPanel = panel;
  },
  ADD_PANEL: (state, panel) => {
    state.panels.push(panel);
  },
  UPDATE_PANEL: (state, panel) => {
    const idx = state.panels.findIndex((item) => item.id === panel.id);
    state.panels.splice(idx, 1, panel);
  },
  DELETE_PANEL: (state, panel) => {
    const idx = state.panels.findIndex((item) => item.id === panel.id);
    state.panels.splice(idx, 1);
  },
};
