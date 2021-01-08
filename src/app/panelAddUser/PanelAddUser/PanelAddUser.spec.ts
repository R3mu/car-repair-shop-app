import { createLocalVue, mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { i18n } from '@/app/shared/plugins/i18n/i18n';
import PanelAddUser from './PanelAddUser.vue';
import { IState } from '@/app/state';
import { PanelAddUserModule } from '../module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('PanelAddUser.vue', () => {
  let store: Store<IState>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        panelAddUser: PanelAddUserModule,
      },
    } as any);
  });

  test('renders component', () => {
    const wrapper = mount<any>(PanelAddUser, {
      store,
      localVue,
      i18n,
      stubs: ['router-link'],
    });

    PanelAddUser.prefetch({});

    expect(wrapper.find('h1').text()).toBe('PanelAddUser');
  });
});
