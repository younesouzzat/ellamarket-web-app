import axios from 'axios';
import { API_BASE_URL } from '@/config.js'

export default {
    state: {
        errors: [],
        message: '',
        product: [],
        products: [],
        status: false,
        pagination: {},
        isLoading: false,
        token: sessionStorage.getItem('TOKEN'),
    },
    getters: {},
    mutations: {
        setToken(state) {
            state.token = sessionStorage.getItem('TOKEN');
        },
        setStatus( state, status ) {
            state.status = status;
        },
        setErrors( state, errors ) {
            state.errors = [];
            state.errors.push(errors);
        },
        clearErrors(state) {
            state.errors = [];
        },
        setMessage( state, message ) {
            state.message = message;
        },
        setLoading( state, load ) {
            state.isLoading = load;
        },
        setProducts(state, data) {
            state.products = data;
        },
        setProduct(state, data) {
            state.product = data;
        },
        setPagination(state, data) {
            state.pagination = data;
        },
        removeProd(state, id) {
            const index = state.products.findIndex(item => item.id === id);
            state.products.splice(index, 1);
        }
    },
    actions: {
        
        async storeProd({ commit , state }, formData) {
            commit('setLoading', true);
            
            await axios.post(`${API_BASE_URL}/store-product`, formData, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }
            })
            .then((response) => {
                commit('setMessage', response.data.message);
                commit('setStatus', response.data.success);
                commit('setLoading', false);
                commit('clearErrors');
            })
            .catch((error) => {
                if(error.response) {
                    commit('setErrors', error.response.data.message);
                    commit('setLoading', false);
                }
            })
        },
        
        async updateProdAct({ commit , state }, formData) {
            commit('setLoading', true);
            
            await axios.post(`${API_BASE_URL}/update-product`, formData, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }
            })
            .then((response) => {
                commit('setMessage', response.data.message);
                commit('setStatus', response.data.success);
                commit('setLoading', false);
                commit('clearErrors');
            })
            .catch((error) => {
                if(error.response) {
                    commit('setErrors', error.response.data.message);
                    commit('setLoading', false);
                }
            })
        },

        async getProdAct({ commit , state }, page) {
            commit('setLoading', true);
            await axios.get(`${API_BASE_URL}/products?page=${page}`, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }
            })
            .then((response) => {
                commit('setProducts', response.data.products.data);
                commit('setPagination', response.data.products);
                commit('setLoading', false);
            })
            .catch((error) => {
                console.log(error);
                commit('setLoading', false);
            })
        },
        
        async getOneProdAct({ commit, state }, id) {
            await axios.get(`${API_BASE_URL}/get-product/${id}`, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }
            })
            .then((response) => {
                commit('setProduct', response.data.product);
            })
            .catch((error) => {
                console.log(error);
            })
        },
        
        async deleteProdAct({ commit, state }, id) {
            await axios.delete(`${API_BASE_URL}/delete-product/${id}`, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }
            })
            .then((response) => {
                commit('removeProd', id);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}