<template>
    <HomeLayout>
        <div class="product-details bg-white pt-10">
            <v-container fluid fill-height>
                <v-row>
                    <v-col
                        cols="12"
                        md="7"
                        class="d-flex flex-col justify-center align-center"
                    >
                        <v-skeleton-loader
                            v-if="loading"
                            type="image, image, image"
                            width="400"
                        ></v-skeleton-loader>
                        <img
                            v-if="!loading"
                            :src="
                                tab
                                    ? tab
                                    : `${STORAGE_URL}/products/${product.couverture}`
                            "
                            alt=""
                            style="height: 400px"
                        />
                        <v-tabs
                            center-active
                            height="auto"
                            v-model="tab"
                            class="mt-10 max-w-lg"
                        >
                            <v-tab
                                v-for="(img, i) in product.images
                                    ? JSON.parse(product.images)
                                    : ''"
                                :key="i"
                                class="mx-5 h-10 w-10 bg-white"
                                :value="`${STORAGE_URL}/products/details/${img}`"
                            >
                                <img
                                    :src="`${STORAGE_URL}/products/details/${img}`"
                                    alt=""
                                    width="100%"
                                    height="100%"
                                />
                            </v-tab>
                        </v-tabs>
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-skeleton-loader
                            v-if="loading"
                            type="article, article, article, button"
                        ></v-skeleton-loader>
                        <v-card elevation="0" v-if="!loading">
                            <v-card-title
                                class="px-5"
                                style="font-size: 18px; font-weight: bold"
                            >
                                {{ product.titre }}
                            </v-card-title>
                            <v-card-subtitle class="px-5">
                                {{
                                    product.categorie
                                        ? product.categorie.libelle
                                        : ""
                                }}
                            </v-card-subtitle>
                            <div
                                class="rating-parent px-5 d-flex align-center gap-3"
                            >
                                <v-rating
                                    v-model="product.rating"
                                    half-increments
                                    readonly
                                    color="yellow-darken-3"
                                    size="small"
                                    density="compact"
                                ></v-rating>
                                <span class="text-gray-600 text-sm"
                                    >REF:
                                    {{ product.ref ? product.ref : "-" }}</span
                                >
                            </div>
                            <v-card-text class="mt-1 px-5 text-gray-600">
                                {{ product.description }}
                            </v-card-text>
                            <v-card-text
                                class="px-5 pt-0 text-md text-gray-600"
                            >
                                Disponible:
                                {{ product.disponible == 1 ? "En stock" : "-" }}
                            </v-card-text>
                            <v-card-text class="px-5 pt-0 text-md font-bold">
                                Prix:
                                <del v-if="product.prix_special"
                                    >{{ product.prix }} MAD</del
                                >
                                <span v-else>{{ product.prix }} MAD</span>
                                <span
                                    class="text-red font-weight-bold pl-1"
                                    v-if="product.prix_special"
                                >
                                    {{ product.prix_special }}
                                    MAD
                                </span>
                            </v-card-text>
                            <v-card-text class="px-5 pt-0">
                                Quantité
                            </v-card-text>
                            <div
                                class="counter ml-5"
                                style="
                                    border-radius: 30px;
                                    border: 1px solid black;
                                    width: fit-content;
                                "
                            >
                                <v-icon
                                    size="20"
                                    @click="qte > 1 ? qte-- : false"
                                    >mdi-minus</v-icon
                                >
                                <input
                                    type="number"
                                    class="text-center py-2"
                                    v-model="qte"
                                    min="1"
                                    style="
                                        border: none;
                                        outline: none;
                                        width: 80px;
                                    "
                                />
                                <v-icon size="20" @click="qte++"
                                    >mdi-plus</v-icon
                                >
                            </div>
                            <v-card-text>
                                Sous-total :
                                {{
                                    qte *
                                    (product.prix_special
                                        ? product.prix_special
                                        : product.prix)
                                }}
                                MAD
                            </v-card-text>
                            <v-card-actions class="mt-7 px-5 w-100">
                                <v-btn
                                    variant="outlined"
                                    style="
                                        text-transform: none;
                                        border-radius: 30px;
                                        background-color: black;
                                    "
                                    class="w-75 text-white"
                                    density="compact"
                                    height="50"
                                    :loading="btnLoading"
                                    @click="addToCart(product)"
                                >
                                    Acheter
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </HomeLayout>
</template>

<script>
import HomeLayout from "@/layout/HomeLayout.vue";
import { productsModule } from "@/store/products";
import { cartModule } from "@/store/cart.js";
import { mapState, mapActions } from "pinia";

export default {
    inject: ["Emitter"],
    data: () => ({
        tab: "",
        qte: 1,
        loading: false,
        btnLoading: false,
        STORAGE_URL: import.meta.env.VITE_API_BASE_STORAGE,
    }),
    computed: {
        ...mapState(productsModule, ["product"]),
    },
    methods: {
        ...mapActions(productsModule, ["getProduct"]),
        ...mapActions(cartModule, ["addItem"]),
        async addToCart(item) {
            this.btnLoading = true;
            item.qte = this.qte;
            setTimeout(() => {
                this.btnLoading = false;
                this.addItem(item);
                this.Emitter.emit("openCart");
                this.Emitter.emit("showMessage", item.title);
                this.dialog = false;
            }, 1000);
        },
    },
    async mounted() {
        this.loading = true;
        await this.getProduct(this.$route.params.id);
        this.loading = false;
    },
    components: {
        HomeLayout,
    },
};
</script>

<style>
@media (max-width: 900) {
    .product-details {
        height: 1000px !important;
    }
}
</style>
