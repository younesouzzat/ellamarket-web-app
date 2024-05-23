<template>
    <HomeLayout>
        <div class="products-category pt-20 bg-[#f5f6f7]">
            <h1 class="px-10 text-left text-3xl font-bold capitalize">
                {{ category ? category : "Boutique" }}
            </h1>

            <v-container fluid class="px-20">
                <v-row>
                    <v-col cols="12" md="3" class="w-100 px-10">
                        <v-card class="px-5 pt-5">
                            <v-card-title> Filtrer par prix</v-card-title>
                            <hr />
                            <v-card-body>
                                <div
                                    class="d-flex justify-center align-center gap-1"
                                >
                                    <input
                                        placeholder="Min"
                                        v-model="min_prix"
                                        type="text"
                                        class="p-3 mt-4"
                                        style="
                                            border: 1px solid rgb(184, 184, 184);
                                            border-radius: 3px;
                                            font-size: 14px;
                                            width: 50%;
                                        "
                                    />
                                    <input
                                        placeholder="Max"
                                        v-model="max_prix"
                                        type="text"
                                        class="p-3 mt-4"
                                        style="
                                            border: 1px solid rgb(184, 184, 184);
                                            border-radius: 3px;
                                            font-size: 14px;
                                            width: 50%;
                                        "
                                    />
                                </div>
                            </v-card-body>
                            <v-card-actions>
                                <v-btn
                                    variant="elevated"
                                    color="#e8e8e8"
                                    height="45"
                                    width="100%"
                                    class="text-center text-[#424952]"
                                    @click="filterData"
                                >
                                    <v-icon>mdi-magnify</v-icon>
                                    Recherche
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-card class="px-5 pt-5 mt-5">
                            <v-card-title>
                                Filtrer par catégories
                            </v-card-title>
                            <hr />
                            <v-card-body>
                                <div
                                    class="px-0 d-flex justify-start align-center gap-1"
                                >
                                    <v-list>
                                        <v-list-item
                                            class="py-0"
                                            v-for="item in categories"
                                            :key="item.id"
                                        >
                                            <v-checkbox
                                                class="py-0"
                                                v-model="category"
                                                :label="item.libelle"
                                                :value="
                                                    item.libelle
                                                        .toLowerCase()
                                                        .trim()
                                                "
                                                @change="filterData"
                                            ></v-checkbox>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card-body>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="9" class="px-10">
                        <paginateProd
                            :page="page"
                            :loading="loading"
                            :productsData="productsCategory.data"
                            :showItem="showItem"
                        />
                        <div
                            class="mt-2"
                            v-if="
                                productsCategory.data &&
                                productsCategory.data.length != 0
                            "
                        >
                            <v-pagination
                                v-model="page"
                                :total-visible="4"
                                :length="productsCategory.last_page"
                                rounded="circle"
                                @click="filterData"
                            ></v-pagination>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </HomeLayout>
</template>

<script>
import paginateProd from "@/components/ProdPage/paginateProd.vue";
import HomeLayout from "@/layout/HomeLayout.vue";
import { productsModule } from "@/store/products";
import { mapState, mapActions } from "pinia";

export default {
    data: () => ({
        page: 1,
        loading: false,
        showItem: {},
        category: "",
        min_prix: "",
        max_prix: "",
        promotion: "",
    }),
    props: {
        products: {
            type: Array,
        },
    },
    inject: ["Emitter"],
    components: {
        HomeLayout,
        paginateProd,
    },
    methods: {
        openQuickView(product) {
            this.Emitter.emit("openQuickView", product);
        },
        ...mapActions(productsModule, [
            "getAllProducts",
            "getFilterProducts",
            "getProductsByCategory",
        ]),

        async filterData() {
            this.loading = true;
            await this.getFilterProducts(
                this.page,
                this.category,
                this.min_prix,
                this.max_prix,
                this.promotion
            );
            this.loading = false;
        },
    },
    computed: {
        ...mapState(productsModule, ["categories", "productsCategory"]),
        initPage() {
            this.page = this.productsCategory.current_page;
        },
    },
    watch: {
        async $route() {
            this.loading = true;

            if (this.$route.params.category) {
                this.category = this.$route.params.category;
                document.title = `Produits | ${this.$route.params.category}`;
            }

            if (this.$route.params.promotion) {
                this.promotion = 1;
                document.title = `Produits | ${this.$route.params.promotion}`;
            } else {
                this.promotion = 0;
            }

            await this.getFilterProducts(
                this.page,
                this.category,
                this.min_prix,
                this.max_prix,
                this.promotion
            );
            this.loading = false;
        },
    },
    async mounted() {
        this.loading = true;

        if (this.$route.params.category) {
            this.category = this.$route.params.category;
            document.title = `Produits | ${this.$route.params.category}`;
        }

        if (this.$route.params.promotion) {
            this.promotion = 1;
            document.title = `Produits | ${this.$route.params.promotion}`;
        } else {
            this.promotion = 0;
        }

        await this.getFilterProducts(
            this.page,
            this.category,
            this.min_prix,
            this.max_prix,
            this.promotion
        );
        this.loading = false;
    },
};
</script>

<style>
.v-input__details {
    display: none !important;
}
</style>
