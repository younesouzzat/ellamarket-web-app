<template>
    <div class="flex flex-wrap mt-36">
      <div class="w-full mb-12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        >
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full flex flex-row justify-between px-4 max-w-full flex-grow flex-1">
                <h3
                  class="font-semibold text-lg"
                >
                  List des produits
                </h3>
                <router-link :to="{ 'name' : 'create.products' }"
                    class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    <i class="fas fa-plus-circle mr-1"></i>
                    Ajouter nouveau produit
                </router-link>
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <!-- Projects table -->
            <table class="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 
                    border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Image
                  </th>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Catégorie
                  </th>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Prix
                  </th>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Statu
                  </th>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody v-if="this.prodModule.isLoading">
                <tr>
                  <td colspan="6" class="text-center p-1">
                        Chargement ....
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr v-if="!this.prodModule.products">
                  <td colspan="6" class="text-center p-1">
                    Aucun résultat trouvé
                  </td>
                </tr>
                <tr v-else v-for="item in this.prodModule.products" :key="item.id">
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                  >
                    <img
                      :src="`${STORAGE_URL}/products/`+item.couverture"
                      class="h-12 w-12 bg-white rounded-full border"
                      :alt="item.titre"
                    />
                    <span
                      class="ml-3 font-bold text-blueGray-600"
                    >
                      {{ item.titre.substring(0, 57)+' ...' }}
                    </span>
                  </th>
                  <td
                    class="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                      {{ item.categorie.libelle }}
                  </td>
                  <td
                    class="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                      {{ item.prix }} MAD
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <i v-if="item.statut == 1" class="fas fa-circle text-green-500 mr-2"></i>
                    <i v-else class="fas fa-circle text-red-500 mr-2"></i>
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                  >
                  <button
                      title="Modifier"
                      class="w-10 m-1 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      @click="onShow(item.id)"
                  >
                      <i class="fas fa-edit"></i>
                </button>

                  <button
                      title="Supprimer"
                      class="w-10 m-1 justify-center items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      @click="deleteProd(item.id)"
                  >
                      <i class="fas fa-trash"></i>
                  </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="p-1 float-right">
              <fwb-pagination
                  v-model="currentPage"
                  :total-items="this.prodModule.pagination.total"
                  :per-page="this.prodModule.pagination.per_page"
                  :current="this.prodModule.pagination.current_page"
                  @click="loadProd"
              ></fwb-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import { ref } from "vue";
import { useRouter } from "vue-router";
import { FwbPagination } from "flowbite-vue";
import "vue3-toastify/dist/index.css";
import { toast } from "vue3-toastify";
import Swal from "sweetalert2";
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    data() {
        return {
            currentPage : ref(1),
            STORAGE_URL: import.meta.env.VITE_API_BASE_STORAGE,
        }
    },
    components: {
        FwbPagination,
    },
    setup() {
      const router = useRouter();
    },
    computed: {
        ...mapState(['prodModule']),
        ...mapMutations(["setToken"]),
    },
    async mounted() {
        await this.loadProd();
    },
    async watch() {
        await this.loadProd();
    },
    methods: {
        ...mapActions(["getProdAct","deleteProdAct"]),

        loadProd() {
            this.$store.dispatch("getProdAct", this.currentPage);
        },

        async onShow(id) {
            this.$router.push('/product/'+id);
        },

        async saveProd() {
            const result = await this.v$.$validate();

            if(result) {
                const formData = new FormData();
                formData.append('prix',this.prix);
                formData.append('titre',this.titre);
                formData.append('couverture',this.couverture);
                formData.append('sous_titre',this.sous_titre);
                formData.append('categorie_id',this.categorie_id);
                formData.append('description',this.description);

                for (var i = 0; i < this.$refs.images.files.length; i++ ){
                    let file = this.$refs.images.files[i];
                    formData.append('images[' + i + ']', file);
                }
                
                this.storeProd(formData);

                if (this.prodModule.status) {
                    toast.success(this.prodModule.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    this.clearInputs();
                }
            }

        },

        async deleteProd(id) {

          Swal.fire({
                title: "Attention !",
                text: "Vous voulez vraiment supprimer cet catégorie ?",
                icon: "error",
                showCancelButton: true,
                cancelButtonText: "Non, annuler !",
                cancelButtonColor: "#d33",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Oui, supprimer !",
            }).then((result) => {
                if (result.isConfirmed) {
                  this.deleteProdAct(id);
                  this.loadProd();
                  if (this.prodModule.status) {
                      toast.success(this.prodModule.message, {
                          position: toast.POSITION.TOP_RIGHT,
                      });
                  }
                }
            });
            
        }
    }
}

</script>