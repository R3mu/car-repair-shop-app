import {createLocalVue, mount} from '@vue/test-utils';
import Vuex, {Store} from 'vuex';
import {i18n} from '@/app/shared/plugins/i18n/i18n';
import PanelViewTicket from './PanelViewTicket.vue';
import {IState} from '@/app/state';
import {PanelViewTicketModule} from '../module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('PanelViewTicket.vue', () => {
    let store: Store<IState>;

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                panelViewTicket: PanelViewTicketModule,
            },
        } as any);
    });

    test('renders component', () => {
        const wrapper = mount<any>(PanelViewTicket, {
            store,
            localVue,
            i18n,
            stubs: ['router-link'],
        });

        PanelViewTicket.prefetch({});

        expect(wrapper.find('h1').text()).toBe('Tickets info');
    });
});
