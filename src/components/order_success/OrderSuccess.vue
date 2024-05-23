<template>
    <div class="order-success">
        <v-dialog v-model="dialog" width="50%" persistent>
            <v-card class="text-center p-5">
                <div class="text-center p-5">
                    <v-icon
                        style="
                            background-color: white;
                            color: green;
                            width: 80px;
                            height: 80px;
                            font-size: 60px;
                            border: 1px solid green;
                            border-radius: 50%;
                        "
                        >mdi-check</v-icon
                    >
                </div>
                <v-card-title style="font-size: 30px; font-weight: bold; color: #4e4e4e"
                    >Félicitation votre commande bien ajouté !</v-card-title
                >
                <v-card-text style="font-size: 20px; color: #979797;">
                    Votre demande vous sera transmise dans les plus brefs délais. 
                </v-card-text>
                <v-card-actions class="mt-5 mb-5 justify-center">
                    <v-btn variant="elevated" color="blue" @click="resetData">
                        J'ai compris !
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { cartModule } from "@/store/cart.js";
import { mapState, mapActions } from "pinia";

export default {
    data: () => ({
        dialog: false,
    }),
    props: {
        popup: {
            type: Boolean
        }
    },
    watch: {
        dialog(newVal) {
            if(!newVal) {
                setTimeout(() => {
                    this.$emit('close_popup');
                },200)
            }
        }
    },
    mounted() {
        this.dialog = this.popup
    },
    methods: {
        ...mapActions(cartModule, ["resetItems"]),
        resetData() {
            this.resetItems();
            this.dialog = false;
            this.$router.push({ name : 'home' })
        }
    }
};
</script>
