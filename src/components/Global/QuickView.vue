<template>
        <v-dialog v-model="dialog" max-width="900">
            <v-icon
                style="
                    top: -15px;
                    right: -15px;
                    z-index: 10;
                    color: white;
                    padding: 13px;
                    font-size: 18px;
                    position: absolute;
                    background-color: black;
                    cursor: pointer;
                "
                @click="this.dialog = false"
            >
                mdi-close
            </v-icon>
            <v-card elevation="0">
                <v-container fluid class="bg-white p-10">
                    <v-row>
                        <v-col
                            cols="12"
                            md="7"
                            class="d-flex flex-col justify-center align-center"
                        >
                            <v-skeleton-loader
                                v-if="loading"
                                type="image, image, image"
                                width="500"
                            ></v-skeleton-loader>
                            <img
                                v-if="!loading"
                                :src="tab ? tab : `${STORAGE_URL}/products/${product.couverture}`"
                                alt=""
                                style="height: 400px"
                            />
                            <v-tabs
                                center-active
                                height="50px"
                                v-model="tab"
                                class="mt-10 max-w-sm"
                            >
                                <v-tab
                                    v-for="(img, i) in JSON.parse(product.images)"
                                    :key="i"
                                    class="w-10 mx-5"
                                    style="border-radius: 5px"
                                    :value="`${STORAGE_URL}/products/details/${img}`"
                                >
                                    <img
                                        :src="`${STORAGE_URL}/products/details/${img}`"
                                        alt=""
                                        width="50%"
                                        height="50%"
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
                                    style="
                                        font-size: 18px;
                                        font-weight: bold;
                                        white-space: pre-wrap;
                                    "
                                >
                                    {{ product.titre }}
                                </v-card-title>
                                <v-card-subtitle class="px-5">
                                    {{ product.categorie.libelle }}
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
                                        >REF: {{ product.ref ? product.ref : '-' }}</span
                                    >
                                </div>
                                <v-card-text class="mt-1 px-5 text-gray-600">
                                    {{ product.description }}
                                </v-card-text>
                                <v-card-text
                                    class="px-5 pt-0 text-md text-gray-600"
                                >
                                    Disponible:
                                    {{ product.disponible == 1 ? 'En stock' : 'Indisponible' }}
                                </v-card-text>
                                <v-card-text
                                    class="px-5 pt-0 text-md font-bold"
                                >
                                    Prix:
                                    <del>{{ product.prix }} MAD</del>
                                    <span
                                        class="text-red font-weight-bold pl-1"
                                        v-if="product.prix_special"
                                    >
                                        {{
                                            product.prix_special
                                        }}

                                        <!-- Math.ceil(
                                                product.price -
                                                    product.price *
                                                        (product.discountPercentage /
                                                            100)
                                            ) -->
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
                                    Sous-total : {{ qte * 
                                            (product.prix_special ? product.prix_special : product.prix)
                                        }}
                                        <!-- Math.ceil(
                                            product.price -
                                                product.price *
                                                    (product.discountPercentage /
                                                        100)
                                        ) -->
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
            </v-card>
        </v-dialog>
</template>

<script>
import { cartModule } from "@/store/cart.js";
import { mapState, mapActions } from 'pinia';
 
export default {
    inject:['Emitter'],
    mounted() {
        this.Emitter.on('openQuickView', (data) => {
            this.loading = true;
            this.product = data;
            this.dialog  = true;
            setTimeout(() => {
                this.loading = false;
            },1000)
        })
    },
    data: () => ({
        tab: "",
        qte: 1,
        dialog: false,
        loading: false,
        btnLoading: false,
        product: "",
        STORAGE_URL: import.meta.env.VITE_API_BASE_STORAGE,
    }),
    methods: {
        ...mapActions(cartModule, ['addItem']),
        addToCart(item) {
            this.btnLoading = true;
            item.qte = this.qte;
            setTimeout(() => {
                this.btnLoading = false;
                this.addItem(item);
                this.Emitter.emit('openCart');
                this.Emitter.emit('showMessage', item.titre);
                this.dialog = false;
            },1000);
        }
    }
};
</script>
