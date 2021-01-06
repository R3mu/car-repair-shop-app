<template>
	<div :class="$style.panelEditTicket">
		<vue-grid>
			<vue-breadcrumb :items="breadCrumbItems"></vue-breadcrumb>

			<vue-grid-row>
				<vue-grid-item fill>
					<vue-headline level="1">Ticket Editor</vue-headline>

					<br>
				</vue-grid-item>
			</vue-grid-row>

			<vue-grid-row>
				<vue-grid-item fill>
					<br/>
					<form :class="$style.formExample" @submit.prevent="onSubmit">
						<vue-grid-row>
							<vue-grid-item>
								<b>Car:</b>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="brand"
										id="brand"
										required
										placeholder="Brand"
										validation="required"
										v-model="form.brand"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="model"
										id="model"
										required
										placeholder="Model"
										validation="required"
										v-model="form.model"
								/>
							</vue-grid-item>
						</vue-grid-row>

						<br><br>
						<vue-grid-row>
							<vue-grid-item>
								<b>Problem:</b>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="title"
										id="title"
										required
										placeholder="Title"
										validation="required"
										v-model="form.title"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="description"
										id="description"
										required
										placeholder="Description"
										validation="required"
										v-model="form.description"
								/>
							</vue-grid-item>
						</vue-grid-row>

						<br><br>
						<vue-grid-row>
							<vue-grid-item>
								<b>Costs/time:</b>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="estimatedPrice"
										id="estimatedPrice"
										required
										placeholder="Estimated price"
										validation="required"
										v-model="form.estimatedPrice"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="finalPrice"
										id="finalPrice"
										required
										placeholder="Final price"
										v-model="form.finalPrice"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="estimatedRelease"
										id="estimatedRelease"
										required
										type="date"
										placeholder="Estimated end date"
										validation="required"
										v-model="form.estimatedRelease"
								/>
							</vue-grid-item>
						</vue-grid-row>

						<br><br>
						<vue-grid-row>
							<vue-grid-item>
								<b>Additional info:</b>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="attachedItems"
										id="attachedItems"
										required
										placeholder="Attached items"
										validation="required"
										v-model="form.attachedItems"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-select
										name="status"
										id="status"
										required
										placeholder="Status"
										:options="['CANCELLED', 'RELEASED', 'IN_PROGRESS', 'READY_TO_PICK_UP', 'BLOCKED', 'CREATED']"
										v-model="form.status"
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

						<br/>
						<vue-button color="primary" :disabled="isSubmitDisabled" :loading="isLoading">Save</vue-button>
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
    import VueSelect from '@components/VueSelect/VueSelect.vue';
    import VueCheckbox from '@components/VueCheckbox/VueCheckbox.vue';
    import {PanelEditTicketModule} from '../module';
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
            title: 'PanelEditTicket',
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
                    {label: this.$t('common.PanelEditTicket' /* PanelEditTicket */), href: '/panel-edit-ticket'},
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
            loaded: () => {
                axios.get(`http://localhost:8081/users/login`, {
                    headers: {
                        'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                    }
                }).then(response => {
                    let accountType = response.data.role


                    // axios.get(`http://localhost:8081/tickets?page=0&size=999`, {
                    //     headers: {
                    //         'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                    //     }
                    // }).then(response => {
                    //     let data = response.data.content,
                    //         row = ``;
                    //
                    //     data.forEach(value => {
                    //
                    //         console.log(value);
                    //
                    //     })
                    //
                    //     document.getElementById("tbody").innerHTML = row
                    //
                    // }).catch(function () {
                    //
                    //     addNotification({
                    //         title: 'Something is wrong!',
                    //         text: 'Please reload page',
                    //     } as INotification);
                    //
                    // });


                }).catch(function () {
                    addNotification({
                        title: 'You\'re not logged!',
                        text: 'Please Log in to access this panel',
                    } as INotification);

                    router.replace('/');
                });
            }
            // onSubmit() {
            //     let formData = JSON.parse(JSON.stringify(this.form))
            //
            //     this.isLoading = true;
            //
            //     axios.post('http://localhost:8081/users/register', formData, {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Access-Control-Allow-Origin': '*',
            //             "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            //         }
            //     }).then(response => {
            //         setTimeout(() => {
            //             this.isLoading = false;
            //             addNotification({
            //                 title: 'Account has been created!',
            //                 text: 'Now please login',
            //             } as INotification);
            //         }, 1000);
            //     }).catch(error => {
            //         setTimeout(() => {
            //             this.isLoading = false;
            //             addNotification({
            //                 title: 'ERROR!',
            //                 text: error,
            //             } as INotification);
            //         }, 1000);
            //     });
            // },
        },
        beforeCreate() {
            registerModule('panelEditTicket', PanelEditTicketModule);
        },
        beforeMount() {
            this.loaded()
        },
        prefetch: (options: IPreLoad) => {
            registerModule('panelEditTicket', PanelEditTicketModule);

            return Promise.resolve();
        },
    };
</script>

<style lang="scss" module>
	@import "~@/app/shared/design-system";

	.panelEditTicket {
		margin-top: $nav-bar-height;
		min-height: 500px;
	}
</style>
