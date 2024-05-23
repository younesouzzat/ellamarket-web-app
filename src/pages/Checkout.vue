<template>
    <HomeLayout>
        <div class="checkout-page">
            <v-container fluid class="m-0 pt-10">
                <v-row>
                    <v-col cols="12" md="7" class="order-1 order-md-0">
                        <v-card
                            class="checkout-form w-100"
                            color="white"
                            elevation="0"
                        >
                            <v-card-title class="font-weight-bold">
                                Ella Market
                            </v-card-title>
                            <v-breadcrumbs
                                :items="['Accueil', 'Checkout']"
                                style="font-size: 13px"
                            >
                                <template v-slot:divider>
                                    <v-icon color="#878484"
                                        >mdi-chevron-right</v-icon
                                    >
                                </template>
                            </v-breadcrumbs>
                            <v-card-title class="font-weight-bold"
                                >Adresse livraison</v-card-title
                            >
                            <select
                                v-model="ville"
                                id=""
                                class="w-100 p-3"
                                style="
                                    border: 1px solid rgb(184, 184, 184);
                                    border-radius: 3px;
                                    font-size: 14px;
                                "
                            >
                                <option
                                    v-for="ville in villes"
                                    :key="ville"
                                    :value="ville"
                                >
                                    {{ ville }}
                                </option>
                            </select>

                            <span v-for="err in v$.$errors" :key="err.$uid">
                                <span
                                    class="text-red-500"
                                    v-if="err.$property == 'ville'"
                                >
                                    Champ obligatoire *
                                </span>
                            </span>

                            <div
                                class="user_name d-flex align-center justify-center"
                                style="gap: 10px"
                            >
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <input
                                            placeholder="Nom complet"
                                            v-model="nom_complet"
                                            type="text"
                                            class="p-3 mt-4"
                                            style="
                                                border: 1px solid
                                                    rgb(184, 184, 184);
                                                border-radius: 3px;
                                                font-size: 14px;
                                                width: 100%;
                                            "
                                        />
                                        <span
                                            v-for="err in v$.$errors"
                                            :key="err.$uid"
                                        >
                                            <span
                                                class="text-red-500"
                                                v-if="
                                                    err.$property ==
                                                    'nom_complet'
                                                "
                                            >
                                                Champ obligatoire *
                                            </span>
                                        </span>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <input
                                            placeholder="Telephone"
                                            v-model="telephone"
                                            type="text"
                                            class="p-3 mt-4"
                                            style="
                                                border: 1px solid
                                                    rgb(184, 184, 184);
                                                border-radius: 3px;
                                                font-size: 14px;
                                                width: 100%;
                                            "
                                        />

                                        <span
                                            v-for="err in v$.$errors"
                                            :key="err.$uid"
                                        >
                                            <span
                                                class="text-red-500"
                                                v-if="
                                                    err.$property == 'telephone'
                                                "
                                            >
                                                Champ obligatoire *
                                            </span>
                                        </span>
                                    </v-col>
                                </v-row>
                            </div>
                            <div
                                class="user_name d-flex align-center justify-center"
                                style="gap: 10px"
                            >
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <textarea
                                        placeholder="Adresse"
                                        v-model="adresse"
                                        type="text"
                                        class="p-3 mt-4"
                                        style="
                                            border: 1px solid rgb(184, 184, 184);
                                            border-radius: 3px;
                                            font-size: 14px;
                                            width: 100%;
                                        "
                                    ></textarea>
                                    <span v-for="err in v$.$errors" :key="err.$uid">
                                        <span
                                            class="text-red-500"
                                            v-if="err.$property == 'adresse'"
                                        >
                                            Champ obligatoire *
                                        </span>
                                    </span>
                                </v-col>
                            </v-row>
                            </div>
                            <v-card-actions class="justify-end my-7">
                                <v-btn
                                    variant="elevated"
                                    color="blue"
                                    height="45"
                                    width="150"
                                    @click="saveFunOrder"
                                    :loading="loading"
                                    >Enregistrer</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-card
                            color="grey-lighten-3"
                            elevation="0"
                            width="100%"
                            height="100%"
                        >
                            <v-card
                                color="transparent"
                                elevation="0"
                                v-for="item in cartItems"
                                :key="item.id"
                                width="100%"
                                class="d-flex align-center justify-between mb-2"
                            >
                                <v-badge
                                    :content="item.qte"
                                    class="pt-5"
                                    color="grey-darken-1"
                                >
                                    <div
                                        class="ml-1 mt-1 d-flex justify-center align-center overflow-hidden w-[100px] h-[100px] bg-white"
                                    >
                                        <img
                                            class="px-1"
                                            style="border-radius: 7px"
                                            :src="`${STORAGE_URL}/products/${item.couverture}`"
                                            alt=""
                                            width="80%"
                                            height="80%"
                                        />
                                    </div>
                                </v-badge>
                                <div class="title-parent flex-grow-1">
                                    <v-card-title
                                        style="
                                            font-size: 14px;
                                            font-weight: 700;
                                            color: #3c3c3c;
                                            white-space: pre-wrap;
                                        "
                                        >{{
                                            item.titre.substring(0, 57) + " ..."
                                        }}</v-card-title
                                    >
                                    <v-card-text
                                        style="font-size: 13px; color: #3c3c3c"
                                        >{{
                                            item.categorie
                                                ? item.categorie.libelle
                                                : "-"
                                        }}</v-card-text
                                    >
                                </div>
                                <v-card-text class="flex-grow-0">
                                    {{
                                        item.qte *
                                        (item.prix_special
                                            ? item.prix_special
                                            : item.prix)
                                    }}
                                    MAD
                                </v-card-text>
                            </v-card>
                            <v-divider
                                :thickness="5"
                                class="border-opacity-100"
                                color="info"
                            ></v-divider>
                            <v-card-text
                                class="d-flex align-center justify-between font-weight-bold"
                            >
                                <span>Total</span>
                                <span>{{ calTotalCart }} MAD</span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <OrderSuccess
                :popup="dialog"
                v-if="dialog"
                @close_popup="dialog = false"
            />
        </div>
    </HomeLayout>
