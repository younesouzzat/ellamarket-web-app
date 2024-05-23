import axios  from "axios";
import { API_BASE_URL } from '@/config.js';

export default {
    state: {
        order: '',
        orders: [],
        status: '',
        details: [],
        message: '',
        pagination: {},
        isLoading: false,
        token: sessionStorage.getItem('TOKEN'),
    }, 
    getters: {},
    mutations: {
        setToken(state) {
            state.token = sessionStorage.getItem('TOKEN');
        },
        setLoading( state, load ) {
            state.isLoading = load;
        },
        setOrders(state, orders) {
            state.orders = orders;
        },
        setPagination(state, data) {
            state.pagination = data;
        },
        setStatus(state, data) {
            state.status = data;
        },
        setMessage(state, data) {
            state.message = data;
        },
        setOrder(state, data) {
            state.order = data;
        },
        setDetails(state, data) {
            state.details = data;
        }
    },
    actions: {
        async getOrders({ commit , state }) {
            commit('setLoading', true);
            await axios.get(`${API_BASE_URL}/orders`, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }
            })
            .then((res) => {
                commit('setOrders', res.data.orders.data);
                commit('setPagination', res.data.orders);
                commit('setLoading', false);
            })
            .catch((error) => console.log(error))
        },

        async getOrderAct({ commit , state }, page) {
            commit('setLoading', true);
            await axios.get(`${API_BASE_URL}/orders?page=${page}`, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }
            })
            .then((res) => {
                commit('setOrders', res.data.orders.data);
                commit('setPagination', res.data.orders);
                commit('setLoading', false);
            })
            .catch((error) => {
                console.log(error);
                commit('setLoading', false);
            })
        },

        async getOneOrder({ commit , state }, id) {
            await axios.get(`${API_BASE_URL}/get-order/${id}`, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }
            })
            .then((res) => {
                commit('setOrder', res.data.order);
                commit('setDetails', res.data.details);
            })
            .catch((error) => console.log(error))
        },
        
        async updateEtatOrder({ commit , state }, data) {
            commit('setLoading', true);
            await axios.post(`${API_BASE_URL}/update-order`, data, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ state.token }`
                }
            })
            .then((res) => {
                commit('setMessage', res.data.message);
                commit('setStatus', res.data.success);
                commit('setLoading', false);
            })
            .catch((error) => console.log(error))
        }
    }
}