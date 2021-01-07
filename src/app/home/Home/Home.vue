<template>
	<div>
		<stage :disable-particles="disableParticles"/>
		<home-section
				image="https://images.unsplash.com/photo-1582854050148-651d87fa3319?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80auto=format&fit=crop&w=512&q=60"
				alternative
		>
			<br/>
			<br/>
			<vue-headline level="2">Transform Your Workshop into a Profit Machine</vue-headline>
			<br/>
			<p>Completely optimise your workshop and free up your time with an overflowing
				suite of versatile features that handle every aspect of your busy,
				hectic daily operations.</p>
			<br/><br/>
			<vue-headline level="3">Streamlined Workflow</vue-headline>
			<p>
				Manage your entire workflow in one place from start to finish via an easy-to-use dashboard. Track tickets, users, create new tickets, and more.
			</p>
			<br/><br/>
			<vue-headline level="3">Easy Tasks Management</vue-headline>
			<p>
				Take the stress and time out of tasking managing. From now you have EVERYTHING in one place.
			</p>
		</home-section>

		<home-section
				image="https://images.unsplash.com/photo-1579047917338-a6a69144fe63?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&auto=format&fit=crop&w=512&q=60"
				flip
		>
			<br/><br/><br/>
			<vue-headline level="3">Efficient for Customer Informations</vue-headline>
			<p>
				Make job management simple and efficient from first quote to completion. Deliver details and costs to your customers.
			</p>
			<br/><br/><br/>
			<vue-headline level="3">Easy Customer Management</vue-headline>
			<p>
				Take the stress and time out of managing customers. Deliver customer service like the ‘big shops’ – without the cost or overstaffing.
			</p>
			<br/><br/><br/>
			<vue-headline level="3">Multi languages support</vue-headline>
			<p>
				Your customers will be able to choose from tons of languages!
			</p>
		</home-section>

		<home-section
				image="https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=60"
				alternative
		>
			<br><br><br><br><br><br><br><br>
			<vue-headline level="2"><strong>Be the best, start it NOW!</strong></vue-headline>
			<br>
			<vue-headline level="2">Log in today absolutely for free!</vue-headline>
		</home-section>
	</div>
</template>

<script lang="ts">
    import {mapState} from 'vuex';
    import Stage from '../components/Stage/Stage.vue';
    import HomeSection from '@/app/home/components/HomeSection/HomeSection.vue';
    import {IState} from '@/app/state';
    import VueHeadline from '@components/VueHeadline/VueHeadline.vue';

    export default {
        metaInfo: {
            title: 'Car repair shop',
            meta: [
                {
                    name: 'description',
                    content:
                        'Car repair shop - Transform Your Workshop into a Profit Machine',
                },
                {
                    name: 'robots',
                    content: 'INDEX,FOLLOW',
                },
                {
                    name: 'keywords',
                    content: 'Car, repair, shop, workshop',
                },

                {name: 'og:url', content: 'http://localhost:3000/'},
                {name: 'og:site_name', content: 'Car repair shop'},
                {name: 'og:type', content: 'website'},
                {name: 'og:locale', content: 'en'},
                {
                    name: 'og:title',
                    content:
                        'Car repair shop - Transform Your Workshop into a Profit Machine',
                },
                {
                    name: 'og:description',
                    content:
                        'Car repair shop - Transform Your Workshop into a Profit Machine',
                },
                {name: 'og:image:url', content: 'http://localhost:3000/client/logo.png'},

                {name: 'twitter:card', content: 'summary'},
                {name: 'twitter:site', content: '@Carrepairshop'},
                {name: 'twitter:creator', content: '@Carrepairshop'},
                {
                    name: 'twitter:title',
                    content:
                        'Car repair shop - Transform Your Workshop into a Profit Machine',
                },
                {name: 'twitter:url', content: 'http://localhost:3000/'},
                {name: 'twitter:image', content: 'http://localhost:3000/client/logo.png'},
                {
                    name: 'twitter:description',
                    content:
                        'Car repair shop - Transform Your Workshop into a Profit Machine',
                },
            ],
        },
        components: {
            VueHeadline,
            HomeSection,
            Stage,
        },
        computed: {
            ...mapState({
                disableParticles: (state: IState) =>
                    (state.app.config && state.app.config.features && state.app.config.features.disableParticles) || false,
            }),
        },
    };
</script>
