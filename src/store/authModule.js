import axios from 'axios';
import router from '../routes/indexRoutes';
import { API_BASE_URL } from '@/config.js';

export default {
    state:{
        user: {
            token: sessionStorage.getItem('TOKEN'),
            data: {
                name: sessionStorage.getItem('USER')
            }
        },
        errors: [],
        isLoading: false,
        authStatus: false,
    },
    getters:{
        isLoggedIn(state) {
            return state.user.token;
        },
        getcurrentUser(state) {
            return state.user.name;
        },
    },
    mutations: {
        setUser(state, user) {
            state.user.data.name = user;
            sessionStorage.setItem('USER', user);
        },
        setToken(state, token) {
            state.user.token = token;
            if(token) {
                sessionStorage.setItem('TOKEN',token)
            }
        },
        setLoadingStatus(state, status) {
            state.isLoading = status;
        },
        setErrors(state, errors) {
            state.errors = errors;
        },
    },
    actions: {
        async registerUserAct({ commit }, formData) {
            commit('setLoadingStatus', true);
            return await axios.post(`${API_BASE_URL}/register`, formData)
            .then((response) => {
                commit('setLoadingStatus', false);
                commit('setUser', response.data.user.name);
                commit('setToken', response.data.user.token);
                router.push({ name: 'dashboard' });
            })
            .catch((error) => {
                if(error.response) {
                    commit('setLoadingStatus', false);
                    const data = error.response.data.message;
                    commit('setErrors', data);
                }
            })
        },
        async loginUserAct({ commit }, formData) {
            commit('setLoadingStatus', true);
            return await axios.post(`${API_BASE_URL}/login`, formData)
            .then((response) => {
                commit('setLoadingStatus', false);
                commit('setUser', response.data.user.name);
                commit('setToken', response.data.user.token);
                router.push({ name: 'dashboard' });
            })
            .catch((error) => {
                if(error.response) {
                    commit('setLoadingStatus', false);
                    const data = error.response.data.message;
                    commit('setErrors', data);
                }
            })  
        },
        async requestPwdAct({ commit }, formData) {
            commit('setLoadingStatus', true);
            return await axios.post(`${API_BASE_URL}/request-password`, formData)
            .then((response) => {
                commit('setLoadingStatus', false);
                commit('setUser', response.data.user.name);
                commit('setToken', response.data.user.token);
            })
            .catch((error) => {
                if(error.response) {
                    commit('setLoadingStatus', false);
                    const data = error.response.data.message;
                    commit('setErrors', data);
                }
            })  
        },
        async resetPwdAct({ commit }, formData) {
            commit('setLoadingStatus', true);
            return await axios.post(`${API_BASE_URL}/reset-password`, formData)
            .then((response) => {
                commit('setLoadingStatus', false);
                commit('setUser', response.data.name);
                commit('setToken', response.data.token);
                router.push({ name: 'dashboard' });
            })
            .catch((error) => {
                if(error.response) {
                    commit('setLoadingStatus', false);
                    const data = error.response.data.message;
                    commit('setErrors', data);
                }
            })  
        },
        async loginOutAct({ commit }) {
            commit('setUser', '');
            commit('setToken', '');
            sessionStorage.removeItem('TOKEN');    
            sessionStorage.removeItem('USER');    
            router.push({ name: 'login' });
        }
    },   
}