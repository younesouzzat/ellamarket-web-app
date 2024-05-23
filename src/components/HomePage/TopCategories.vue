<template>
    <div class="top-category mt-5">
        <div class="cyber-banner">
            <img src="@/assets/images/cyber-banner.webp" class="w-100" alt="" />
        </div>
    </div>
    <div class="categories bg-white pt-15">
        <div class="title d-flex justify-center align-center px-5 mb-3">
            <h2
                class="text-center flex-grow-1"
                style="font-size: 20px; font-weight: 600"
            >
                Top Categories
            </h2>
        </div>
        <v-container fluid>
            <v-row>
                <v-col cols="6" sm="4" md="3" lg="2" v-for="cat in categories" :key="cat.title">
                    <v-card class="text-center py-3 px-2" elevation="0">
                        <v-hover v-slot="{ isHovering, props }">
                            <div
                                class="img-parent-cat w-100"
                                style="
                                    overflow: hidden;
                                    border-radius: 50%;
                                "
                            >
                                <img
                                    :src="cat.image"
                                    alt=""
                                    class="w-100 md:w-1/2"
                                    :style="`cursor: pointer;
                                    transition: 0.4s all ease-in-out;
                                    scale:${isHovering ? 1.05 : 1}`"
                                    v-bind="props"
                                />
                            </div>
                        </v-hover>
                        <v-card-text>{{ cat.title }}</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
        categories: [
            {
                title: "Mobile phones",
                image: "https://new-ella-demo.myshopify.com/cdn/shop/files/mobile-phones.png?v=10616357514144629263",
            },
            {
                title: "Labtops",
                image: "https://new-ella-demo.myshopify.com/cdn/shop/files/laptops-tablets.png?v=17546078654541140209",
            },
            {
                title: "TVS",
                image: "https://new-ella-demo.myshopify.com/cdn/shop/files/televisions.png?v=792225267698738137",
            },
            {
                title: "PCs",
                image: "https://new-ella-demo.myshopify.com/cdn/shop/files/pcs-accessories.png?v=7913320403362682840",
            },
            {
                title: "Audio & Video",
                image: "https://new-ella-demo.myshopify.com/cdn/shop/files/audio-video.png?v=17118273463527967791",
            },
            {
                title: "Gaming",
                image: "https://new-ella-demo.myshopify.com/cdn/shop/files/gaming-accessories.png?v=5365032838061682635",
            },
        ],
    }),
};
</script>

<style>

@media(max-width:580px) {
    .cyber-banner img {
        scale: 1.5;
    }
}
</style>
