<template>
    <div class="drawer">
        <v-navigation-drawer
            v-model="drawer"
            location="right"
            temporary
            :width="windWidth <= 767 ? windWidth / 2 : 360"
        >
            <v-card elevation="0" class="px-2">
                <v-card-title
                    class="px-1 pt-5 d-flex justify-between align-center w-100"
                    style="font-size: 25px; font-weight: bold"
                >
                    Panier
                    <v-icon @click="drawer = false">mdi-close</v-icon>
                </v-card-title>
                <v-card-text class="px-1 text-gray-600"
                    >{{ cartItems.length }} Article</v-card-text
                >
                <v-card-text
                    class="px-1 pt-2 text-gray-600"
                    v-if="!cartItems.length"
                    >
                        <div class="d-flex pt-[50%] flex-col justify-center align-center">
                            <v-icon size="80">mdi-magnify</v-icon>
                            <h3 class="font-bold text-2xl text-center">Votre panier est vide !</h3>
                        </div>
                    </v-card-text
                >
            </v-card>
            <v-card
                elevation="0"
                class="px-1 mt-5 items-card"
                max-height="250"
                style="overflow-y: auto"
                v-if="cartItems.length"
            >
                <v-container class="px-0">
                    <v-row v-for="item in cartItems" :key="item.id">
                        <v-col cols="12" sm="5" class="img_drawer">
                            <img :src="`${STORAGE_URL}/products/${item.couverture}`" class="w-100" alt="" />
                        </v-col>
                        <v-col cols="12" sm="7">
                            <v-card-title
                                class="px-0 pt-0"
                                style="
                                    white-space: pre-wrap;
                                    font-size: 14px;
                                    line-height: 1.2;
                                "
                            >
                                {{ item.titre.substring(0,20)+ '...' }}
                            </v-card-title>
                            <v-card-subtitle class="px-0">
                                Catégorie : {{ item.categorie.libelle }}
                            </v-card-subtitle>
                            <v-card-text class="px-0" style="font-weight: bold">
                                Prix :
                                {{
                                    item.qte * (item.prix_special ? item.prix_special : item.prix)
                                }}
                                MAD
                            </v-card-text>
                            <v-card-text class="px-0 pt-0">
                                <div
                                    class="d-flex justify-between align-center"
                                >
                                    <div
                                        class="counter px-1"
                                        style="
                                            border-radius: 30px;
                                            border: 1px solid black;
                                            width: fit-content;
                                        "
                                    >
                                        <v-icon
                                            size="18"
                                            @click="
                                                item.qte > 1
                                                    ? item.qte--
                                                    : false
                                            "
                                            >mdi-minus</v-icon
                                        >
                                        <input
                                            type="number"
                                            class="text-center py-2"
                                            v-model="item.qte"
                                            min="1"
                                            style="
                                                border: none;
                                                outline: none;
                                                width: 60px;
                                            "
                                        />
                                        <v-icon size="18" @click="item.qte++"
                                            >mdi-plus</v-icon
                                        >
                                    </div>
                                    <div class="item-footer">
                                        <v-icon
                                            style="cursor: pointer"
                                            @click="deleteItem(item.id)"
                                            >mdi-close</v-icon
                                        >
                                    </div>
                                </div>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-card class="p-0 mt-5" elevation="0" v-if="cartItems.length">
                <v-card-text style="font-size: 18px; font-weight: bold;">
                    Total : {{ calTotalCart }} MAD
                </v-card-text>
                <v-card-actions
                    class="flex-column justify-center align-center"
                    style="gap: 5px"
                >
                    <v-btn
                        class="w-100 px-0"
                        style="text-transform: none; border-radius: 30px"
                        density="compact"
                        variant="elevated"
                        height="45"
                        color="blue"
                        elevation="0"
                        @click="toCheckout"
                    >
                        Passer la commande
                    </v-btn>
                    <v-btn
                        class="w-100 px-0"
                        style="text-transform: none; border-radius: 30px"
                        density="compact"
                        variant="outlined"
                        height="45"
                        @click="$router.push({ name: 'panier' })"
                    >
                        Voir panier
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { cartModule } from "@/store/cart.js";
import { mapState, mapActions } from "pinia";

export default {
    inject: ["Emitter"],
    props: {
        windWidth: {
            type: Number
        }
    },  
    data() {
        return {
            drawer: false,
            STORAGE_URL: import.meta.env.VITE_API_BASE_STORAGE,
        };
    },
    methods: {
        ...mapActions(cartModule, ["getItemsCart", "deleteItem", "setLocalStorage"]),
        toCheckout() {
            this.setLocalStorage();
            this.$router.push({ name : 'checkout'})
        }
    },
    computed: {
        ...mapState(cartModule, ["cartItems"]),
        calTotalCart() {
            let total = 0;
            this.cartItems.forEach((item) => {
                total +=
                    item.qte * (item.prix_special ? item.prix_special : item.prix)
            });
            return total;
        },
    },
    mounted() {
        this.Emitter.on("openCart", () => {
            this.drawer = true;
        });

        this.getItemsCart();
    },
};
</script>

<style>
.items-card::-webkit-scrollbar {
    width: 5px;
}

.items-card::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: rgb(193, 193, 193);
}

.items-card::-webkit-scrollbar-track {
    width: 5px;
    background-color: rgb(227, 225, 226);
}

@media(max-width:600px) {
    .img_drawer {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .img_drawer img {
        width: 50% !important;
    }
}
</style>
