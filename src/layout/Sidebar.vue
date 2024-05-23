<template>
    <div class="min-w-[160px] w-[160px]  transition-all bg-indigo-700 text-white py-4 px-2">
        <router-link
            :to="{ name: 'dashboard' }"
            class="flex items-center p-2 rounded transition-colors hover:bg-black/30"
        >
            <span class="mr-2 text-gray-300">
                <HomeIcon class="w-5" />
            </span>
            <span class="text-xs"> Accueil </span>
        </router-link>
        <router-link
            :to="{ name: 'categories' }"
            class="flex items-center p-2 rounded transition-colors hover:bg-black/30"
        >
            <span class="mr-2 text-gray-300">
                <ListBulletIcon class="w-5" />
            </span>
            <span class="text-xs"> Catégorie </span>
        </router-link>
        <router-link
            :to="{ name: 'products' }"
            class="flex items-center p-2 rounded transition-colors hover:bg-black/30"
        >
            <span class="mr-2 text-gray-300">
                <ListBulletIcon class="w-5" />
            </span>
            <span class="text-xs"> Produits </span>
        </router-link>
        <router-link
            :to="{ name: 'dashboard' }"
            class="flex items-center p-2 rounded transition-colors hover:bg-black/30"
        >
            <span class="mr-2 text-gray-300">
                <ListBulletIcon class="w-5" />
            </span>
            <span class="text-xs"> Commandes </span>
        </router-link>
        <router-link
            :to="{ name: 'dashboard' }"
            class="flex items-center p-2 rounded transition-colors hover:bg-black/30"
        >
            <span class="mr-2 text-gray-300">
                <UsersIcon class="w-5" />
            </span>
            <span class="text-xs"> Utilisateurs </span>
        </router-link>
        <router-link
            :to="{ name: 'dashboard' }"
            class="flex items-center p-2 rounded transition-colors hover:bg-black/30"
        >
            <span class="mr-2 text-gray-300">
                <UsersIcon class="w-5" />
            </span>
            <span class="text-xs"> Clients </span>
        </router-link>
        <router-link
            :to="{ name: 'dashboard' }"
            class="flex items-center p-2 rounded transition-colors hover:bg-black/30"
        >
            <span class="mr-2 text-gray-300">
                <DocumentChartBarIcon class="w-5" />
            </span>
            <span class="text-xs"> Rapports </span>
        </router-link>
    </div>
</template>

<script setup>
import {
    HomeIcon,
    ListBulletIcon,
    UsersIcon,
    DocumentChartBarIcon,
} from "@heroicons/vue/24/outline";
</script>
