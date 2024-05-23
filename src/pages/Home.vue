<template>
    <HomeLayout>
        <div class="home">
            <UpperBanner />
            <Features />
            <TopOffers />
            <ProdcutsSwiper :products="flashDeals"/>
            <TopCat />
            <NewProducts :products="newProducts"/>
        </div>
    </HomeLayout>
</template>

<script>
import HomeLayout from '@/layout/HomeLayout.vue';
import UpperBanner from '@/components/HomePage/UpperBanner.vue'
import Features from '@/components/HomePage/Features.vue'
import TopOffers from '@/components/HomePage/TopOffers.vue'
import ProdcutsSwiper from '@/components/HomePage/ProdcutsSwiper.vue'
import TopCat from '@/components/HomePage/TopCategories.vue';
import NewProducts from '@/components/HomePage/NewProducts.vue';
import { productsModule } from '@/store/products';
import { mapActions, mapState } from 'pinia';


export default {
    components : {
        HomeLayout,
        UpperBanner,
        Features,
        TopOffers,
        ProdcutsSwiper,
        TopCat,
        NewProducts,
    },
    computed: {
        ...mapState(productsModule, ['flashDeals','newProducts'])
    },
    methods: {
        ...mapActions(productsModule, ['getProducts','getCategories']),
    },
    async mounted() {
        await this.getProducts();
    }
}

</script>