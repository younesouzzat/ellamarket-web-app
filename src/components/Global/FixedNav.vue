<template>
    <div class="fixed-nav">
        <v-app-bar color="#112d72">
            <v-container fluid>
                <v-row>
                    <v-col cols="2">
                        <img src="@/assets/images/logo.png" alt="" />
                    </v-col>
                    <v-col cols="7">
                        <ul
                            class="links d-flex justify-center gap-5 ffont-weight-[500]"
                            style="font-size:18px ;list-style: none; cursor: pointer"
                        >
                            <li>
                                <router-link :to="{ name: 'home' }"
                                    >Accueil</router-link
                                >
                            </li>
                            <li id="cat-link-fixed" v-if="categories.length">
                                Catégorie
                                <v-menu activator="#cat-link-fixed">
                                    <v-list>
                                        <v-list-item
                                            class="d-flex align-center"
                                        >
                                            <v-list-item-title
                                                v-for="item in categories"
                                                :key="item.title"
                                            >
                                                <router-link class="mb-5 capitalize font-weight-bold"
                                                    :to="{
                                                        name: 'products_category',
                                                        params: {
                                                            category:
                                                                item.libelle.toLowerCase().trim(),
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
                    <v-col cols="3" class="">
                        <div
                            style="gap: 20px"
                            class="parent text-white d-flex justify-end align-center"
                        >   
                        <router-link :to="{ name: 'login'}">
                            <div class="signin d-flex flex-column align-center">
                                <v-icon>mdi-login</v-icon>
                            </div>
                        </router-link>
                            <div
                                class="cart d-flex flex-column align-center"
                                :style="`cursor: pointer; pointer-events: ${$route.name == 'panier' ? 'none' : 'unset'}`"
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
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
    </div>
</template>

<script>
import { productsModule } from "../../store/products";
import { cartModule } from "@/store/cart.js";
import { mapState } from 'pinia';

export default {
    inject: ["Emitter"],
    methods: {
        openCart() {
            this.Emitter.emit("openCart");
        },
    },
    computed: {
        ...mapState(productsModule, ["categories"]),
        ...mapState(cartModule, ["cartItems"]),
    }
};
</script>
