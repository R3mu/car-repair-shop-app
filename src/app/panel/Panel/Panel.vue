<template>
	<div :class="$style.panel">
		<vue-grid>
			<vue-breadcrumb :items="breadCrumbItems"></vue-breadcrumb>

			<vue-grid-row>
				<vue-grid-item fill>
					<vue-headline level="1">Panel</vue-headline>

					<br>
					<vue-headline level="4">Options:</vue-headline>

					<br><hr><br>

					<a href="/panel-add-ticket">Add new ticket</a>

					<br><br><hr>

				</vue-grid-item>
			</vue-grid-row>
			<vue-grid-row>
				<vue-grid-item fill>
					<table v-html="client"></table>

					<br>
					<table>
						<tbody v-html="tbody"></tbody>
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
    import VueButton from '@/app/shared/components/VueButton/VueButton.vue';
    import VueHeadline from '@/app/shared/components/VueHeadline/VueHeadline.vue';
    import {PanelModule} from '../module';
    import {addNotification, INotification} from '@components/VueNotificationStack/utils';
    import axios from 'axios';
    import VueCookies from 'vue-cookies'
    import {router} from "@/app/router";

    Vue.use(VueCookies);

    export default {
        metaInfo: {
            title: 'Panel',
        },
        components: {
            VueGrid,
            VueBreadcrumb,
            VueGridRow,
            VueGridItem,
            VueButton,
            VueHeadline,
        },
        data(): any {
            return {
                client: null,
                tbody: null,
            };
        },
        mounted() {

            axios.get(`http://localhost:8081/users/login`, {
                headers: {
                    'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                }
            }).then(response => {
                let accountType = response.data.role

                axios.get(`http://localhost:8081/tickets?page=0&size=999`, {
                    headers: {
                        'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                    }
                }).then(response => {
                    let data = response.data.content,
                        row = ``;

                    if (accountType == 'CUSTOMER') {
                        this.client =
                            `<tr>
								<td>
									Contact with customer service:<br>
									<b>Name:</b> Tom Potter<br>
									<b>Email:</b> <a href="mailto:head@example.com">head@example.com</a><br>
									<b>Phone:</b> <a href="tel:6543217890">6543217890</a><br>
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
							${(accountType == 'EMPLOYEE' || accountType == 'HEAD') ? '<th>Action</th>' : ''}
						</tr>`;


                    data.forEach(value => {
                        let date = value.estimatedRelease.split("T")[0].split("-");

                        row +=
                            `<tr>
								<td>${value.brand} ${value.model}</td>
								<td>${value.title}</td>
								<td>${value.description}</td>
								<td>${value.calculationNote}</td>
								<td>$${value.estimatedPrice}</td>
								<td>${(value.finalPrice != undefined) ? '$' + value.finalPrice : '---'}</td>
								<td>${date[1]}.${date[2]}.${date[0]}</td>
								<td>${value.attachedItems}</td>
								<td>${value.status.replaceAll('_', ' ')}</td>
								${(accountType == 'EMPLOYEE' || accountType == 'HEAD') ? `<td><a href="http://localhost:3000/panel-edit-ticket?${value.uuid}">Edit</a></td>` : ''}
							</tr>`

                    })

                    this.tbody = row

                }).catch(function () {

                    addNotification({
                        title: 'Something is wrong!',
                        text: 'Please reload page',
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
        methods: {},
        computed: {
            breadCrumbItems() {
                return [
                    {label: this.$t('common.home' /* Home */), href: '/'},
                    {label: this.$t('common.Panel' /* Panel */), href: '/panel'},
                ];
            },
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
