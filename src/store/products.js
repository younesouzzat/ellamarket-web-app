import { defineStore } from 'pinia';
import axios from 'axios';
import { API_BASE_URL } from '@/config.js'

export const productsModule = defineStore('productsModule', {
    state: () => ({
        product: "",
        flashDeals: [],
        newProducts: [],
        categories: [],
        productsCategory: [],
    }),
    actions: {
        async getCategories() {
            await axios.get(`${API_BASE_URL}/data-categories`)
            .then((res) => {
                this.categories = res.data.categories;
            })
            .catch(error => console.log(error))
        },

        async getAllProducts() {
            await axios.get(`${API_BASE_URL}/all-data-products`)
            .then((res) => {
                this.productsCategory = res.data.products;
            })
            .catch(error => console.log(error))
        },
        
        async getProducts() {
            await axios.get(`${API_BASE_URL}/all-data-products`)
            .then((res) => {
                this.flashDeals = res.data.products.filter((el) => el.categorie.libelle === 'Casque');
                this.newProducts = res.data.products.filter((el) => el.categorie.libelle === 'PC');
            })
            .catch(error => console.log(error))
        },
        
        async getFilterProducts(page,category,min_price,max_price,promotion) {
            category = category === false ? '' : category;
            await axios.get(`${API_BASE_URL}/data-products?page=${page}&category=${category}&min_price=${min_price}&max_price=${max_price}&promotion=${promotion}`)
            .then((res) => {
                this.productsCategory = res.data.products;
            })
            .catch(error => console.log(error))
        },
        
        async getProduct(id) {
            await axios.get(`${API_BASE_URL}/data-one-product/${id}`)
            .then((res) => {
                this.product = res.data.product;
            })
            .catch(error => console.log(error))
        },

        async getProductsByCategory(category) {
            await axios.get(`${API_BASE_URL}/data-category-by-name/${category}`)
            .then((res) => {
                this.productsCategory = res.data.products;
            })
            .catch(error => console.log(error))
        }

    }
}) 