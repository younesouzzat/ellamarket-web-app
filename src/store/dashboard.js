import axios from "axios";
import { defineStore } from "pinia";
import { API_BASE_URL } from '@/config.js'

export const dashModule = defineStore('dashModule', {
    state: () => ({
        sumSales: 0,
        etatCust: 0,
        etatSales: 0,
        countCust: 0,
        etatOrders: 0,
        percentCust: 0,
        countOrders: 0,
        percentSales: 0,
        percentOrders: 0,
        etatDelivered: 0,
        countDelivered: 0,
        percentDelivered: 0,
        chartSales: [],
        chartOrders: [],
        token: sessionStorage.getItem('TOKEN'),
    }),
    actions: {
        async getStatus() {
            await axios.get(`${API_BASE_URL}/get-states`, {
                headers : {
                    Accept : 'application/json',
                    Authorization : `Bearer ${ this.token }`
                }
            })
            .then((res) => {
                
                // Ventes
                this.sumSales     = res.data.sumSales;
                this.etatSales    = res.data.etatSales;
                this.percentSales = res.data.percentSales;
                
                // Clients
                this.etatCust     = res.data.etatUsers;
                this.countCust    = res.data.countUsers;
                this.percentCust  = res.data.percentUsers;

                // Commandes
                this.etatOrders     = res.data.etatOrders;
                this.countOrders    = res.data.countOrders;
                this.percentOrders  = res.data.percentOrders;
                
                // Commandes terminer
                this.etatDelivered     = res.data.etatDelivered;
                this.countDelivered    = res.data.countDelivered;
                this.percentDelivered  = res.data.percentDelivered;

                // Charts
                this.chartSales  = res.data.chartVen;
                this.chartOrders = res.data.chartCmd;
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
})