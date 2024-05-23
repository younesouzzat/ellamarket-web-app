import axios from 'axios';
import { API_BASE_URL } from '@/config.js';

export default {
    state: {
        errors: [],
        message: '',
        status: false,
        categories: [],
        pagination: {},
        isLoading: false,
        token: sessionStorage.getItem('TOKEN'),
    },
    getters: {
        getCategories() {
            return this.state.categories;
        }
    },
    mutations: {
        setToken(state) {
            state.token = sessionStorage.getItem('TOKEN');
        },
        setErrors(state, errors) {
            state.errors = [];
            state.errors.push(errors);
        },
        clearErrors(state) {
            state.errors = [];
        },
        setMessage(state, message) {
            state.message = message;
        },
        setLoading(state, status) {
            state.isLoading = status;
        },
        setPagination(state, data) {
            state.pagination = data;
        },
        setStatus(state, status) {
            state.status = status;
        },
        setCategorie(state, data) {
            state.categories = data;
        },
        addCategorie(state, data) {
            state.categories.push(data);
        },
        removeItem(state, id){
            const index = state.categories.findIndex((item) => item.id === id);
            state.categories.splice(index, 1);
        }
    },
    actions: {
        
        async getCatAllAct({ commit , state }) {
            await axios.get(`${API_BASE_URL}/all-categories`, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }   
            })
            .then((response) => {
                commit('setCategorie', response.data.categories);
            })
            .catch((error) => {
                console.log(error);
            })
        },
        
        async getCatAct({ commit , state }, page) {
            commit('setLoading', true);
            await axios.get(`${API_BASE_URL}/categories?page=${page}`, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }
            })
            .then((response) => {
                commit('setCategorie', response.data.categories.data);
                commit('setPagination', response.data.categories);
                commit('setLoading', false);
            })
            .catch((error) => {
                console.log(error);
                commit('setLoading', false);
            })
        },

        async addCatAct({ commit , state }, formData) {
            commit('setLoading', true);
            await axios.post(`${API_BASE_URL}/store-categorie`, formData, {
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
                    commit('setLoading', false);
                    const data = error.response.data.message;
                    commit('setErrors', data);
                }
            })
        },
        
        async updateCatAct({ commit , state }, formData) {
            commit('setLoading', true);
            await axios.post(`${API_BASE_URL}/update-categorie`, formData, {
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
                    commit('setLoading', false);
                    const data = error.response.data.message;
                    commit('setErrors', data);
                }
            })
        },

        async deleteCatAct({ commit, state }, id) {
            await axios.delete(`${API_BASE_URL}/delete-categorie/${id}`, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }
            })
            .then((response) => {
                commit('removeItem', id);
            })
            .catch((error) => {
                console.log(error);
            })
        },
    }
}