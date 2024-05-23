import { defineStore } from 'pinia'

export const cartModule = defineStore('cartModule', {
    state: () => ({
        cartItems: []
    }),
    actions: {
        addItem(item) {
            let exists = false; 
            
            for(let i = 0; i < this.cartItems.length; i++) {
                if(this.cartItems[i].id == item.id) {
                    this.cartItems[i].qte += item.qte
                    exists = true;
                    break;
                }
            }

            if(!exists) {
                this.cartItems.push(JSON.parse(
                    JSON.stringify(item)
                ));
            }
             
            localStorage.setItem('cart-items',
            JSON.stringify(this.cartItems));
        },

        getItemsCart() {
            if(localStorage.getItem('cart-items')) {
                this.cartItems = JSON.parse(localStorage.getItem('cart-items'));
            }
        },

        deleteItem(id) {
            for(let i = 0; i < this.cartItems.length; i++) {
                if(this.cartItems[i].id == id) {
                    this.cartItems.splice(i, 1);
                    break;
                }
            }

            localStorage.setItem('cart-items',
            JSON.stringify(this.cartItems));
        },

        setLocalStorage() {
            localStorage.setItem('cart-items',
            JSON.stringify(this.cartItems));
        },

        resetItems() {
            this.cartItems = [];
            localStorage.removeItem('cart-items');
        }
    }
})