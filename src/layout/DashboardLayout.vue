<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <admin-navbar />
      <header-stats />
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <router-view />
        <footer-admin />
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, onUnmounted, computed, ref } from 'vue';
import { store } from "../store/indexStore";
import { mapState } from 'vuex';

import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";

const sidebarOpened  = ref(true);

const currentUser = computed(() => store.state.authModule.user.data);

const toggleSidebar = () => {
    sidebarOpened.value  = !sidebarOpened.value;
}

function updateSidebarState() {
  sidebarOpened.value = window.outerWidth > 768;
}

onMounted(() => {
  updateSidebarState();
  window.addEventListener('resize', updateSidebarState)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSidebarState)
})

</script>