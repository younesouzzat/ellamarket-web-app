import { defineStore } from 'pinia';
import axios from 'axios'

export const checkoutModule = defineStore('checkoutModule', {
    state: () => ({
        cartItems: [],
        success: false,
    }),
    actions: {
        async saveOrder(formData) {
            if(localStorage.getItem('cart-items')) {
                this.cartItems = localStorage.getItem('cart-items');
                formData.append('products', this.cartItems);
                await axios.post('/api/save-order', formData)
                .then((res) => {
                    localStorage.removeItem('cart-items');
                    this.success = true;
                })
                .catch(error => console.log(error))
            }
        }
    }
})