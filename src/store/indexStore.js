import { createStore } from "vuex";

// Modules
import orderModule from "@/store/orderModule";
import authModule from "@/store/authModule";
import prodModule from "@/store/prodModule";
import catModule from "@/store/catModule";

export const store = createStore({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{
        orderModule,
        authModule,
        prodModule,
        catModule,
    },
})