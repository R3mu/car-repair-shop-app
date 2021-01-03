import { createLocalVue, mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { i18n } from '@/app/shared/plugins/i18n/i18n';
import Panel from './Panel.vue';
import { IState } from '@/app/state';
import { PanelModule } from '../module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Panel.vue', () => {
  let store: Store<IState>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        panel: PanelModule,
      },
    } as any);
  });

  test('renders component', () => {
    const wrapper = mount<any>(Panel, {
      store,
      localVue,
      i18n,
      stubs: ['router-link'],
    });

    Panel.prefetch({});

    expect(wrapper.find('h1').text()).toBe('Panel');
  });
});
