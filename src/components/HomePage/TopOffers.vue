<template>
    <div class="top-offres bg-grey-lighten-4 pt-5">
        <v-container fluid>
            <v-row>
                <v-col cols="12" sm="6" md="4" lg="4" class="py-0 px-3 pr-lg-6">
                    <v-hover v-slot="{ isHovering, props }">
                        <div class="parent" v-bind="props" style="height: 100%;overflow: hidden;border-radius: 7px;">
                            <img
                                src="../../assets/images/playstations.webp"
                                class="w-full"
                                :style="`height: 100%;transition: 0.5s all ease-in-out;scale:${ isHovering ? 1.1 : 1}`"
                                alt=""
                            />
                        </div>
                    </v-hover>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4" class="py-0 px-3 pr-lg-6 mt-5 mt-sm-0">
                    <v-hover v-slot="{ isHovering, props }">
                        <div class="parent" v-bind="props" style="height: 100%;overflow: hidden;border-radius: 7px;">
                            <img
                                src="../../assets/images/headset.webp"
                                class="w-full"
                                :style="`height: 100%;transition: 0.5s all ease-in-out;scale:${ isHovering ? 1.1 : 1}`"
                                alt=""
                            />
                        </div>
                    </v-hover>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4" class="py-0 px-3 pr-lg-6 mt-5 mt-lg-0">
                    <v-hover v-slot="{ isHovering, props }">
                        <div class="parent" v-bind="props" style="height: 100%;overflow: hidden;border-radius: 7px;">
                            <img
                                src="../../assets/images/chairs.webp"
                                class="w-full"
                                :style="`height: 100%;transition: 0.5s all ease-in-out;scale:${ isHovering ? 1.1 : 1}`"
                                alt=""
                            />
                        </div>
                    </v-hover>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" class="mt-3 px-3 pr-sm-5 py-0">
                    <div class="parent pr-2">
                        <img
                            src="../../assets/images/iphones.webp"
                            alt=""
                            class="w-full"
                        />
                    </div>
                </v-col>

                <v-col cols="12" sm="6" class="mt-3 pl-3 pl-sm-5 py-0">
                    <div class="parent pl-2">
                        <img
                            src="../../assets/images/laptops.webp"
                            alt=""
                            class="w-full"
                        />
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
