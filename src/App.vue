<script setup>
import { useRouter } from "vue-router";
import Navigation from "./components/common/Navigation.vue";
import Home from "./components/views/Home.vue";
const router = useRouter();
</script>

<template>
  <div class="flex flex-col min-h-screen bg-weather-primary">
    <Navigation />
    <Home/>
    <router-view></router-view>
  </div>
</template>
