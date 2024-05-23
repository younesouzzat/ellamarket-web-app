<template>
    <div class="flex flex-wrap mt-36">
        <div class="w-full mb-12 px-4">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
            >
                <div class="rounded-t bg-white mb-0 px-6 py-6 mb-6">
                    <div class="text-center flex justify-between">
                        <h6 class="text-blueGray-700 text-xl font-bold">
                            Détail de commande
                        </h6>
                    </div>
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0 bg-white">
                    <form @submit.prevent="updateFunEtatOrder">
                        <div class="flex flex-wrap mt-5">
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-md font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Numéro : #{{ this.numero }}
                                    </label>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-md font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Date de commande : {{ this.date }}
                                    </label>
                                </div>
                            </div>

                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-md font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Détail client
                                    </label>
                                    <ul class="text-sm font-bold mt-2">
                                        <li>Nom: {{ this.client }}</li>
                                        <li>Ville: {{ this.ville }}</li>
                                        <li>Adresse: {{ this.adresse }}</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="w-full lg:w-4/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Statu *
                                    </label>
                                    <select
                                        v-model="etat"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    >
                                        <option value="0">Traitement</option>
                                        <option value="1">Livré</option>
                                    </select>
                                </div>
                            </div>

                            <div
                                class="block w-full overflow-x-auto lg:w-12/12 px-4"
                            >
                                <div class="relative w-full mt-6 mb-3">
                                    <table
                                        class="items-center w-full bg-transparent border-collapse w-100"
                                    >
                                        <thead>
                                            <th
                                                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                                            >
                                                Produits
                                            </th>
                                            <th
                                                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                                            >
                                                Prix unitaire
                                            </th>
                                            <th
                                                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                                            >
                                                Qté
                                            </th>
                                            <th
                                                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                                            >
                                                Sous-total
                                            </th>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="item in this.products"
                                                :key="item.id"
                                            >
                                                <td
                                                    class="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
                                                >
                                                    {{
                                                        item.titre.substring(
                                                            0,
                                                            57
                                                        ) + " ..."
                                                    }}
                                                </td>
                                                <td
                                                    class="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
                                                >
                                                    {{ item.prix_unit }} MAD
                                                </td>
                                                <td
                                                    class="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
                                                >
                                                    {{ item.qte }}
                                                </td>
                                                <td
                                                    class="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
                                                >
                                                    {{
                                                        item.prix_unit *
                                                        item.qte
                                                    }}
                                                    MAD
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td
                                                    colspan="3"
                                                    class="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-right"
                                                >
                                                    Total
                                                </td>
                                                <td
                                                    class="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4"
                                                >
                                                    {{ this.montant }} MAD
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-wrap justify-end items-end">
                            <router-link
                                :to="{ name: 'orders' }"
                                class="px-4 mr-1 py-3 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Retour
                            </router-link>
                            <button
                                type="submit"
                                :disabled="this.orderModule.isLoading"
                                class="px-4 py-3 text-xs font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                            <svg
                                    v-if="this.orderModule.isLoading"
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
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { toast } from "vue3-toastify";
import { mapState, mapActions } from "vuex";

export default {
    data: () => ({
        date: "",
        ville: "",
        numero: "",
        client: "",
        adresse: "",
        montant: "",
        order_id: "",
        products: [],
    }),
    computed: {
        ...mapState(["orderModule"]),
    },
    mounted() {
        this.order_id = this.$route.params.id;
        this.getFunOrder(this.order_id);
    },
    methods: {
        ...mapActions[("getOneOrder", "updateEtatOrder")],
        async getFunOrder(id) {
            await this.$store.dispatch("getOneOrder", id);
            let orderData = this.orderModule.order;
            let detailsData = this.orderModule.details;
            this.date = orderData.date;
            this.etat = orderData.etat;
            this.ville = orderData.ville;
            this.numero = orderData.numero;
            this.client = orderData.nom;
            this.adresse = orderData.adresse;
            this.montant = orderData.montant;
            this.products = detailsData;
        },

        async updateFunEtatOrder() {
            const formData = new FormData();
            formData.append("id", this.order_id);
            formData.append("etat", this.etat);
            await this.$store.dispatch("updateEtatOrder", formData);

            if (this.orderModule.status) {
                toast.success(this.orderModule.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        },
    },
};
</script>
