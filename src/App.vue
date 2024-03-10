<script setup>
import { useRouter } from "vue-router";
import Navigation from "./components/common/Navigation.vue";
const router = useRouter();
</script>

<template>
  <div class="flex flex-col min-h-screen bg-weather-primary">
    <Navigation />
    <router-view/>
  </div>
</template>
