<template>
    <div class="flex flex-wrap mt-36">
        <div class="w-full mb-12 px-4">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
            >
                <div class="rounded-t bg-white mb-0 px-6 py-6">
                    <div class="text-center flex justify-between">
                        <h6 class="text-blueGray-700 text-xl font-bold">
                            Modifier produit
                        </h6>
                    </div>
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div
                        class="p-4 md:p-5 space-y-4"
                        v-if="this.prodModule.errors.length"
                    >
                        <div
                            class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            <svg
                                class="flex-shrink-0 inline w-4 h-4 me-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                                />
                            </svg>
                            <div>
                                <ul>
                                    <li
                                        v-for="(item, index) in this.prodModule
                                            .errors"
                                        :key="index"
                                    >
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <form
                        @submit.prevent="updateProd"
                        enctype="multipart/form-data"
                    >
                        <h6
                            class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"
                        >
                            Détail
                        </h6>
                        <div class="flex flex-wrap">
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Titre *
                                    </label>
                                    <input
                                        type="text"
                                        v-model="titre"
                                        placeholder="Titre"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                    <span
                                        v-for="err in v$.$errors"
                                        :key="err.$uid"
                                    >
                                        <span
                                            class="text-red-500"
                                            v-if="err.$property == 'titre'"
                                        >
                                            Champ obligatoire *
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Sous titre *
                                    </label>
                                    <input
                                        type="text"
                                        v-model="sous_titre"
                                        placeholder="Sous titre"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                    <span
                                        v-for="err in v$.$errors"
                                        :key="err.$uid"
                                    >
                                        <span
                                            class="text-red-500"
                                            v-if="err.$property == 'sous_titre'"
                                        >
                                            Champ obligatoire *
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Prix *
                                    </label>
                                    <input
                                        type="text"
                                        v-model="prix"
                                        placeholder="Prix"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                    <span
                                        v-for="err in v$.$errors"
                                        :key="err.$uid"
                                    >
                                        <span
                                            class="text-red-500"
                                            v-if="err.$property == 'prix'"
                                        >
                                            {{ err.$message }}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Catégorie *
                                    </label>
                                    <select
                                        v-model="categorie_id"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    >
                                        <option value="">Choisissez</option>
                                        <option
                                            v-for="item in this.catModule
                                                .categories"
                                            :value="item.id"
                                            :key="item.id"
                                        >
                                            {{ item.libelle }}
                                        </option>
                                    </select>
                                    <span
                                        v-for="err in v$.$errors"
                                        :key="err.$uid"
                                    >
                                        <span
                                            class="text-red-500"
                                            v-if="
                                                err.$property == 'categorie_id'
                                            "
                                        >
                                            Champ obligatoire *
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Couverture
                                    </label>
                                    <input
                                        type="file"
                                        ref="couverture"
                                        accept="image/*"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Images
                                    </label>
                                    <input
                                        type="file"
                                        multiple="multiple"
                                        ref="images"
                                        accept="image/*"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>

                            <div class="w-full lg:w-12/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Description *
                                    </label>
                                    <textarea
                                        type="text"
                                        v-model="description"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        rows="4"
                                    ></textarea>
                                    <span
                                        v-for="err in v$.$errors"
                                        :key="err.$uid"
                                    >
                                        <span
                                            class="text-red-500"
                                            v-if="
                                                err.$property == 'description'
                                            "
                                        >
                                            Champ obligatoire *
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div class="w-full lg:w-4/12 px-4">
                                <label
                                    class="inline-flex items-center mb-5 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        value="0"
                                        v-model="statu"
                                        class="sr-only peer"
                                    />
                                    <div
                                        class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                                    ></div>
                                    <span
                                        class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >Statu de produit</span
                                    >
                                </label>
                            </div>
                        </div>

                        <div class="flex flex-wrap justify-end items-end">
                            <router-link
                            :to="{ name: 'products'}"
                            class="px-4 mr-1 py-3 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                            Retour
                            </router-link>
                            <button
                                type="submit"
                                :disabled="this.prodModule.isLoading"
                                class="px-4 py-3 text-xs font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                <svg
                                    v-if="this.prodModule.isLoading"
                                    aria-hidden="true"
                                    role="status"
                                    class="inline w-4 h-4 me-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Modifier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "vue3-toastify/dist/index.css";
import { toast } from "vue3-toastify";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, numeric, integer } from "@vuelidate/validators";

export default {
    data() {
        return {
            form: {},
            id: "",
            prix: "",
            titre: "",
            statu: false,
            images: [],
            couverture: "",
            sous_titre: "",
            description: "",
            categorie_id: "",
        };
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    validations() {
        return {
            titre: { required },
            prix: { required, numeric },
            categorie_id: { required },
            sous_titre: { required },
            description: { required },
        };
    },
    computed: {
        ...mapState(["catModule", "prodModule"]),
    },
    mounted() {
        this.loadCat();
        this.id = this.$route.params.id;
        this.getProd(this.id);
    },
    methods: {
        ...mapActions(["getCatAllAct", "getOneProdAct", "updateProdAct"]),

        clearInputs() {
            this.prix = "";
            this.titre = "";
            this.statu = false;
            this.sous_titre = "";
            this.description = "";
            this.categorie_id = "";
            this.$refs.couverture.value = null;
            this.$refs.images.value = null;
        },

        loadCat() {
            this.$store.dispatch("getCatAllAct");
        },

        async getProd(id) {
            await this.$store.dispatch("getOneProdAct", id);
            let data = this.prodModule.product;
            this.id = data.id;
            this.prix = data.prix;
            this.titre = data.titre;
            this.statu = data.statut == 1 ? "true" : "false";
            this.sous_titre = data.sous_titre;
            this.description = data.description;
            this.categorie_id = data.category;
            this.$refs.couverture.value = null;
            this.$refs.images.value = null;
        },

        async updateProd() {
            const result = await this.v$.$validate();

            if (result) {
                const formData = new FormData();
                formData.append("id", this.id);
                formData.append("prix", this.prix);
                formData.append("statu", this.statu);
                formData.append("titre", this.titre);
                formData.append("sous_titre", this.sous_titre);
                formData.append("categorie_id", this.categorie_id);
                formData.append("description", this.description);
                formData.append("couverture", this.$refs.couverture.files[0]);

                for (var i = 0; i < this.$refs.images.files.length; i++) {
                    let file = this.$refs.images.files[i];
                    formData.append("images[" + i + "]", file);
                }
                await this.updateProdAct(formData);

                if (this.prodModule.status) {
                    toast.success(this.prodModule.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            }
        },

        
    },
};
</script>
