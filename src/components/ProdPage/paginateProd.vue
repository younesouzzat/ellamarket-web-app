<template>
    <div class="paginate-product">
        <v-card
            elevation="0"
            color="transparent"
            :loading="loading"
            min-height="auto"
        >
            <v-row v-if="loading">
                <v-col class="pt-2" cols="6" md="3" v-for="num in 4" :key="num">
                    <v-skeleton-loader type="image, article, button">
                    </v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row v-if="!loading">
                <v-col cols="12" v-if="!productsData || productsData.length <= 0">
                    <div class="d-flex flex-col justify-center align-center">
                        <v-icon size="80">mdi-magnify</v-icon>
                        <h3 class="font-bold text-2xl">
                            Aucun produits trouvé !
                        </h3>
                    </div>
                </v-col>
                <v-col
                    v-else
                    cols="6"
                    md="3"
                    class="pt-2"
                    v-for="item in productsData"
                    :key="item.titre"
                >
                    <v-card elevation="0" class="px-5 py-5">
                        <v-hover v-slot="{ isHovering, props }">
                            <div
                                class="img-parent-prod-cat position-relative d-flex
                                justify-center align-center"
                                style="height: 150px; overflow: hidden"
                            >
                                <img
                                    :src="
                                        showItem[item.titre]
                                            ? showItem[item.titre]
                                            : `${STORAGE_URL}/products/${item.couverture}`
                                    "
                                    class="w-70"
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
                        <v-card-text class="pl-5 pb-1">
                            <div class="h-10 overflow-hidden">
                                {{
                                    `(${item.titre}) ${item.description}`
                                        .length <= 47
                                        ? `(${item.titre}) ${item.description}`
                                        : `(${item.titre}) ${item.description}`.substring(
                                              0,
                                              47
                                          ) + " ..."
                                }}
                            </div>
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
                            <del v-if="item.prix_special"
                                >{{ item.prix }} MAD</del
                            >
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
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        STORAGE_URL: import.meta.env.VITE_API_BASE_STORAGE,
    }),
    props: {
        loading: {
            type: Boolean,
        },
        productsData: {
            type: Array,
        },
        showItem: {
            type: Array,
        },
    },
};
</script>
