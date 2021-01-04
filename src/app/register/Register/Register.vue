<template>
	<div :class="$style.register">
		<vue-grid>
			<vue-breadcrumb :items="breadCrumbItems"></vue-breadcrumb>

			<vue-grid-row>
				<vue-grid-item fill>
					<vue-headline level="1">Register</vue-headline>
					<br/>
					<br/>
					<form :class="$style.formExample" @submit.prevent="onSubmit">
						<vue-grid-row>
							<vue-grid-item>
								<vue-input
										name="firstName"
										id="firstName"
										required
										placeholder="First Name"
										validation="required"
										v-model="form.firstName"
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
								/>
							</vue-grid-item>
						</vue-grid-row>

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
										:error-message="$t('components.formExample.email.error' /* Wrong email */)"
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
										:error-message="$t('components.formExample.password.error' /* Wrong email */)"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="phonenumber"
										id="phonenumber"
										required
										placeholder="Phone number"
										v-model="form.phonenumber"
										validation="required|integer"
										:error-message="$t('components.formExample.phonenumber.error' /* Please enter a Number */)"
								/>
							</vue-grid-item>
						</vue-grid-row>

						<vue-grid-row>
							<vue-grid-item>
								<vue-checkbox
										name="acceptTerms"
										id="acceptTerms"
										v-model="form.acceptTerms"
										label="I accept the terms"
										validation="required"
										required
								/>
							</vue-grid-item>
						</vue-grid-row>

						<br/>
						<vue-button color="primary" :disabled="isSubmitDisabled" :loading="isLoading">Save</vue-button>
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
    import {RegisterModule} from '../module';
    import axios from 'axios'

    export default {
        $_veeValidate: {
            validator: 'new' as 'new',
        },
        name: 'Register',
        metaInfo: {
            title: 'Register',
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
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    phonenumber: '',
                    acceptTerms: false,
                },
                isLoading: false,
            };
        },
        computed: {
            breadCrumbItems() {
                return [
                    {label: this.$t('common.home' /* Home */), href: '/'},
                    {label: this.$t('common.Register' /* Register */), href: '/register'},
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

                axios.post('http://localhost:8081/users/register', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                    }
                }).then(response => {
                    setTimeout(() => {
                        this.isLoading = false;
                        addNotification({
                            title: 'Account has been created!',
                            text: 'Now please login',
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
            registerModule('register', RegisterModule);
        },
        prefetch: (options: IPreLoad) => {
            registerModule('register', RegisterModule);

            return Promise.resolve();
        },
        beforeMount() {

        },
    };
</script>

<style lang="scss" module>
	@import "~@/app/shared/design-system";

	.register {
		margin-top: $nav-bar-height;
		min-height: 500px;
	}
</style>