</template>

<script>
import HomeLayout from "@/layout/HomeLayout.vue";
import OrderSuccess from "@/components/order_success/OrderSuccess.vue";
import { cartModule } from "@/store/cart.js";
import { checkoutModule } from "@/store/checkout.js";
import { mapState, mapActions } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
    computed: {
        ...mapState(cartModule, ["cartItems"]),
        ...mapState(checkoutModule, ["success"]),
        calTotalCart() {
            let total = 0;
            this.cartItems.forEach((item) => {
                total +=
                    item.qte *
                    (item.prix_special ? item.prix_special : item.prix);
            });
            return total;
        },
    },
    setup() {
        return { v$: useVuelidate() };
    },
    validations() {
        return {
            nom_complet: { required },
            telephone: { required },
            ville: { required },
            adresse: { required },
        };
    },
    methods: {
        ...mapActions(cartModule, ["deleteItem"]),
        ...mapActions(checkoutModule, ["saveOrder"]),

        async saveFunOrder() {
            const result = await this.v$.$validate();

            if (result) {
                const formData = new FormData();
                formData.append("ville", this.ville);
                formData.append("adresse", this.adresse);
                formData.append("telephone", this.telephone);
                formData.append("nom_complet", this.nom_complet);
                this.loading = true;
                await this.saveOrder(formData);
                this.loading = false;

                if(this.success) {
                    this.dialog = true;
                }
            }
        },
    },
    data: () => ({
        qte: 1,
        loading: false,
        dialog: false,
        villes: ["Casablanca", "Rabat", "Marrakech", "Agadir"],
        telephone: "",
        ville: "",
        adresse: "",
        nom_complet: "",
        STORAGE_URL: import.meta.env.VITE_API_BASE_STORAGE,
    }),
    components: {
        HomeLayout,
        OrderSuccess,
    },
};
</script>
