<template>
  <Suspense>
    <AsyncCityView />
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncCityView = defineAsyncComponent(() => import('../common/AsyncCityView.vue'))

</script>
