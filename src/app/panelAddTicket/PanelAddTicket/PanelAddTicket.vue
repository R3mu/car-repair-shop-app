<template>
	<div :class="$style.panelAddTicket">
		<vue-grid>
			<vue-breadcrumb :items="breadCrumbItems"></vue-breadcrumb>

			<vue-grid-row>
				<vue-grid-item fill>
					<vue-headline level="1">Add ticket</vue-headline>

					<br>
				</vue-grid-item>
			</vue-grid-row>

			<vue-grid-row>
				<vue-grid-item fill>
					<br/>
					<form :class="$style.formExample" @submit.prevent="onSubmit">
						<vue-grid-row>
							<vue-grid-item>
								<b>Client:</b>

								<br><br>
							</vue-grid-item>
						</vue-grid-row>
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
						</vue-grid-row>

						<br/><br/><br/>
						<vue-grid-row>
							<vue-grid-item>
								<b>Car:</b>

								<br><br>
							</vue-grid-item>
						</vue-grid-row>
						<vue-grid-row>
							<vue-grid-item>
								<vue-input
										name="brand"
										id="brand"
										required
										:placeholder="$t('brand')"
										validation="required"
										v-model="form.brand"
										:error-message="$t('components.formExample.brand.error' /* Empty Brand */)"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="model"
										id="model"
										required
										:placeholder="$t('model')"
										validation="required"
										v-model="form.model"
										:error-message="$t('components.formExample.model.error' /* Empty Model */)"
								/>
							</vue-grid-item>
						</vue-grid-row>

						<br/><br/><br/>
						<vue-grid-row>
							<vue-grid-item>
								<b>Problem:</b>

								<br><br>
							</vue-grid-item>
						</vue-grid-row>
						<vue-grid-row>
							<vue-grid-item>
								<vue-input
										name="title"
										id="title"
										required
										:placeholder="$t('title')"
										validation="required"
										v-model="form.title"
										:error-message="$t('components.formExample.title.error' /* Empty title */)"
								/>
							</vue-grid-item>
						</vue-grid-row>
						<vue-grid-row>
							<vue-grid-item>
								<vue-textarea
										name="description"
										id="description"
										required
										:placeholder="$t('description')"
										validation="required"
										v-model="form.description"
										:error-message="$t('components.formExample.description.error' /* Empty description */)"
								/>
							</vue-grid-item>
						</vue-grid-row>
						<vue-grid-row>
							<vue-grid-item>
								<vue-textarea
										name="calculationNote"
										id="calculationNote"
										:placeholder="$t('preliminarycosts')"
										v-model="form.calculationNote"
										:error-message="$t('components.formExample.preliminary_costs.error')"
								/>
							</vue-grid-item>
						</vue-grid-row>

						<br/><br/><br/>
						<vue-grid-row>
							<vue-grid-item>
								<b>Costs/time:</b>

								<br><br>
							</vue-grid-item>
						</vue-grid-row>
						<vue-grid-row>
							<vue-grid-item>
								<vue-input
										name="estimatedPrice"
										id="estimatedPrice"
										required
										type="number"
										:placeholder="$t('estimatedprice')"
										validation="required"
										v-model="form.estimatedPrice"
										:error-message="$t('components.formExample.estimated_price.error')"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="estimatedRelease"
										id="estimatedRelease"
										required
										type="input"
										:placeholder="$t('estimatedenddate')"
										validation="required"
										v-model="form.estimatedRelease"
										:error-message="$t('components.formExample.estimatedRelease.error')"
								/>
							</vue-grid-item>
						</vue-grid-row>

						<br/><br/><br/>
						<vue-grid-row>
							<vue-grid-item>
								<b>Additional info:</b>

								<br><br>
							</vue-grid-item>
						</vue-grid-row>
						<vue-grid-row>
							<vue-grid-item>
								<vue-input
										name="attachedItems"
										id="attachedItems"
										:placeholder="$t('attached_items')"
										v-model="form.attachedItems"
										:error-message="$t('components.formExample.attachedItems.error')"
								/>
							</vue-grid-item>
						</vue-grid-row>
						<vue-grid-row>
							<vue-grid-item>
								<p>
									<small>Status:</small>
									CREATED, IN_PROGRESS, CANCELLED, BLOCKED, READY_TO_PICK_UP, RELEASED
								</p>
								<br>
							</vue-grid-item>
						</vue-grid-row>
						<vue-grid-row>
							<vue-grid-item>
								<vue-input
										name="status"
										id="status"
										required
										type="input"
										:placeholder="$t('progress_status')"
										validation="required"
										v-model="form.status"
										:error-message="$t('components.formExample.status.error')"
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
    import {PanelAddTicketModule} from '../module';
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
            title: 'PanelAddTicket',
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
                    email: null,
                    brand: null,
                    model: null,
                    title: null,
                    description: null,
                    estimatedPrice: null,
                    estimatedRelease: '2021-01-01T00:00:00.000000Z',
                    attachedItems: null,
                    status: 'CREATED',
                },
                isLoading: false,
            };
        },
        computed: {
            breadCrumbItems() {
                return [
                    {label: this.$t('common.home' /* Home */), href: '/'},
                    {label: this.$t('common.Panel' /* Panel */), href: '/panel'},
                    {label: this.$t('common.PanelAddTicket' /* PanelAddTicket */), href: '/panel-add-ticket'},
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

                axios.post('http://localhost:8081/tickets/', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                    }
                }).then(response => {
                    setTimeout(() => {
                        this.isLoading = false;
                        addNotification({
                            title: 'Ticket has been created!',
                            text: '',
                        } as INotification);

                        router.replace('/panel');
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
            registerModule('panelAddTicket', PanelAddTicketModule);
        },
        beforeMount() {

        },
        prefetch: (options: IPreLoad) => {
            registerModule('panelAddTicket', PanelAddTicketModule);

            return Promise.resolve();
        },
    };
</script>

<style lang="scss" module>
	@import "~@/app/shared/design-system";

	.panelAddTicket {
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
