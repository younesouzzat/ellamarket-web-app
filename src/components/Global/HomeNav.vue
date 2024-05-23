<template>
    <div class="nav-bar">
        <v-app-bar color="#112d72" class="py-3" height="fit-content" absolute>
            <v-container fluid>
                <v-row>
                    <v-col cols="3">
                        <img
                            src="@/assets/images/logo.png"
                            alt=""
                            @click="$router.push({ name: 'home' })"
                            style="cursor: pointer"
                        />
                    </v-col>
                    <v-col cols="5">
                        <input
                            autofocus
                            v-model="search"
                            type="text"
                            name="navSearch"
                            id="navSearch"
                            placeholder="Rechercher de produits ..."
                            class="w-[90%] py-3 px-5 bg-white"
                            style="border-radius: 10px; outline: none;"
                            @click="searchProducts"
                        />
                    </v-col>
                    <v-col cols="4">
                        <div
                            class="parent text-white d-flex justify-between align-center"
                        >
                            <div
                                class="available d-flex flex-column align-center"
                            >
                                <span>Support 24/7</span>
                                <br />
                                <v-icon class="mr-1">mdi-face-agent</v-icon>
                                <p>06-25-96-14-77</p>
                            </div>
                            <div
                                class="wishlist d-flex flex-column align-center"
                            >
                                <v-icon>mdi-heart</v-icon>
                                <span>Souhaits</span>
                            </div>
                            <router-link :to="{ name: 'login' }">
                                <div
                                    class="signin d-flex flex-column align-center"
                                >
                                    <v-icon>mdi-login</v-icon>
                                    <span>Connexion</span>
                                </div>
                            </router-link>
                            <div
                                class="cart d-flex flex-column align-center"
                                :style="`cursor: pointer; pointer-events: ${
                                    $route.name == 'panier' ? 'none' : 'unset'
                                }`"
                                @click="openCart"
                            >
                                <v-icon>mdi-cart</v-icon>
                                <v-badge
                                    location="right top"
                                    :content="cartItems.length"
                                    color="red"
                                    offsetX="1"
                                    offsetY="-25"
                                ></v-badge>
                                <span>Panier</span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <ul
                            class="links d-flex gap-5 font-weight-[500]"
                            style="
                                font-size: 18px;
                                list-style: none;
                                cursor: pointer;
                            "
                        >
                            <li>
                                <router-link :to="{ name: 'home' }"
                                    >Accueil</router-link
                                >
                            </li>
                            <li id="cat-link" v-if="categories">
                                Catégorie
                                <v-menu activator="#cat-link">
                                    <v-list>
                                        <v-list-item
                                            class="d-flex align-center"
                                        >
                                            <v-list-item-title
                                                v-for="item in categories"
                                                :key="item.libelle"
                                            >
                                                <router-link
                                                    class="mb-5 capitalize font-weight-bold"
                                                    :to="{
                                                        name: 'products_category',
                                                        params: {
                                                            category:
                                                                item.libelle
                                                                    .toLowerCase()
                                                                    .trim(),
                                                            title: item.libelle,
                                                        },
                                                    }"
                                                    >{{
                                                        item.libelle
                                                    }}</router-link
                                                >
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </li>
                            <li>
                                <router-link :to="{ name: 'products_all' }"
                                    >Boutique</router-link
                                >
                            </li>
                            <li>
                                <router-link
                                    :to="{
                                        name: 'products_promotion',
                                        params: {
                                            promotion: 'promotion',
                                        },
                                    }"
                                    >Promotion</router-link
                                >
                            </li>
                            <li>A propos</li>
                            <li>Contact</li>
                        </ul>
                    </v-col>
                    <v-col cols="2"></v-col>
                    <v-col cols="5"> </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
    </div>
</template>

<script>
import { productsModule } from "@/store/products.js";
import { cartModule } from "@/store/cart.js";
import { mapState } from "pinia";

export default {
    inject: ["Emitter"],
    data: () => ({
        search: ''
    }),
    props: {
        categories: {
            type: Array,
        },
    },
    methods: {
        openCart() {
            this.Emitter.emit("openCart");
        },
        async searchProducts() {
            await this.$router.push(`/produits/&query=${this.search}`);
        }
    },
    computed: {
        ...mapState(productsModule, ["categories"]),
        ...mapState(cartModule, ["cartItems"]),
    },
};
</script>
