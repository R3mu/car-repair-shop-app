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
					<vue-grid-row>
						<vue-grid-item>
							<b>Client info:</b>

							<br><br>
						</vue-grid-item>
					</vue-grid-row>
					<vue-grid-row>
						<vue-grid-item>
							<table>
								<tbody>
								<tr>
									<td>
										<p><b>Name: </b><span v-html="customer.firstName"></span> <span v-html="customer.lastName"></span></p>
										<p><b>Email: </b><span v-html="customer.email"></span></p>
										<p><b>Phone: </b><span v-html="customer.mobilePhone"></span></p>
										<p><b>role: </b><span v-html="customer.role"></span></p>
										<p><b>uuid: </b><span v-html="customer.uuid"></span></p>
									</td>
								</tr>
								</tbody>
							</table>
							<br><br>
						</vue-grid-item>
					</vue-grid-row>


					<br/>
					<form :class="$style.formExample" @submit.prevent="onSubmit">
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
										:error-message="$t('components.formExample.brand.error')"
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
										:error-message="$t('components.formExample.model.error')"
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
										:error-message="$t('components.formExample.title.error')"
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
										:error-message="$t('components.formExample.description.error')"
								/>
							</vue-grid-item>
						</vue-grid-row>
						<vue-grid-row>
							<vue-grid-item>
								<vue-textarea
										name="calculationNote"
										id="calculationNote"
										required
										:placeholder="$t('preliminarycosts')"
										validation="required"
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
										type="number"
										:placeholder="$t('estimatedprice')"
										disabled="disabled"
										v-model="form.estimatedPrice"
										:error-message="$t('components.formExample.estimated_price.error')"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="finalPrice"
										id="finalPrice"
										type="number"
										required
										:placeholder="$t('finalprice')"
										validation="required"
										v-model="form.finalPrice"
										:error-message="$t('components.formExample.finalprice.error')"
								/>
							</vue-grid-item>
							<vue-grid-item>
								<vue-input
										name="estimatedRelease"
										id="estimatedRelease"
										required
										type="input"
										disabled="disabled"
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
								<small style="font-size: 75%; font-weight: 400; color: #3d8beb;">Status:</small>

								<br>
							</vue-grid-item>
						</vue-grid-row>
						<vue-grid-row>
							<vue-grid-item>
								<vue-checkbox
										name="CREATED"
										id="CREATED"
										label="CREATED"
										:checked="form.status === 'CREATED'"
										@click="form.status = 'CREATED'"
										radio
								/>
								<vue-checkbox
										style="margin-left: 30px;"
										name="IN_PROGRESS"
										id="IN_PROGRESS"
										label="IN PROGRESS"
										:checked="form.status === 'IN_PROGRESS'"
										@click="form.status = 'IN_PROGRESS'"
										radio
								/>
								<vue-checkbox
										style="margin-left: 30px;"
										name="CANCELLED"
										id="CANCELLED"
										label="CANCELLED"
										:checked="form.status === 'CANCELLED'"
										@click="form.status = 'CANCELLED'"
										radio
								/>
								<vue-checkbox
										style="margin-left: 30px;"
										name="BLOCKED"
										id="BLOCKED"
										label="BLOCKED"
										:checked="form.status === 'BLOCKED'"
										@click="form.status = 'BLOCKED'"
										radio
								/>
								<vue-checkbox
										style="margin-left: 30px;"
										name="READY_TO_PICK_UP"
										id="READY_TO_PICK_UP"
										label="READY TO PICK UP"
										:checked="form.status === 'READY_TO_PICK_UP'"
										@click="form.status = 'READY_TO_PICK_UP'"
										radio
								/>
								<vue-checkbox
										style="margin-left: 30px;"
										name="RELEASED"
										id="RELEASED"
										label="RELEASED"
										:checked="form.status === 'RELEASED'"
										@click="form.status = 'RELEASED'"
										radio
								/>
							</vue-grid-item>
						</vue-grid-row>

						<br/><br/>
						<vue-button color="primary" :disabled="isSubmitDisabled" :loading="isLoading">Save</vue-button>
						<br/><br/><br/><br/>
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
    import VueDatePicker from '@components/VueDatePicker/VueDatePicker.vue';
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
            VueTextarea,
            VueDatePicker,
            VueHeadline,
        },
        data(): any {
            return {
                customer: {
                    uuid: null,
                    role: null,
                    email: null,
                    firstName: null,
                    lastName: null,
                    mobilePhone: null,
                },
                form: {
                    brand: null,
                    model: null,
                    title: null,
                    description: null,
                    estimatedPrice: null,
                    finalPrice: null,
                    estimatedRelease: null,
                    attachedItems: null,
                    status: null,
                },
                isLoading: false,
            };
        },
        computed: {
            breadCrumbItems() {
                return [
                    {label: this.$t('common.home' /* Home */), href: '/'},
                    {label: this.$t('common.Panel' /* Panel */), href: '/panel'},
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
        mounted() {

            axios.get(`http://localhost:8081/users/login`, {
                headers: {
                    'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                }
            }).then(response => {
                let accountType = response.data.role

                if (accountType == 'EMPLOYEE' || accountType == 'HEAD') {

                    axios.get(`http://localhost:8081/tickets?page=0&size=999`, {
                        headers: {
                            'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                        }
                    }).then(response => {
                        let data = response.data.content,
                            url = '';

                        for (let key in this.$route.query) {
                            url = key
                        }

                        data.forEach(value => {
                            if (value.uuid == url) {
                                this.customer.uuid = value.customer.uuid
                                this.customer.role = value.customer.role
                                this.customer.email = value.customer.email
                                this.customer.firstName = value.customer.firstName
                                this.customer.lastName = value.customer.lastName
                                this.customer.mobilePhone = value.customer.mobilePhone

                                this.form.brand = value.brand
                                this.form.model = value.model
                                this.form.title = value.title
                                this.form.description = value.description
                                this.form.estimatedPrice = value.estimatedPrice
                                this.form.finalPrice = value.finalPrice
                                this.form.estimatedRelease = value.estimatedRelease
                                this.form.attachedItems = value.attachedItems
                                this.form.calculationNote = value.calculationNote
                                this.form.status = value.status
                            }
                        })


                    }).catch(error => {
                        addNotification({
                            title: "ERROR",
                            text: error.response.data.errors,
                        } as INotification);
                    });

                } else {
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
                let formData = JSON.parse(JSON.stringify(this.form)),
                    url = '';

                this.isLoading = true;

                for (let key in this.$route.query) {
                    url = key
                }

                axios.put('http://localhost:8081/tickets/' + url, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                    }
                }).then(response => {
                    setTimeout(() => {
                        this.isLoading = false;
                        addNotification({
                            title: 'Ticket has been updated!',
                            text: '',
                        } as INotification);

                        router.replace('/panel');
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
            registerModule('panelEditTicket', PanelEditTicketModule);
        },
        beforeMount() {

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
