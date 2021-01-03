import { IPanel } from './IPanel';

export interface IPanelState {
  /**
   * put your state attributes here, for example:
   * myAttribute: any;
   */
  panels: IPanel[];
  currentPanel: IPanel;
}

export const PanelDefaultState = (): IPanelState => {
  return {
    /**
     * put your default value here, for example:
     * myAttribute: null,
     */
    panels: [],
    currentPanel: null,
  };
};
