<template>
	<div :class="$style.error">
		<vue-headline level="1">Error</vue-headline>
		<vue-headline level="3">Try again later!</vue-headline>
	</div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
    import VueCookies from 'vue-cookies'

    Vue.use(VueCookies);

    export default {
        metaInfo: {
            title: 'vuesion - an error occurred',
            meta: [
                {
                    name: 'robots',
                    content: 'NOINDEX,NOFOLLOW',
                },
            ],
        },
        name: 'Error',
        components: {VueHeadline},
        props: {},
        data(): any {
            return {};
        },
        computed: {},
        methods: {},
        beforeMount() {

        },
    };
</script>

<style lang="scss" module>
	@import '~@/app/shared/design-system';

	.error {
		padding-top: $nav-bar-height;
		text-align: center;
		width: 300px;
		height: 300px;
		margin: auto;
		margin-top: 25%;
	}
</style>
