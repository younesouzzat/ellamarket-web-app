<template>
    <div class="menu-drawer">
        <v-navigation-drawer
            v-model="drawer_menu"
            location="left"
            temporary
            :width="windWidth <= 767 ? windWidth / 2 : 360"
        >
            <v-card elevation="0" class="px-2">
                <v-card-title
                    class="px-1 pt-5 d-flex justify-between align-center w-100"
                    style="font-size: 25px; font-weight: 500"
                >
                    Menu
                    <v-icon @click="drawer_menu = false">mdi-close</v-icon>
                </v-card-title>
                <v-list>
                    <v-list-item :to="{ name: 'home' }">
                        <v-list-item-title
                            class="d-flex justify-left align-center gap-2"
                        >
                            <v-icon>mdi-home</v-icon>
                            Accueil
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-group v-if="categories">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props">
                                <v-list-item-title
                                    class="d-flex justify-left align-center gap-2"
                                >
                                    <v-icon>mdi-tag-multiple</v-icon>
                                    Catégorie
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                        <v-list-item
                            v-for="item in categories"
                            :key="item.libelle"
                        >
                            <v-list-item-title>
                                <router-link
                                    :to="{
                                        name: 'products_category',
                                        params: {
                                            category: item.libelle
                                                .toLowerCase()
                                                .trim(),
                                            title: item.libelle,
                                        },
                                    }"
                                    >{{ item.libelle }}</router-link
                                >
                            </v-list-item-title>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item>
                        <v-list-item-title
                            class="d-flex justify-left align-center gap-2"
                        >
                            <v-icon>mdi-store</v-icon>
                            <router-link :to="{ name: 'products_all' }"
                                >Boutique</router-link
                            >
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title
                            class="d-flex justify-left align-center gap-2"
                        >
                            <v-icon>mdi-cart-percent</v-icon>
                            <router-link
                                :to="{
                                    name: 'products_promotion',
                                    params: {
                                        promotion: 'promotion',
                                    },
                                }"
                                >Promotion</router-link
                            >
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title
                            class="d-flex justify-left align-center gap-2"
                        >
                            <v-icon>mdi-information</v-icon>
                            A propos
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title
                            class="d-flex justify-left align-center gap-2"
                        >
                            <v-icon>mdi-face-agent</v-icon>
                            Contact
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { productsModule } from "../../store/products";
import { mapState } from "pinia";
export default {
    inject: ["Emitter"],
    props: {
        windWidth: {
            type: Number,
        },
        categories: {
            type: Array,
        },
    },
    data() {
        return {
            drawer_menu: false,
        };
    },
    computed: {
        ...mapState(productsModule, ["categories"]),
    },
    mounted() {
        this.Emitter.on("openMenu", () => {
            this.drawer_menu = true;
        });
    },
};
</script>
