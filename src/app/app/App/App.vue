<template>
	<div id="app" :class="$style.app">
		<vue-notification-stack/>

		<vue-navigation-progress :is-navigating="isNavigating"/>

		<vue-nav-bar>
			<vue-button class="register" slot="right" color="primary" @click="register">
				Register
			</vue-button>

			<vue-button class="login" slot="right" color="primary" @click="login">
				Login
			</vue-button>

			<vue-button class="logout" slot="right" color="primary" @click="onLogout">
				Logout
			</vue-button>
		</vue-nav-bar>

		<router-view :class="$style.content"/>

		<vue-footer/>

		<vue-cookie-consent
				current-version="1.0.0"
				:cookie-consent-version="cookieConsentVersion"
				:set-cookie-consent-version="setCookieConsentVersion"
		>
			This is a cookie consent component which shows the cookie consent every time you change the version of the
			consent.
		</vue-cookie-consent>

		<vue-sidebar>
			<vue-sidebar-group title="Languages">
				<vue-sidebar-group-item>
					<vue-select name="lang" id="lang" :options="languages" @input="localeSwitch" :value="getLocale"/>
				</vue-sidebar-group-item>
			</vue-sidebar-group>

			<vue-sidebar-group title="Navigation">
				<vue-sidebar-group-item to="/">
					<vue-icon-hashtag/>
					Home
				</vue-sidebar-group-item>

				<vue-sidebar-group-item :to="{ name: 'panel' }">
					<vue-icon-hashtag/>
					Tickets panel
				</vue-sidebar-group-item>

				<vue-sidebar-group-item :to="{ name: 'user' }">
					<vue-icon-hashtag/>
					Users panel
				</vue-sidebar-group-item>
			</vue-sidebar-group>

			<vue-sidebar-group title="Documentation">
				<vue-sidebar-group-item>
					<a href="/">
						<vue-icon-book/>
						Documentation
					</a>
				</vue-sidebar-group-item>
			</vue-sidebar-group>

			<vue-sidebar-group title="Community">
				<vue-sidebar-group-item>
					<a href="https://github.com/R3mu/car-repair-shop-app" target="_blank" rel="noopener">
						<vue-icon-github/>
						karolkrzysciak
					</a>
				</vue-sidebar-group-item>
				<vue-sidebar-group-item>
					<a href="https://github.com/pawelpotaczala/car-repair-shop-api" target="_blank" rel="noopener">
						<vue-icon-github/>
						pawelpotaczala
					</a>
				</vue-sidebar-group-item>
			</vue-sidebar-group>
		</vue-sidebar>
	</div>
</template>

<script lang="ts">
    import {mapActions, mapGetters} from 'vuex';
    import {loadLocaleAsync} from '@shared/plugins/i18n/i18n';
    import '@shared/designSystem/global.scss';
    import VueNavBar from '@components/VueNavBar/VueNavBar.vue';
    import VueGrid from '@components/VueGrid/VueGrid.vue';
    import VueGridItem from '@components/VueGridItem/VueGridItem.vue';
    import VueFooter from '@components/VueFooter/VueFooter.vue';
    import VueNotificationStack from '@components/VueNotificationStack/VueNotificationStack.vue';
    import VueCookieConsent from '@components/VueCookieConsent/VueCookieConsent.vue';
    import VueNavigationProgress from '@components/VueNavigationProgress/VueNavigationProgress.vue';
    import VueSidebar from '@components/VueSidebar/VueSidebar.vue';
    import VueSidebarGroup from '@components/VueSidebar/VueSidebarGroup/VueSidebarGroup.vue';
    import VueSidebarGroupItem from '@components/VueSidebar/VueSidebarGroupItem/VueSidebarGroupItem.vue';
    import VueIconCode from '@components/icons/VueIconCode/VueIconCode.vue';
    import VueIconBook from '@components/icons/VueIconBook/VueIconBook.vue';
    import VueIconHashtag from '@components/icons/VueIconHashtag/VueIconHashtag.vue';
    import VueIconGithub from '@components/icons/VueIconGithub/VueIconGithub.vue';
    import VueIconTwitterSquare from '@components/icons/VueIconTwitterSquare/VueIconTwitterSquare.vue';
    import VueSelect from '@components/VueSelect/VueSelect.vue';
    import VueIconPuzzlePiece from '@components/icons/VueIconPuzzlePiece/VueIconPuzzlePiece.vue';
    import VueButton from '@components/VueButton/VueButton.vue';
    import VueModal from '@components/VueModal/VueModal.vue';
    import LoginForm from '@shared/modules/auth/LoginForm/LoginForm.vue';
    import {addNotification} from '@components/VueNotificationStack/utils';
    import Vue from 'vue';
    import VueCookies from 'vue-cookies'

    Vue.use(VueCookies);

    export default {
        name: 'App',
        components: {
            LoginForm,
            VueModal,
            VueButton,
            VueIconPuzzlePiece,
            VueSelect,
            VueIconTwitterSquare,
            VueIconGithub,
            VueIconHashtag,
            VueIconBook,
            VueIconCode,
            VueSidebarGroupItem,
            VueSidebarGroup,
            VueSidebar,
            VueNavigationProgress,
            VueCookieConsent,
            VueNavBar,
            VueGrid,
            VueGridItem,
            VueFooter,
            VueNotificationStack,
        },
        data(): any {
            return {
                isNavigating: false,
                languages: [
                    {label: 'English', value: 'en'},
                    {label: 'Deutsch', value: 'de'},
                    {label: 'Português', value: 'pt'},
                    {label: '中文', value: 'zh-cn'},
                ],
                showLoginModal: false,
                isLoginPending: false,
            };
        },
        computed: {
            ...mapGetters('app', ['cookieConsentVersion', 'getLocale']),
            ...mapGetters('auth', ['isAuthenticated']),
        },
        methods: {
            ...mapActions('app', ['changeLocale', 'setCookieConsentVersion']),
            ...mapActions('auth', ['createToken', 'revokeToken']),
            localeSwitch(locale: string) {
                loadLocaleAsync(locale).catch((error: Error) => console.log(error)); // tslint:disable-line

                this.changeLocale(locale);
            },
            register: function () {
                this.$router.push({name: 'register'});
            },
            login: function () {
                this.$router.push({name: 'login'});
            },
            initProgressBar() {
                this.$router.beforeEach((to: any, from: any, next: any) => {
                    this.isNavigating = true;
                    next();
                });
                this.$router.afterEach(() => {
                    this.isNavigating = false;
                });
            },
            async onLogout() {
                this.isLoginPending = true;

                await this.revokeToken();

                this.$router.push('/');

                this.$cookies.remove("authorizationKey");

                this.isLoginPending = false;
                this.showLoginModal = false;

                this.$el.querySelector('.login').style.display = "block";
                this.$el.querySelector('.register').style.display = "block";
                this.$el.querySelector('.logout').style.display = "none";
            },
        },
        created() {
            this.initProgressBar();
        },
        beforeMount() {
            if (Vue.$cookies.get('authorizationKey')) {
                this.$el.querySelector('.login').style.display = "none";
                this.$el.querySelector('.register').style.display = "none";
            } else {
                this.$el.querySelector('.logout').style.display = "none";
            }
        },
    };
</script>

<style lang="scss" module>
	@import '~@/app/shared/design-system';
	@import '~@/app/shared/designSystem/reset';
	@import '~@/app/shared/designSystem/typo';

	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.content {
		flex: 1;
	}

	.logo {
		position: relative;
		top: $space-4;
		width: $space-24;
		height: $space-24;
	}
</style>
