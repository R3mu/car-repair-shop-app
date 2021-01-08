<template>
	<div :class="$style.panelAddUser">
		<vue-grid>
			<vue-breadcrumb :items="breadCrumbItems"></vue-breadcrumb>

			<vue-grid-row>
				<vue-grid-item fill>
					<vue-headline level="1">Add user</vue-headline>

					<br>
				</vue-grid-item>
			</vue-grid-row>

			<vue-grid-row>
				<vue-grid-item fill>
					<br/>
					<form :class="$style.formExample" @submit.prevent="onSubmit">
						<vue-grid-row>
							<vue-grid-item>
								<b>Info:</b>

								<br><br>
							</vue-grid-item>
						</vue-grid-row>
						<vue-grid-row>
							<vue-grid-item>
								<vue-input
										name="firstName"
										id="firstName"
										required
										placeholder="First Name"
										validation="required"
										v-model="form.firstName"
										:error-message="$t('The first name can not be empty')"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="lastName"
										id="lastName"
										required
										placeholder="Last Name"
										validation="required"
										v-model="form.lastName"
										:error-message="$t('The last name can not be empty')"
								/>
							</vue-grid-item>
						</vue-grid-row>
						<br><br>
						<vue-grid-row>
							<vue-grid-item>
								<vue-input
										name="email"
										id="email"
										required
										type="email"
										:placeholder="$t('email')"
										validation="required|email"
										v-model="form.email"
										:error-message="$t('components.formExample.email.error' /* Wrong email */)"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="mobilePhone"
										id="mobilePhone"
										required
										type="mobilePhone"
										placeholder="Mobile phone"
										validation="required"
										v-model="form.mobilePhone"
										:error-message="$t('The phone can not be empty')"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="role"
										id="role"
										required
										type="role"
										placeholder="Role"
										validation="required"
										v-model="form.role"
										error-message="Choose role between CUSTOMER or EMPLOYEE"
								/>
							</vue-grid-item>
						</vue-grid-row>

						<br/>
						<vue-button color="primary" :disabled="isSubmitDisabled" :loading="isLoading">Save</vue-button>
						<br/><br/><br/>
					</form>
				</vue-grid-item>
			</vue-grid-row>
		</vue-grid>
	</div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {registerModule} from '@/app/store';
    import {IPreLoad} from '@/server/isomorphic';
    import VueGrid from '@/app/shared/components/VueGrid/VueGrid.vue';
    import VueBreadcrumb from '@components/VueBreadcrumb/VueBreadcrumb.vue';
    import VueGridRow from '@/app/shared/components/VueGridRow/VueGridRow.vue';
    import VueGridItem from '@/app/shared/components/VueGridItem/VueGridItem.vue';
    import VueButton from '@/app/shared/components/VueButton/VueButton.vue';
    import VueHeadline from '@/app/shared/components/VueHeadline/VueHeadline.vue';
    import VueInput from '@components/VueInput/VueInput.vue';
    import VueTextarea from '@components/VueTextarea/VueTextarea.vue';
    import VueSelect from '@components/VueSelect/VueSelect.vue';
    import VueDatePicker from '@components/VueDatePicker/VueDatePicker.vue';
    import VueCheckbox from '@components/VueCheckbox/VueCheckbox.vue';
    import {PanelAddUserModule} from '../module';
    import {addNotification, INotification} from '@components/VueNotificationStack/utils';
    import axios from 'axios';
    import VueCookies from 'vue-cookies'
    import {router} from "@/app/router";

    Vue.use(VueCookies);

    export default {
        $_veeValidate: {
            validator: 'new' as 'new',
        },
        metaInfo: {
            title: 'PanelAddUser',
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
            VueTextarea,
            VueDatePicker,
            VueHeadline,
        },
        data(): any {
            return {
                form: {
                    firstName: null,
                    lastName:  null,
                    email:  null,
                    mobilePhone:  null,
                    role: null,
                },
                isLoading: false,
            };
        },
        computed: {
            breadCrumbItems() {
                return [
                    {label: this.$t('common.home' /* Home */), href: '/'},
                    {label: this.$t('common.Panel' /* Panel */), href: '/panel'},
                    {label: this.$t('common.PanelAddUser' /* PanelAddUser */), href: '/panel-add-user'},
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
        mounted() {

            axios.get(`http://localhost:8081/users/login`, {
                headers: {
                    'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                }
            }).then(response => {
                let accountType = response.data.role

                if (accountType == 'CUSTOMER') {
                    router.replace('/');
                }

            }).catch(function () {
                addNotification({
                    title: 'You\'re not logged!',
                    text: 'Please Log in to access this panel',
                } as INotification);

                router.replace('/');
            });

        },
        methods: {
            onSubmit() {
                let formData = JSON.parse(JSON.stringify(this.form));

                this.isLoading = true;

                axios.post('http://localhost:8081/users/', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                    }
                }).then(response => {
                    setTimeout(() => {
                        this.isLoading = false;
                        addNotification({
                            title: 'User has been created!',
                            text: '',
                        } as INotification);

                        router.replace('/user');
                    }, 1000);
                }).catch(error => {
                    setTimeout(() => {
                        this.isLoading = false;
                        addNotification({
                            title: "ERROR",
                            text: error.response.data.errors,
                        } as INotification);
                    }, 1000);
                });
            },
        },
        beforeCreate() {
            registerModule('panelAddUser', PanelAddUserModule);
        },
        beforeMount() {

        },
        prefetch: (options: IPreLoad) => {
            registerModule('panelAddUser', PanelAddUserModule);

            return Promise.resolve();
        },
    };
</script>

<style lang="scss" module>
	@import "~@/app/shared/design-system";

	.panelAddUser {
		margin-top: $nav-bar-height;
		min-height: 500px;

		table {
			width: 100%;
			border-collapse: collapse;

			tr {
				width: 100%;

				&:nth-child(even) {
					background-color: #f2f2f2;
				}

				&:hover {
					background-color: #ddd;
				}

				td, th {
					border: 1px solid #ddd;
					padding: 8px;
				}

				th {
					padding-top: 12px;
					padding-bottom: 12px;
					text-align: left;
					background-color: #f43b6c;
					color: white;
				}
			}
		}
	}
</style>
