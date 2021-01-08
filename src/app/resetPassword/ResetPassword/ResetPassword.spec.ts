import { createLocalVue, mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { i18n } from '@/app/shared/plugins/i18n/i18n';
import ResetPassword from './ResetPassword.vue';
import { IState } from '@/app/state';
import { ResetPasswordModule } from '../module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ResetPassword.vue', () => {
  let store: Store<IState>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        resetPassword: ResetPasswordModule,
      },
    } as any);
  });

  test('renders component', () => {
    const wrapper = mount<any>(ResetPassword, {
      store,
      localVue,
      i18n,
      stubs: ['router-link'],
    });

    ResetPassword.prefetch({});

    expect(wrapper.find('h1').text()).toBe('Reset password');
  });
});
