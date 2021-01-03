<template>
	<div :class="$style.login">
		<vue-grid>
			<vue-breadcrumb :items="breadCrumbItems"></vue-breadcrumb>

			<vue-grid-row>
				<vue-grid-item fill>
					<vue-headline level="1">Login</vue-headline>
					<br/>
					<br/>
					<form :class="$style.formExample" @submit.prevent="onSubmit">

						<vue-grid-row>
							<vue-grid-item>
								<vue-input
										name="email"
										id="email"
										required
										type="email"
										placeholder="E-mail"
										validation="required|email"
										v-model="form.email"
								/>
							</vue-grid-item>
						</vue-grid-row>

						<vue-grid-row>
							<vue-grid-item>
								<vue-input
										name="password"
										id="password"
										required
										placeholder="Password"
										validation="required"
										v-model="form.password"
										type="password"
								/>
							</vue-grid-item>
						</vue-grid-row>

						<br/>
						<vue-button color="primary" :disabled="isSubmitDisabled" :loading="isLoading"> Save</vue-button>
					</form>
				</vue-grid-item>
			</vue-grid-row>

		</vue-grid>
	</div>
</template>

<script lang="ts">
    import {registerModule} from '@/app/store';
    import {addNotification, INotification} from '@components/VueNotificationStack/utils';
    import {IPreLoad} from '@/server/isomorphic';
    import VueGrid from '@/app/shared/components/VueGrid/VueGrid.vue';
    import VueBreadcrumb from '@components/VueBreadcrumb/VueBreadcrumb.vue';
    import VueGridRow from '@/app/shared/components/VueGridRow/VueGridRow.vue';
    import VueGridItem from '@/app/shared/components/VueGridItem/VueGridItem.vue';
    import VueButton from '@/app/shared/components/VueButton/VueButton.vue';
    import VueInput from '@components/VueInput/VueInput.vue';
    import VueSelect from '@components/VueSelect/VueSelect.vue';
    import VueCheckbox from '@components/VueCheckbox/VueCheckbox.vue';
    import VueHeadline from '@/app/shared/components/VueHeadline/VueHeadline.vue';
    import {LoginModule} from '../module';
    import axios from 'axios'

    export default {
        $_veeValidate: {
            validator: 'new' as 'new',
        },
        name: 'Login',
        metaInfo: {
            title: 'Login',
        },
        components: {
            VueGrid,
            VueBreadcrumb,
            VueGridRow,
            VueGridItem,
            VueButton,
            VueCheckbox,
            VueSelect,
            VueInput,
            VueHeadline,
        },
        data(): any {
            return {
                form: {
                    email: '',
                    password: ''
                },
                isLoading: false,
            };
        },
        computed: {
            breadCrumbItems() {
                return [
                    {label: this.$t('common.home' /* Home */), href: '/'},
                    {label: this.$t('common.Login' /* Login */), href: '/login'},
                ];
            },
            addressDisabled() {
                return this.form.firstName === '' || this.form.lastName === '' || this.form.email === '';
            },
            hasErrors() {
                return this.errors && this.errors.items.length > 0;
            },
            hasEmptyFields() {
                let hasEmptyField: boolean = false;

                Object.keys(this.form).forEach((key: string) => {
                    if (key !== 'newsletter' && (this.form[key] === '' || this.form[key] === false)) {
                        hasEmptyField = true;
                    }
                });

                return hasEmptyField;
            },
            isSubmitDisabled() {
                return this.hasErrors || this.hasEmptyFields;
            },
        },
        methods: {
            onSubmit() {
                let formData = JSON.parse(JSON.stringify(this.form))

                this.isLoading = true;

                axios.post('http://localhost:8081/users/login', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                    }



                // state.token = btoa(credentials.username + ":" + credentials.password);
                // return axios.get(BACKEND_DASHBOARD_URL, {
                //     headers: {
                //         'Authorization': `Basic ${store.getters.token}`
                //     }
                // });

				// import axios from 'axios';
                // import Vue from "vue";
                // import Vuex from "vuex";
				//
                // Vue.use(Vuex)
				//
                // const BACKEND_DASHBOARD_URL = 'http://localhost:8081/SimpleLibrarySpring/dashboard';
				//
                // export const store = new Vuex.Store({
                //     state: {
                //         username: '',
                //         token: '',
                //         refresh: ''
                //     },
                //     mutations: {
                //         forceRefresh(state) {
                //             state.refresh = new Date();
                //         },
                //         refreshCredentialsFromCookies(state) {
                //             state.username = Vue.$cookies.get("username");
                //             state.token = Vue.$cookies.get("toke



                }).then(response => {
                    setTimeout(() => {
                        this.isLoading = false;
                        addNotification({
                            title: 'Login successful!',
                            text: '',
                        } as INotification);
                    }, 1000);
                }).catch(error => {
                    setTimeout(() => {
                        this.isLoading = false;
                        addNotification({
                            title: 'ERROR!',
                            text: error,
                        } as INotification);
                    }, 1000);
                });
            },
        },
        beforeCreate() {
            registerModule('login', LoginModule);
        },
        prefetch: (options: IPreLoad) => {
            registerModule('login', LoginModule);

            /**
             * This is the function where you can load all the data that is needed
             * to render the page on the server and client side
             *
             * This function always returns a promise that means, if you want to
             * call a vuex action you have to return it, here is an example
             *
             * return options.store.dispatch('fetchLogin', '1');
             *
             * If you need to fetch data from multiple source your can also return
             * a Promise chain or a Promise.all()
             */
            return Promise.resolve();
        },
    };
</script>

<style lang="scss" module>
	@import "~@/app/shared/design-system";

	.login {
		margin-top: $nav-bar-height;
		min-height: 500px;
	}
</style>
