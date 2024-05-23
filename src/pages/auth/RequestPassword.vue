<template>
  <HomeLayout title="Demander un nouveau mot de passe">
    <v-container fluid class="my-20">
      <v-row class="d-flex justify-center align-center">
        <v-col cols="12" md="4">
          <h1 class="text-center text-lg font-semibold py-2">Demander un nouveau mot de passe</h1>
          <form @submit.prevent="sendEmail" class="space-y-6">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Adresse e-mail</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  v-model="email"
                  type="text"
                  autocomplete="email"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                :disabled="this.authModule.isLoading"
                type="submit"
                class="flex w-full justify-center align-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <svg
                  v-if="this.authModule.isLoading"
                  aria-hidden="true"
                  role="status"
                  class="flex w-full justify-center items-center inline w-4 h-4 me-3 text-white animate-spin"
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
                Envoyez
              </button>
            </div>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../../layout/HomeLayout.vue";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      RESET_PWD: import.meta.env.VITE_APP_RESET_PWD,
    };
  },
  components: { HomeLayout },
  computed: {
    ...mapState(["authModule"]),
  },
  methods: {
    ...mapActions(["requestPwdAct"]),
    async sendEmail() {
      if (this.email) {
        const formData = new FormData();
        formData.append("email", this.email);
        formData.append("reset_pwd", this.RESET_PWD);
        await this.requestPwdAct(formData);
      }
    },
  },
};
</script>
