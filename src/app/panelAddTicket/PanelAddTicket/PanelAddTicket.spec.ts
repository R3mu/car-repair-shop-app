import { createLocalVue, mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { i18n } from '@/app/shared/plugins/i18n/i18n';
import PanelAddTicket from './PanelAddTicket.vue';
import { IState } from '@/app/state';
import { PanelAddTicketModule } from '../module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('PanelAddTicket.vue', () => {
  let store: Store<IState>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        panelAddTicket: PanelAddTicketModule,
      },
    } as any);
  });

  test('renders component', () => {
    const wrapper = mount<any>(PanelAddTicket, {
      store,
      localVue,
      i18n,
      stubs: ['router-link'],
    });

    PanelAddTicket.prefetch({});

    expect(wrapper.find('h1').text()).toBe('PanelAddTicket');
  });
});
