import { createLocalVue, mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { i18n } from '@/app/shared/plugins/i18n/i18n';
import Register from './Register.vue';
import { IState } from '@/app/state';
import { RegisterModule } from '../module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Register.vue', () => {
  let store: Store<IState>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        register: RegisterModule,
      },
    } as any);
  });

  test('renders component', () => {
    const wrapper = mount<any>(Register, {
      store,
      localVue,
      i18n,
      stubs: ['router-link'],
    });

    Register.prefetch({});

    expect(wrapper.find('h1').text()).toBe('Register');
  });
});
