<template>
    <HomeLayout>
      <div class="product-details bg-white py-20">
        <v-container fluid fill-height>
            <v-row>
                <v-col cols="12">
                    <div
                        class="flex justify-center items-center min-h-full w-full min-w-full"
                    >
                        <div class="flex">
                            <div
                                class="text-indigo-600 self-start text-5xl px-8 font-bold border-r pb-8 leading-10"
                            >
                                404
                            </div>
                            <div class="px-8">
                                <h1 class="text-5xl font-bold mb-2">
                                    Page non trouvée
                                </h1>
                                <p class="text-gray-400 mb-10">
                                    Veuillez vérifier l'URL dans la barre
                                    d'adresse et réessayer
                                </p>
                                <div>
                                    <router-link
                                        :to="{ name: 'dashboard' }"
                                        class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Retour à l'accueil
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
      </div>
    </HomeLayout>
</template>

<script>
import HomeLayout from "@/layout/HomeLayout.vue";

export default {
    components: {
        HomeLayout,
    },
};
</script>
