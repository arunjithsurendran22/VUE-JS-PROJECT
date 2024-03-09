<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div>
    <!-- Your navigation header or sidebar goes here -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
/* Your global styles go here */
</style>
