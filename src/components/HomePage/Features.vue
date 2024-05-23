<template>
    <div class="features">
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="6" lg="4">
                    <div class="parent d-flex align-center justify-center flex-column flex-sm-row">
                        <div class="delivery text-lg font-weight-[500]">
                            <v-icon>mdi-truck-fast</v-icon>
                            <span class="ml-2">Livraison Rapide 24h</span>
                        </div>
                    </div>
                </v-col>
                        
                <v-col cols="12" sm="6" md="6" lg="4">
                    <div class="parent d-flex align-center justify-center flex-column flex-sm-row second">
                        <div class="trophy text-lg font-weight-[500]">
                            <v-icon>mdi-trophy</v-icon>
                            <span class="ml-2">Produits 100% Qualité</span>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="4">  
                    <div class="parent d-flex align-center justify-center flex-column flex-sm-row second">
                        <div class="support text-lg font-weight-[500]">
                            <v-icon>mdi-face-agent</v-icon>
                            <span class="ml-2">Support 24/24h et 7/7j</span>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style>
.features .second {
    position: relative;
}

.second::before {
    content: "";
    position: absolute;
    background-color: rgb(50, 50, 50);
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 70%;
}

@media(max-width: 600px) {
    .second::before, .second::after  {
        display: none;
    }
}
</style>