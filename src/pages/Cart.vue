<template>
    <HomeLayout>
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <v-breadcrumbs
                        :items="['Accueil', 'Panier']"
                        style="font-size: 15px"
                    >
                        <template v-slot:divider>
                            <v-icon color="#878484">mdi-chevron-right</v-icon>
                        </template>
                    </v-breadcrumbs>
                </v-col>
            </v-row>
            <v-row v-if="cartItems.length">
                <v-col cols="8">
                    <v-table class="w-100">
                        <thead>
                            <tr>
                                <th style="font-size: 18; font-weight: bold">
                                    Produit
                                </th>
                                <th
                                    class="text-center"
                                    style="font-size: 18; font-weight: bold"
                                >
                                    Prix unitaire
                                </th>
                                <th
                                    class="text-center"
                                    style="font-size: 18; font-weight: bold"
                                >
                                    QUANTITÉ
                                </th>
                                <th
                                    class="text-center"
                                    style="font-size: 18; font-weight: bold"
                                >
                                    LIGNE TOTALE
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cartItems" :key="item.id">
                                <td style="width: 55%">
                                    <v-row class="align-center mb-4">
                                        <v-col cols="4">
                                            <div class="w-[100px] h-[100px] overflow-hidden d-flex justify-center align-center">
                                                <img
                                                    :src="`${STORAGE_URL}/products/${item.couverture}`"
                                                    class="w-50 py-5"
                                                    alt=""
                                                />
                                            </div>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-card-title
                                                class="px-0"
                                                style="
                                                    white-space: pre-wrap;
                                                    font-size: 14px;
                                                    line-height: 1.2;
                                                "
                                            >
                                                {{ item.titre }}
                                            </v-card-title>
                                            <v-card-subtitle class="px-0">
                                                Catégorie : {{ item.categorie ? item.categorie.libelle : '' }}
                                            </v-card-subtitle>
                                        </v-col>
                                    </v-row>
                                </td>
                                <td class="text-center" style="width: 15%">
                                    <v-card-text class="px-0">
                                        {{ item.prix }}
                                        MAD
                                    </v-card-text>
                                </td>
                                <td class="text-center" style="width: 15%">
                                    <v-card-text class="px-0 pt-0">
                                        <div
                                            class="d-flex justify-between align-center"
                                        >
                                            <div
                                                class="counter px-1"
                                                style="
                                                    border-radius: 30px;
                                                    border: 1px solid black;
                                                    width: 110px;
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
                                                <v-icon
                                                    size="18"
                                                    @click="item.qte++"
                                                    >mdi-plus</v-icon
                                                >
                                            </div>
                                        </div>
                                    </v-card-text>
                                </td>
                                <td
                                    class="text-center"
                                    style="width: 15%; font-weight: bold"
                                >
                                    {{
                                        item.qte * item.prix
                                    }}
                                    MAD
                                </td>
                                <td>
                                    <v-icon
                                        style="cursor: pointer"
                                        @click="deleteItem(item.id)"
                                        >mdi-close</v-icon
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
                <v-col cols="4">
                    <v-card>
                        <v-card-title
                            style="font-size: 14px; font-weight: bold"
                        >
                            Détail commande
                        </v-card-title>
                        <v-divider length="100%" color="black"></v-divider>
                        <v-divider length="100%" color="black"></v-divider>
                        <v-divider length="100%" color="black"></v-divider>
                        <v-divider length="100%" color="black"></v-divider>
                        <v-card-text
                            class="d-flex align-center justify-between"
                        >
                            <span>Sous-total</span>
                            <span class="font-bold" style="font-size: 15px"
                                >{{ calTotalCart }} MAD</span
                            >
                        </v-card-text>
                        <v-card-text
                            style="font-size: 15px; font-weight: bold"
                            class="d-flex align-center justify-between"
                        >
                            <span>Total</span>
                            <span>{{ calTotalCart }} MAD</span>
                        </v-card-text>
                        <v-divider length="100%" color="black"></v-divider>
                        <v-card-actions
                            class="flex-column justify-center align-center"
                            style="gap: 5px"
                        >
                            <v-btn
                                class="w-100 px-0"
                                style="
                                    text-transform: none;
                                    border-radius: 30px;
                                "
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
                                style="
                                    text-transform: none;
                                    border-radius: 30px;
                                "
                                density="compact"
                                variant="outlined"
                                height="45"
                                @click="$router.push({ name: 'home' })"
                            >
                                Continuer l'achat
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12">
                    <v-card
                        elevation="0"
                        color="transparent"
                        class="text-center"
                    >
                        <v-card-title>
                            <v-icon style="font-size: 150px"
                                >mdi-store-outline</v-icon
                            >
                        </v-card-title>
                        <v-card-text>
                            <h1 style="font-size: 30px; font-weight: bold">
                                Votre panier est vide
                            </h1>
                            <h3 style="font-size: 15px;" class="pt-2 text-gray-600">
                                On dirait que vous n'avez pas encore fait de
                                choix.
                            </h3>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </HomeLayout>
</template>

<script>
import HomeLayout from "@/layout/HomeLayout.vue";
import { cartModule } from "@/store/cart.js";
import { mapState, mapActions } from "pinia";

export default {
    computed: {
        ...mapState(cartModule, ["cartItems"]),
        calTotalCart() {
            let total = 0;
            this.cartItems.forEach((item) => {
                total += item.qte * item.prix
            });
            return total;
        },
    },
    methods: {
        ...mapActions(cartModule, ["deleteItem","setLocalStorage"]),
        toCheckout() {
            this.setLocalStorage();
            this.$router.push({ name : 'checkout'})
        }
    },
    data: () => ({
        qte: 1,
        loading: false,
        STORAGE_URL: import.meta.env.VITE_API_BASE_STORAGE,
    }),
    components: {
        HomeLayout,
    },
};
</script>
