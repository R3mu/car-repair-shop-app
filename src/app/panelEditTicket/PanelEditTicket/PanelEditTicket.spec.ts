import { createLocalVue, mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { i18n } from '@/app/shared/plugins/i18n/i18n';
import PanelEditTicket from './PanelEditTicket.vue';
import { IState } from '@/app/state';
import { PanelEditTicketModule } from '../module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('PanelEditTicket.vue', () => {
  let store: Store<IState>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        panelEditTicket: PanelEditTicketModule,
      },
    } as any);
  });

  test('renders component', () => {
    const wrapper = mount<any>(PanelEditTicket, {
      store,
      localVue,
      i18n,
      stubs: ['router-link'],
    });

    PanelEditTicket.prefetch({});

    expect(wrapper.find('h1').text()).toBe('PanelEditTicket');
  });
});
