<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="conatainer flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink to="/">
          <div class="flex items-center gap-3 flex-1">
            <i class="fa-regular fa-sun text-2xl"></i>
            <p class="text-2xl">Weather</p>
          </div>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';

</script>
