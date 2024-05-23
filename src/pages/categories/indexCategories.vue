<template>
  <div class="flex flex-wrap mt-36">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex items-center">
            <div
              class="relative flex flex-row justify-between w-full px-4 max-w-full flex-grow"
            >
              <div>
                <h3 class="font-semibold text-lg">List des catégories</h3>
              </div>
              <div>
                <button
                  type="button"
                  @click="openaddModal()"
                  class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <i class="fas fa-plus-circle mr-1"></i>
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <!-- Projects table -->
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Catégorie
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody v-if="this.catModule.isLoading">
              <tr>
                <td colspan="6" class="text-center p-1">Chargement ....</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-if="!this.catModule.categories.length">
                <td colspan="6" class="text-center p-1">
                  Aucun résultat trouvé
                </td>
              </tr>
              <tr
                v-else
                v-for="item in this.catModule.categories"
                :key="item.id"
              >
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
                >
                  {{ item.libelle }}
                </td>
                <td
                  class="border-t-0 flex px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  <button
                    title="Modifier"
                    class="w-10 m-1 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    @click="getItem(item.id)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>

                  <button
                    title="Supprimer"
                    class="w-10 m-1 justify-center items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    @click="removeItem(item.id)"
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
              :total-items="this.catModule.pagination.total"
              :per-page="this.catModule.pagination.per_page"
              :current="this.catModule.pagination.current_page"
              @click="loadData"
            ></fwb-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    id="addCatMod"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Catégorie
          </h3>
          <button
            type="button"
            @click="closeaddModal()"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form @submit.prevent="saveCat">
          <div class="p-4 md:p-5 space-y-4" v-if="this.catModule.errors.length">
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
                    v-for="(item, index) in this.catModule.errors"
                    :key="index"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="p-4 md:p-5 space-y-4">
            <label
              for="libelle"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Libelle *</label
            >
            <input
              type="text"
              id="libelle"
              v-model="libelle"
              :class="[`{!v$.name.$valid ? 'danger' : ''}`]"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Libelle"
            />
            <span v-for="err in v$.$errors" :key="err.$uid">
              <span class="text-red-500" v-if="err.$property == 'libelle'">
                Champ obligatoire *
              </span>
            </span>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              :disabled="this.catModule.isLoading"
              type="submit"
              class="text-white justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                v-if="this.catModule.isLoading"
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
              Ajouter
            </button>
            <button
              @click="closeaddModal()"
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div
    id="updateCatMod"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Modifier catégorie
          </h3>
          <button
            type="button"
            @click="closeeditModal()"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form @submit.prevent="updateCat">
          <div class="p-4 md:p-5 space-y-4" v-if="this.catModule.errors.length">
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
                    v-for="(item, index) in this.catModule.errors"
                    :key="index"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="p-4 md:p-5 space-y-4">
            <label
              for="libelle"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Libelle *</label
            >
            <input
              type="text"
              id="libelle"
              v-model="form.libelle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Libelle"
            />
            <span v-for="err in v$.$errors" :key="err.$uid">
              <span class="text-red-500" v-if="err.$property == 'libelle'">
                Champ obligatoire *
              </span>
            </span>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              :disabled="this.catModule.isLoading"
              type="submit"
              class="text-white justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                v-if="this.catModule.isLoading"
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
            <button
              @click="closeeditModal()"
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "vue3-toastify/dist/index.css";
import { toast } from "vue3-toastify";
import { FwbPagination } from "flowbite-vue";
import { initFlowbite, Modal } from "flowbite";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        id: "",
        libelle: "",
      },
      libelle: "",
      statu: false,
      addModal: "",
      editModal: "",
      dataTable: [],
      showModal: false,
      hideModal: true,
      currentPage: ref(1),
    };
  },
  components: {
    FwbPagination,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      libelle: { required },
      form: {
        $each: {
          libelle: { required },
        },
      },
    };
  },
  computed: {
    ...mapState(["catModule"]),
    ...mapMutations(["setCategorie", "setStatu", "setToken"]),
    ...mapActions(["getCatAct"]),
    ...initFlowbite(),
  },
  async mounted() {
    const $targetEl = document.getElementById("addCatMod");
    const $targetEl2 = document.getElementById("updateCatMod");
    this.addModal = new Modal($targetEl);
    this.editModal = new Modal($targetEl2);

    await this.loadData();
  },
  async watch() {
    await this.loadData();
  },
  methods: {
    ...mapActions(["addCatAct", "updateCatAct", "deleteCatAct"]),

    openaddModal() {
      this.addModal.show();
    },

    closeaddModal() {
      this.addModal.hide();
    },

    openeditModal() {
      this.editModal.show();
    },

    closeeditModal() {
      this.editModal.hide();
    },

    getItem(id) {
      this.editModal.show();
      const data = this.catModule.categories.find((item) => item.id === id);
      this.form.id = data.id;
      this.form.libelle = data.libelle;
    },

    removeItem(id) {
      Swal.fire({
        title: "Attention !",
        text: "Vous voulez vraiment supprimer cet catégorie ?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Non, annuler !",
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Oui, supprimer !",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("deleteCatAct", id);
          this.loadData();
          toast.success("Catégorie bien supprimer !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    },

    loadData() {
      this.$store.dispatch("getCatAct", this.currentPage);
    },

    async saveCat() {
      const result = await this.v$.$validate();

      if (result) {
        const formData = new FormData();
        formData.append("libelle", this.libelle);
        this.addCatAct(formData);
        if (this.catModule.status) {
          this.loadData();
          this.addModal.hide();
          toast.success(this.catModule.message, {
            position: toast.POSITION.TOP_RIGHT,
          });

          this.libelle = "";
        }
      }
    },

    async updateCat() {
      const formData = new FormData();
      formData.append("id", this.form.id);
      formData.append("libelle", this.form.libelle);
      this.updateCatAct(formData);
      if (this.catModule.status) {
        this.loadData();
        this.editModal.hide();
        toast.success(this.catModule.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
  },
};
</script>
