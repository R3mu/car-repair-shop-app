import {createLocalVue, mount} from '@vue/test-utils';
import Vuex, {Store} from 'vuex';
import {i18n} from '@/app/shared/plugins/i18n/i18n';
import ChangePassword from './ChangePassword.vue';
import {IState} from '@/app/state';
import {ChangePasswordModule} from '../module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ChangePassword.vue', () => {
    let store: Store<IState>;

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                changePassword: ChangePasswordModule,
            },
        } as any);
    });

    test('renders component', () => {
        const wrapper = mount<any>(ChangePassword, {
            store,
            localVue,
            i18n,
            stubs: ['router-link'],
        });

        ChangePassword.prefetch({});

        expect(wrapper.find('h1').text()).toBe('Change password');
    });
});
