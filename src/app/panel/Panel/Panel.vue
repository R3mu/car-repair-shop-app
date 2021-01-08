<template>
	<div :class="$style.panel">
		<vue-grid>
			<vue-breadcrumb :items="breadCrumbItems"></vue-breadcrumb>

			<vue-grid-row>
				<vue-grid-item fill>
					<vue-headline level="1">Panel</vue-headline>

					<br><br>
					<vue-headline level="4">Options:</vue-headline>
					<hr>
					<br>

					<a v-if="add" href="/panel-add-ticket" class="add">
						<vue-button color="primary">Add new ticket</vue-button>
					</a>
					<a v-if="add" href="/reset-password">
						<vue-button color="primary">Reset password</vue-button>
					</a>
					<a href="/change-password">
						<vue-button color="primary">Change password</vue-button>
					</a>

					<br><br>
					<hr>
					<br><br>

					<vue-headline level="4">Filters:</vue-headline>
					<br>

					<span v-on:click="filterBranch()"><vue-button color="primary">Branch</vue-button></span>
					<span v-on:click="filterModel()"><vue-button color="primary">Model</vue-button></span>
					<span v-on:click="filterTitle()"><vue-button color="primary">Title</vue-button></span>
					<span v-on:click="filterDescription()"><vue-button color="primary">Description</vue-button></span>
					<span v-on:click="filterPreliminaryCosts()"><vue-button color="primary">Preliminary costs</vue-button></span>
					<span v-on:click="filterEstimatedPrice()"><vue-button color="primary">Estimated price</vue-button></span>
					<span v-on:click="filterFinalPrice()"><vue-button color="primary">Final price</vue-button></span>
					<span v-on:click="filterEstimatedEndDate()"><vue-button color="primary">End date</vue-button></span>
					<span v-on:click="filterAttachedItems()"><vue-button color="primary">Attached items</vue-button></span>
					<span v-on:click="filterStatus()"><vue-button color="primary">Status</vue-button></span>

					<br><br>
					<hr>

				</vue-grid-item>
			</vue-grid-row>

			<br><br><br>
			<vue-grid-row>
				<vue-grid-item fill>
					<form v-if="search" :class="$style.formExample" @submit.prevent="onSubmit">

						<vue-grid-row>
							<vue-grid-item>
								<vue-input
										name="search"
										id="search"
										placeholder="Seach tickets:"
										validation="required|email"
										v-model="form.search"
								/>
							</vue-grid-item>
						</vue-grid-row>
						<vue-button color="primary">Search</vue-button>
					</form>
				</vue-grid-item>
			</vue-grid-row>

			<vue-grid-row>
				<vue-grid-item fill>
					<table id="client" v-html="client"></table>

					<br>
					<table>
						<tbody id="tbody" v-html="tbody"></tbody>
					</table>

					<br><br>
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
    import VueInput from '@components/VueInput/VueInput.vue';
    import VueButton from '@/app/shared/components/VueButton/VueButton.vue';
    import VueHeadline from '@/app/shared/components/VueHeadline/VueHeadline.vue';
    import {PanelModule} from '../module';
    import {addNotification, INotification} from '@components/VueNotificationStack/utils';
    import axios from 'axios';
    import VueCookies from 'vue-cookies'
    import {router} from "@/app/router";

    function buildFilteredTable(url) {
        axios.get(`http://localhost:8081/users/login`, {
            headers: {
                'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
            }
        }).then(response => {
            let accountType = response.data.role

            console.log(url);

            axios.get(url, {
                headers: {
                    'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                }
            }).then(response => {
                let data = response.data.content,
                    row = ``;

                row +=
                    `<tr>
							<th>Brand&nbsp;&&nbsp;model</th>
							<th>Title</th>
							<th>Description</th>
							<th>Preliminary&nbsp;costs</th>
							<th>Estimated price</th>
							<th>Final price</th>
							<th>Estimated end date</th>
							<th>Attached items</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>`;

                data.forEach(value => {
                    row +=
                        `<tr>
							<td>${value.brand} ${value.model}</td>
							<td>${value.title}</td>
							<td>${value.description}</td>
							<td>${(value.calculationNote != undefined) ? value.calculationNote : '---'}</td>
							<td>$${value.estimatedPrice}</td>
							<td>${(value.finalPrice != undefined) ? '$' + value.finalPrice : '---'}</td>
							<td>${value.estimatedRelease}</td>
							<td>${value.attachedItems}</td>
							<td>${value.status.replaceAll('_', ' ')}</td>
							${(accountType == 'EMPLOYEE' || accountType == 'HEAD') ? `<td><a href="/panel-edit-ticket?${value.uuid}">Edit</a></td>` : `<td><a href="/panel-view-ticket?${value.uuid}">View</a></td>`}
						</tr>`

                })

                document.getElementById("tbody").innerHTML = row

            }).catch(error => {
                addNotification({
                    title: "ERROR",
                    text: error.response.data.errors,
                } as INotification);
            });

        }).catch(function () {
            addNotification({
                title: 'You\'re not logged!',
                text: 'Please Log in to access this panel',
            } as INotification);

            router.replace('/');
        });
    }

    Vue.use(VueCookies);

    let temp = true;

    export default {
        metaInfo: {
            title: 'Panel',
        },
        components: {
            VueGrid,
            VueBreadcrumb,
            VueGridRow,
            VueGridItem,
            VueInput,
            VueButton,
            VueHeadline,
        },
        data(): any {
            return {
                client: null,
                tbody: null,
                add: true,
                search: true,
                form: {
                    search: ''
                }
            };
        },
        methods: {
            filterBranch: () => {
                if (temp == true) {
                    temp = false;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=brand%2Casc')
                } else {
                    temp = true;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=brand%2Cdesc')
                }
            },
            filterModel: () => {
                if (temp == true) {
                    temp = false;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=model%2Casc')
                } else {
                    temp = true;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=model%2Cdesc')
                }
            },
            filterTitle: () => {
                if (temp == true) {
                    temp = false;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=title%2Casc')
                } else {
                    temp = true;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=title%2Cdesc')
                }
            },
            filterDescription: () => {
                if (temp == true) {
                    temp = false;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=description%2Casc')
                } else {
                    temp = true;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=description%2Cdesc')
                }
            },
            filterPreliminaryCosts: () => {
                if (temp == true) {
                    temp = false;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=calculationNote%2Casc')
                } else {
                    temp = true;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=calculationNote%2Cdesc')
                }
            },
            filterEstimatedPrice: () => {
                if (temp == true) {
                    temp = false;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=estimatedPrice%2Casc')
                } else {
                    temp = true;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=estimatedPrice%2Cdesc')
                }
            },
            filterFinalPrice: () => {
                if (temp == true) {
                    temp = false;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=finalPrice%2Casc')
                } else {
                    temp = true;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=finalPrice%2Cdesc')
                }
            },
            filterEstimatedEndDate: () => {
                if (temp == true) {
                    temp = false;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=estimatedRelease%2Casc')
                } else {
                    temp = true;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=estimatedRelease%2Cdesc')
                }
            },
            filterAttachedItems: () => {
                if (temp == true) {
                    temp = false;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=attachedItems%2Casc')
                } else {
                    temp = true;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=attachedItems%2Cdesc')
                }
            },
            filterStatus: () => {
                if (temp == true) {
                    temp = false;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=status%2Casc')
                } else {
                    temp = true;
                    buildFilteredTable('http://localhost:8081/tickets?page=0&size=999&sort=status%2Cdesc')
                }
            },
            onSubmit() {
                let formData = JSON.parse(JSON.stringify(this.form))
                buildFilteredTable(`http://localhost:8081/tickets/search?text=${formData["search"]}&page=0&size=999`);
            },
        },
        mounted() {

            axios.get(`http://localhost:8081/users/login`, {
                headers: {
                    'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                }
            }).then(response => {
                let accountType = response.data.role

                axios.get('http://localhost:8081/tickets?page=0&size=999', {
                    headers: {
                        'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                    }
                }).then(response => {
                    let data = response.data.content,
                        row = ``;

                    if (accountType == 'CUSTOMER') {
                        this.search = false;
                        this.add = false;
                        this.client =
                            `<br><tr>
								<td>
									Contact with your mechanic:<br>
									<b>Name:</b> ${data[0].createdBy.firstName} ${data[0].createdBy.lastName}<br>
									<b>Email:</b> <a href="mailto:${data[0].createdBy.email}">${data[0].createdBy.email}</a><br>
									<b>Phone:</b> <a href="tel:${data[0].createdBy.mobilePhone}">${data[0].createdBy.mobilePhone}</a><br>
								</td>
								<td>
									Client info:<br>
									<b>Name:</b> ${data[0].customer.firstName} ${data[0].customer.lastName}<br>
									<b>Email:</b> <a href="mailto:${data[0].customer.email}">${data[0].customer.email}</a><br>
									<b>Phone:</b> <a href="tel:${data[0].customer.mobilePhone}">${data[0].customer.mobilePhone}</a><br>
								</td>
							</tr>`;
                    }

                    row +=
                        `<tr>
							<th>Brand&nbsp;&&nbsp;model</th>
							<th>Title</th>
							<th>Description</th>
							<th>Preliminary&nbsp;costs</th>
							<th>Estimated price</th>
							<th>Final price</th>
							<th>Estimated end date</th>
							<th>Attached items</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>`;

                    data.forEach(value => {
                        row +=
                            `<tr>
								<td>${value.brand} ${value.model}</td>
								<td>${value.title}</td>
								<td>${value.description}</td>
								<td>${(value.calculationNote != undefined) ? value.calculationNote : '---'}</td>
								<td>$${value.estimatedPrice}</td>
								<td>${(value.finalPrice != undefined) ? '$' + value.finalPrice : '---'}</td>
								<td>${value.estimatedRelease}</td>
								<td>${value.attachedItems}</td>
								<td>${value.status.replaceAll('_', ' ')}</td>
								${(accountType == 'EMPLOYEE' || accountType == 'HEAD') ? `<td><a href="/panel-edit-ticket?${value.uuid}">Edit</a></td>` : `<td><a href="/panel-view-ticket?${value.uuid}">View</a></td>`}
							</tr>`

                    })

                    this.tbody = row

                }).catch(error => {
                    addNotification({
                        title: "ERROR",
                        text: error.response.data.errors,
                    } as INotification);
                });

            }).catch(function () {
                addNotification({
                    title: 'You\'re not logged!',
                    text: 'Please Log in to access this panel',
                } as INotification);

                router.replace('/');
            });

        },
        computed: {
            breadCrumbItems() {
                return [
                    {label: this.$t('common.home' /* Home */), href: '/'},
                    {label: this.$t('common.Panel' /* Panel */), href: '/panel'},
                ];
            }
        },
        beforeCreate() {
            registerModule('panel', PanelModule);
        },
        beforeMount() {

        },
        prefetch: (options: IPreLoad) => {
            registerModule('panel', PanelModule);

            return Promise.resolve();
        },
    };
</script>

<style lang="scss" module>
	@import "~@/app/shared/design-system";

	.panel {
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
