<template>
    <div class="home_layout">
        <v-layout class="position-relative">
            <CartDrawer :windWidth="windWidth" :drawer="drawer" />
            <MenuDrawer :windWidth="windWidth" :drawer_menu="drawer_menu" :categories="categories" />
            <v-main :style="`padding-top: ${
                windWidth <= 990 ? '60px' : '150px'
            }; background-color: white; height: 100%;`">
                <slot></slot>
            </v-main>
            <HomeNav v-show="windWidth > 990" :categories="categories" />
            <FixedNav v-show="windWidth > 990" :categories="categories" />
            <ResponsiveNav v-show="windWidth <= 990" :categories="categories"/>
            <HomeFooter :categories="categories" />
        </v-layout>
    </div>
</template>

<script>
import HomeNav from '@/components/Global/HomeNav.vue';
import HomeFooter from '@/components/Global/HomeFooter.vue';
import CartDrawer from '@/components/Global/CartDrawer.vue';
import MenuDrawer from '@/components/Global/MenuDrawer.vue';
import FixedNav from '@/components/Global/FixedNav.vue';
import ResponsiveNav from '@/components/Global/ResponsiveNav.vue';
import { productsModule } from '@/store/products';
import { mapActions, mapState } from 'pinia';

export default {
    data() {
        return {
            drawer : false,
            drawer_menu : false,
            windWidth: 0,
        }
    },
    components: {
        HomeNav,
        FixedNav,
        HomeFooter,
        CartDrawer,
        MenuDrawer,
        ResponsiveNav,
    },
    computed: {
        ...mapState(productsModule, ['categories'])
    },
    methods: {
        ...mapActions(productsModule, ['getCategories']),
    },
    async mounted() {
        this.windWidth = window.innerWidth;
        window.onresize = () => {
            this.windWidth = window.innerWidth;
        };

        await this.getCategories();
    }
}
</script>