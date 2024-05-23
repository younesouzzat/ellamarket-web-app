<template>
    <div class="new-products pt-12">
        <div class="title d-flex justify-center align-center px-5 mb-3">
            <h2
                class="text-left flex-grow-1"
                style="font-size: 20px; font-weight: 600"
            >
                Nouveaux produits
            </h2>
            <router-link :to="{ name: 'products_all' }" class="text-black" style="font-size: 14px">Voir plus ...</router-link>
        </div>
        <v-container fluid>
            <v-row>
                <v-col
                    cols="12"
                    md="7"
                    class="pt-14"
                    v-if="!products.length"
                >
                    <v-row>
                        <v-col cols="4" v-for="num in 3" :key="num">
                            <v-skeleton-loader type="image, article, button">
                            </v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col
                    cols="12"
                    md="7"
                    class="pt-14 order-1 order-md-0"
                    v-else
                >
                    <Swiper
                        :pagination="{
                            el: '.swiper-pagination',
                            clickable: true,
                        }"
                        :modules="modules"
                        :slides-per-view="3"
                        :space-between="20"
                        :breakpoints="breakpoints"
                        class="pb-10"
                    >
                        <swiper-slide v-for="item in products" :key="item.id">
                            <v-card elevation="0" class="pb-5">
                                <v-hover v-slot="{ isHovering, props }">
                                    <div
                                        class="img-parent position-relative"
                                        style="height: 160px; overflow: hidden"
                                    >
                                        <img
                                            :src="
                                                showItem[item.titre]
                                                    ? showItem[item.titre]
                                                    : `${STORAGE_URL}/products/${item.couverture}`
                                            "
                                            class="w-100"
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
                                                transform: translate(
                                                    -50%,
                                                    -50%
                                                );
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
                                <v-card-text class="pl-5 pb-1 h-10">
                                    {{
                                        `(${item.titre}) ${item.description}`
                                            .length <= 35
                                            ? `(${item.titre}) ${item.description}`
                                            : `(${item.titre}) ${item.description}`.substring(
                                                  0,
                                                  35
                                              ) + " ..."
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
                                <v-card-text class="pl-5 pt-0">
                                    <del v-if="item.prix_special">{{ item.prix }} MAD</del>
                                    <span v-else>{{ item.prix }} MAD</span>
                                    <span
                                        class="text-red font-weight-bold pl-1"
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
                                            <img
                                                :src="`${STORAGE_URL}/products/details/${pic}`"
                                                width="100%"
                                                height="100%"
                                            />
                                        </div>
                                    </v-btn>
                                </v-btn-toggle>
                                <div class="my-5 text-center">
                                    <v-btn
                                        density="combact"
                                        class="py-2 px-15"
                                        style="
                                            text-transform: none;
                                            border-radius: 30px;
                                        "
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
                        <div class="swiper-pagination"></div>
                    </Swiper>
                </v-col>
                <v-col cols="12" md="5">
                    <div class="w-100 md:justify-center md:align-center">
                        <img src="@/assets/images/vr-banner.webp" class="w-100 md:w-1/2" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination } from "swiper";

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
            modules: [Pagination],
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
            1024: {
                slidesPerView: 3,
            },
        },
        STORAGE_URL: import.meta.env.VITE_API_BASE_STORAGE,
    }),
};
</script>

<style>
.new-products {
    height: auto;
}

@media (max-width: 580px) {
    .img-parent {
        height: 300px !important;
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
        top: 50%;
    }

    /* .new-products {
        margin-bottom: 800px;
    } */
}
</style>
