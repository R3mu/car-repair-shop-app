<template>
	<div :class="$style.user">
		<vue-grid>
			<vue-breadcrumb :items="breadCrumbItems"></vue-breadcrumb>

			<vue-grid-row>
				<vue-grid-item fill>
					<vue-headline level="1">Users list</vue-headline>
				</vue-grid-item>
			</vue-grid-row>
			<vue-grid-row>
				<vue-grid-item fill>

					<div v-if="add">
						<br><br>
						<vue-headline level="4">Options:</vue-headline>
						<hr><br>

						<a href="/panel-add-user" class="add">
							<vue-button color="primary">Add new user</vue-button>
						</a>

						<br>
					</div>
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
    import {UserModule} from '../module';
    import {addNotification, INotification} from '@components/VueNotificationStack/utils';
    import axios from 'axios';
    import VueCookies from 'vue-cookies'
    import {router} from "@/app/router";

    Vue.use(VueCookies);

    export default {
        metaInfo: {
            title: 'User',
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
                add: true,
            };
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

                axios.get(`http://localhost:8081/users`, {
                    headers: {
                        'Authorization': `Basic ${Vue.$cookies.get('authorizationKey')}`
                    }
                }).then(response => {
                    let data = response.data.content,
                        row = ``;

                    if (accountType == 'CUSTOMER') {
                        this.add = false;
                    }

                    row +=
                        `<tr>
							<th>First name and last name</th>
							<th>Email address</th>
							<th>Phone number</th>
							<th>Role</th>
							<th>uuid</th>
						</tr>`;

                    data.forEach(value => {
                        row +=
                            `<tr>
								<td>${value.firstName} ${value.lastName}</td>
								<td><a href="mailto:${value.email}">${value.email}</a></td>
								<td><a href="tel:${value.mobilePhone}">${value.mobilePhone}</a></td>
								<td>${value.role}</td>
								<td>${value.uuid}</td>
							</tr>`

                    })

                    this.tbody = row

                }).catch(error => {
                    addNotification({
                        title: "ERROR",
                        text: error.response.data.errors,
                    } as INotification);

                });

            }).catch(() => {
                addNotification({
                    title: 'You\'re not logged!',
                    text: 'Please Log in to access this user',
                } as INotification);

                router.replace('/');
            });
        },
        methods: {},
        computed: {
            breadCrumbItems() {
                return [
                    {label: this.$t('common.home' /* Home */), href: '/'},
                    {label: this.$t('common.User' /* User */), href: '/user'},
                ];
            },
        },
        beforeCreate() {
            registerModule('user', UserModule);
        },
        beforeMount() {

        },
        prefetch: (options: IPreLoad) => {
            registerModule('user', UserModule);

            return Promise.resolve();
        },
    };
</script>

<style lang="scss" module>
	@import "~@/app/shared/design-system";

	.user {
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
