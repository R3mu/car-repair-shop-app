import { createLocalVue, mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { i18n } from '@/app/shared/plugins/i18n/i18n';
import User from './User.vue';
import { IState } from '@/app/state';
import { UserModule } from '../module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('User.vue', () => {
  let store: Store<IState>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        user: UserModule,
      },
    } as any);
  });

  test('renders component', () => {
    const wrapper = mount<any>(User, {
      store,
      localVue,
      i18n,
      stubs: ['router-link'],
    });

    User.prefetch({});

    expect(wrapper.find('h1').text()).toBe('User');
  });
});
