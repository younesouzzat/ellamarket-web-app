<template>
  <div class="flex flex-wrap mt-36">
    <div class="w-full mb-12 px-4">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <card-stats
            statSubtitle="Ventes"
            :statTitle="`${this.sumSales} MAD`"
            :statArrow="this.etatSales == 1 ? 'up' : 'down'"
            :statPercent="this.percentSales"
            :statPercentColor="this.etatSales == 1 ? 'text-emerald-500' : 'text-red-500'"
            statDescripiron="Depuis le mois dernier"
            statIconName="far fa-dollar"
            statIconColor="bg-red-500"
          />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <card-stats
            statSubtitle="CLIENTS"
            :statTitle="this.countCust"
            :statArrow="this.etatCust == 1 ? 'up' : 'down'"
            :statPercent="this.percentCust"
            :statPercentColor="this.etatCust == 1 ? 'text-emerald-500' : 'text-red-500'"
            statDescripiron="Depuis le mois dernier"
            statIconName="fas fa-users"
            statIconColor="bg-orange-500"
          />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <card-stats
            statSubtitle="N. Commandes"
            :statTitle="this.countOrders"
            :statArrow="this.etatOrders == 1 ? 'up' : 'down'"
            :statPercent="this.percentOrders"
            :statPercentColor="this.etatOrders == 1 ? 'text-emerald-500' : 'text-red-500'"
            statDescripiron="Depuis le mois dernier"
            statIconName="fas fa-box"
            statIconColor="bg-pink-500"
          />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <card-stats
            statSubtitle="N. Commandes Livré"
            :statTitle="this.countDelivered"
            :statArrow="this.etatDelivered == 1 ? 'up' : 'down'"
            :statPercent="this.percentDelivered"
            :statPercentColor="this.etatDelivered == 1 ? 'text-emerald-500' : 'text-red-500'"
            statDescripiron="Depuis le mois dernier"
            statIconName="fas fa-truck-fast"
            statIconColor="bg-emerald-500"
          />
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <card-line-chart :chartSales="chartSales" :chartOrders="chartOrders" />
        </div>
        <div class="w-full xl:w-4/12 px-4">
          <card-bar-chart  :chartSales="chartSales" :chartOrders="chartOrders" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { dashModule } from "@/store/dashboard";
import { mapActions, mapState } from "pinia";

import CardStats from "@/components/Cards/CardStats.vue";
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";

export default {
  name: "dashboard-page",
  components: {
    CardStats,
    CardLineChart,
    CardBarChart,
  },
  computed: {
    ...mapState(dashModule, [
        'chartSales', 'chartOrders', 
        'countCust', 'etatCust', 'percentCust',
        'sumSales', 'etatSales', 'percentSales',
        'countOrders', 'etatOrders', 'percentOrders',
        'etatDelivered', 'countDelivered', 'percentDelivered',
    ]),
  },
  async mounted() {
    await this.getStatus();
  },
  async watch() {
    await this.getStatus();
  },
  methods: {
    ...mapActions(dashModule, ['getStatus'])
  }
};
</script>
