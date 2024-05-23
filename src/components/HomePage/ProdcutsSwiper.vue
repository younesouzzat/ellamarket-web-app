<template>
    <div class="flash-deals pt-15 px-5">
        <div class="title mb-10 px-5 d-flex align-center justify-between">
            <h2 class="font-semibold text-red-600" style="font-size: 30px">
                Promotions
            </h2>
            <router-link :to="{ name: 'products_all' }" class="text-black" style="font-size: 14px">Voir plus ...</router-link>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" class="pt-14" v-if="!products.length">
                    <v-row>
                        <v-col cols="3" v-for="num in 4" :key="num">
                            <v-skeleton-loader type="image, article, button">
                            </v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <Swiper
            :pagination="{ el: '.swiper-pagination', clickable: true }"
            :modules="modules"
            :slides-per-view="products.length"
            :space-between="35"
            :navigation="{ prevIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
            :autoplay="{
                delay: 3000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            }"
            :loop="true"
            :breakpoints="breakpoints"
            class="pb-10"
        >
        
            <swiper-slide v-for="item in products" :key="item.id">
                <v-card elevation="0" class="pb-5">
                    <v-hover v-slot="{ isHovering, props }">
                        <div
                            class="img-parent position-relative d-flex justify-center align-center"
                            style="height: 200px; overflow: hidden"
                        >
                            <img
                                :src="
                                    showItem[item.titre]
                                        ? showItem[item.titre]
                                        : `${STORAGE_URL}/products/${item.couverture}`
                                "
                                class="w-50"
                                :style="`height: 100%; transition: 0.5s all ease-in-out; scale: ${
                                    isHovering ? 1.05 : 1
                                }; cursor: pointer`"
                                alt=""
                                v-bind="props"
                            />
                            <v-btn
                                density="compact"
                                width="60"
                                height="30"
                                variant="outlined quick-view-btn"
                                class="bg-white"
                                style="
                                    text-transform: none;
                                    position: absolute;
                                    left: 50%;
                                    top: 50%;
                                    transform: translate(-50%, -50%);
                                    border-radius: 30px;
                                    transition: 0.2 all ease-in-out;
                                    opacity: 0;
                                "
                                @click="openQuickView(item)"
                            >
                                Voir
                            </v-btn>
                        </div>
                    </v-hover>
                    <v-card-text class="pl-5 pb-1 h-10 font-semibold">
                        {{
                            `(${item.titre}) ${item.description}`.length <= 57 ?
                            `(${item.titre}) ${item.description}` :
                            `(${item.titre}) ${item.description}`.substring(0, 57) + ' ...' 
                        }}
                    </v-card-text>
                    <v-rating
                        class="pl-5"
                        color="orange-darken-2"
                        size="x-small"
                        density="combact"
                        v-model="item.rating"
                        half-increments
                        readonly
                    >
                    </v-rating>
                    <v-card-text class="pl-5 pt-0 font-semibold">
                        <del v-if="item.prix_special">{{ item.prix }} MAD</del>
                        <span v-else>{{ item.prix }} MAD</span>
                        <span
                            class="text-red font-semibold pl-1"
                            v-if="item.prix_special"
                        >
                            {{ item.prix_special }}
                            MAD
                        </span>
                    </v-card-text>
                    <v-btn-toggle
                        class="pl-5"
                        v-model="showItem[item.titre]"
                        mandatory
                    >
                        <v-btn
                            v-for="(pic, index) in JSON.parse(item.images)"
                            :value="`${STORAGE_URL}/products/details/${pic}`"
                            :key="index"
                            size="x-small"
                            rounded="xl"
                            ripple="false"
                        >
                            <div
                                style="
                                    width: 30px;
                                    height: 30px;
                                    border-radius: 50%;
                                    border: 1px solid black;
                                    overflow: hidden;
                                "
                                class="d-flex justify-center align-center"
                            >
                                <img :src="`${STORAGE_URL}/products/details/${pic}`" width="100%" height="100%" />
                            </div>
                        </v-btn>
                    </v-btn-toggle>
                    <div class="my-5 text-center">
                        <v-btn
                            density="combact"
                            class="py-2 px-15"
                            style="text-transform: none; border-radius: 30px"
                            variant="outlined"
                            @click="
                                $router.push({
                                    name: 'detail_product',
                                    params: { id: item.id },
                                })
                            "
                        >
                            Voir options
                        </v-btn>
                    </div>
                </v-card>
            </swiper-slide>
            <div class="swiper-prev"></div>
            <div class="swiper-next"></div>
            <div class="swiper-pagination"></div>
        </Swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";

export default {
    inject: ["Emitter"],
    methods: {
        openQuickView(product) {
            this.Emitter.emit("openQuickView", product);
        },
    },
    props: {
        products: {
            type: Array,
        },
    },
    setup() {
        return {
            modules: [Pagination, Navigation, Autoplay],
        };
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    data: () => ({
        showItem: {},
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            580: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 3,
            },
            900: {
                slidesPerView: 4,
            },
        },
        STORAGE_URL: import.meta.env.VITE_API_BASE_STORAGE,
    }),
};
</script>

<style lang="css">
.swiper-button-prev::after,
.swiper-button-next::after {
    font-size: 13px !important;
    font-weight: 900;
    border-radius: 50%;
    padding: 15px;
    bottom: 60px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid rgb(32, 32, 32);
    color: rgb(32, 32, 32);
    position: absolute;
}
.swiper-pagination-bullet {
    padding-top: 5px;
    width: 10px !important;
    height: 10px !important;
}

@media (max-width:580) {
    .img-parent {
        height: 300px !important;
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
        top: 50%;
    }
}
</style>
