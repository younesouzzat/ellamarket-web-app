<template>
    <div>
        <router-view />
        <QuickView/>
        <v-snackbar v-model="bar" location="left bottom" timeout="3000">
            {{ itemTitle }} ajouter avec succès !
            <template v-slot:actions>
                <v-icon @click="bar = false">
                    mdi-close
                </v-icon>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import QuickView from '@/components/Global/QuickView.vue';

export default {
    inject:['Emitter'],
    data: () => ({
        bar: false,
        itemTitle: '',
    }),
    mounted() {
        this.Emitter.on('showMessage', (data) => {
            this.itemTitle = data;
            this.bar = true;
        })
    },
    components: { QuickView } 
}
</script>

<style>
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance:textfield;
}

.img-parent:hover .quick-view-btn {
    opacity: 1 !important;
}

@media(max-width:900) {
    .img-parent:hover .quick-view-btn {
        opacity: 1 !important;
    }
}

</style>