import { createLocalVue, mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { i18n } from '@/app/shared/plugins/i18n/i18n';
import Login from './Login.vue';
import { IState } from '@/app/state';
import { LoginModule } from '../module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Login.vue', () => {
  let store: Store<IState>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        login: LoginModule,
      },
    } as any);
  });

  test('renders component', () => {
    const wrapper = mount<any>(Login, {
      store,
      localVue,
      i18n,
      stubs: ['router-link'],
    });

    Login.prefetch({});

    expect(wrapper.find('h1').text()).toBe('Login');
  });
});
