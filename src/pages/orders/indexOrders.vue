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
                  List des commandes
                </h3>
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
                    Numero
                  </th>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Date
                  </th>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Montant
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
              <tbody v-if="this.orderModule.isLoading">
                <tr>
                  <td colspan="6" class="text-center p-1">
                        Chargement ....
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr v-if="!this.orderModule.orders.length">
                    <td colspan="6" class="text-center p-1">
                        Aucun résultat trouvé
                    </td>
                </tr>
                <tr v-else v-for="item in this.orderModule.orders" :key="item.id">
                  <td
                    class="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                     {{ item.numero }}
                  </td>
                  <td
                    class="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                     {{ item.date }}
                  </td>
                  <td
                    class="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                     {{ item.montant }} MAD
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    <span v-if="item.etat == 1" class="bg-green-100 text-green-800 text-xs font-bold me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 mr-2">
                        Livré
                    </span>
                    <span v-else class="bg-blue-100 text-blue-800 text-xs font-bold me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 mr-2">
                        Traitment
                    </span>
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
                      @click="deleteOrder(item.id)"
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
                  :total-items="this.orderModule.pagination.total"
                  :per-page="this.orderModule.pagination.per_page"
                  :current="this.orderModule.pagination.current_page"
                  @click="loadOrder"
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
        }
    },
    components: {
        FwbPagination,
    },
    setup() {
      const router = useRouter();
    },
    computed: {
        ...mapState(['orderModule']),
        ...mapMutations(["setToken"]),
    },
    async mounted() {
        await this.loadOrder();
    },
    async watch() {
        await this.loadOrder();
    },
    methods: {
        ...mapActions(["getOrderAct","deleteOrderAct"]),

        loadOrder() {
            this.$store.dispatch("getOrderAct", this.currentPage);
        },

        async onShow(id) {
            this.$router.push('/order/'+id);
        },

        async deleteOrder(id) {

          Swal.fire({
                title: "Attention !",
                text: "Vous voulez vraiment supprimer cet commandes ?",
                icon: "error",
                showCancelButton: true,
                cancelButtonText: "Non, annuler !",
                cancelButtonColor: "#d33",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Oui, supprimer !",
            }).then((result) => {
                if (result.isConfirmed) {
                  this.deleteOrderAct(id);
                  this.loadOrder();
                  if (this.orderModule.status) {
                      toast.success(this.orderModule.message, {
                          position: toast.POSITION.TOP_RIGHT,
                      });
                  }
                }
            });
            
        }
    }
}

</script>