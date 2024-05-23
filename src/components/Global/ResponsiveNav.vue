<template>
    <div class="res-nav">
        <v-app-bar>
            <v-container>
                <v-row>
                    <v-col cols="4" class="d-flex justify-start align-center">
                        <v-app-bar-nav-icon @click="openMenu"></v-app-bar-nav-icon>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-center align-center">
                        <img
                            src="@/assets/images/footer-logo.webp"
                            alt=""
                            @click="$router.push({ name: 'home' })"
                            style="cursor: pointer"
                        />
                    </v-col>
                    <v-col cols="4" class="d-flex justify-end align-center">
                        <v-icon @click="$router.push({ name: 'login' })" size="x-large" class="mr-2">mdi-account-circle</v-icon>
                        <v-badge :content="cartItems.length">
                            <v-icon @click="openCart" size="x-large">mdi-shopping-outline</v-icon>
                        </v-badge>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
    </div>
</template>

<script>
import { productsModule } from "../../store/products";
import { cartModule } from "@/store/cart.js";
import { mapState } from "pinia";

export default {
    inject: ["Emitter"],
    methods: {
        openCart() {
            this.Emitter.emit("openCart");
        },
        openMenu() {
            this.Emitter.emit("openMenu");
        },
    },
    computed: {
        ...mapState(productsModule, ["categories"]),
        ...mapState(cartModule, ["cartItems"]),
    },
};
</script>
