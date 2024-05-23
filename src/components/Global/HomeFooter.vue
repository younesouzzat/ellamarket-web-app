<template>
    <div class="home-footer">
        <v-footer :app="true" color="grey-lighten-4" absolute>
            <v-container fluid class="px-0">
                <v-row>
                    <v-col cols="12" sm="6" md="4" lg="3">
                        <v-card elevation="0" color="transparent">
                            <v-card-title
                                class="pb-3 px-0"
                                style="font-size: 25px; font-weight: 500"
                            >
                                Boutique
                            </v-card-title>
                            <v-card-text
                                v-for="item in categories"
                                :key="item.id"
                                class="pt-0 pb-3 px-0 text-gray-700"
                            >
                                <router-link
                                    class="mb-5 capitalize font-weight-[500]"
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
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" lg="3">
                        <v-card elevation="0" color="transparent">
                            <v-card-title
                                class="pb-3 px-0"
                                style="font-size: 25px; font-weight: 500"
                            >
                                Liens rapide
                            </v-card-title>
                            <v-card-text class="pt-0 pb-3 px-0 text-gray-700"
                                >
                                <router-link :to="{ name: 'home' }">
                                    Accueil
                                </router-link>
                            </v-card-text>
                            <v-card-text class="pt-0 pb-3 px-0 text-gray-700"
                                ><router-link :to="{ name: 'products_all' }"
                                    >Boutique</router-link
                                ></v-card-text
                            >
                            <v-card-text class="pt-0 pb-3 px-0 text-gray-700"
                                ><router-link
                                    :to="{
                                        name: 'products_promotion',
                                        params: {
                                            promotion: 'promotion',
                                        },
                                    }"
                                    >Promotion</router-link
                                ></v-card-text
                            >
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" lg="3">
                        <v-card elevation="0" color="transparent">
                            <v-card-title
                                class="pb-3 px-0"
                                style="font-size: 25px; font-weight: 500"
                            >
                                Liens rapide
                            </v-card-title>
                            <v-card-text class="pt-0 pb-3 px-0 text-gray-700"
                                >
                                <router-link :to="{ name: 'home' }">
                                    Accueil
                                </router-link>
                            </v-card-text>
                            <v-card-text class="pt-0 pb-3 px-0 text-gray-700"
                                ><router-link :to="{ name: 'products_all' }"
                                    >Boutique</router-link
                                ></v-card-text
                            >
                            <v-card-text class="pt-0 pb-3 px-0 text-gray-700"
                                ><router-link
                                    :to="{
                                        name: 'products_promotion',
                                        params: {
                                            promotion: 'promotion',
                                        },
                                    }"
                                    >Promotion</router-link
                                ></v-card-text
                            >
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" lg="3">
                        <v-card elevation="0" color="transparent">
                            <v-card-title class="pb-3 px-0">
                                <img
                                    src="@/assets/images/footer-logo.webp"
                                    alt=""
                                    @click="$router.push({ name: 'home' })"
                                    style="cursor: pointer"
                                />
                            </v-card-title>
                            <v-card-text class="pt-0 pb-3 px-0">
                                <span class="d-flex align-start">
                                    <v-icon class="mr-2">
                                        mdi-map-marker
                                    </v-icon>
                                    <p class="text-gray-700">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit
                                    </p>
                                </span>
                            </v-card-text>
                            <v-card-text class="pt-0 pb-3 px-0">
                                <span class="d-flex align-start">
                                    <v-icon class="mr-2"> mdi-phone </v-icon>
                                    <p class="text-gray-700">
                                        (+212) 6 021 236 98
                                    </p>
                                </span>
                            </v-card-text>
                            <v-card-text class="pt-0 pb-3 px-0">
                                <span class="d-flex align-start">
                                    <v-icon class="mr-2"> mdi-email </v-icon>
                                    <p class="text-gray-700">
                                        contact@mail.com
                                    </p>
                                </span>
                            </v-card-text>
                            <div class="social-media d-flex align-center gap-4">
                                <span class="text-xl">
                                    <v-icon> mdi-facebook </v-icon>
                                </span>
                                <span class="text-xl">
                                    <v-icon> mdi-instagram </v-icon>
                                </span>
                                <span class="text-xl">
                                    <v-icon> mdi-twitter </v-icon>
                                </span>
                                <span class="text-xl">
                                    <v-icon> mdi-youtube </v-icon>
                                </span>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <hr />
                        <p class="text-center pt-3 pb-1">
                            &copy; {{ new Date().getFullYear() }}
                            Tous les droits réservés ellamart
                        </p>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
    </div>
</template>

<script>
export default {
    props: {
        categories: {
            type: Array,
        },
    },
};
</script>
