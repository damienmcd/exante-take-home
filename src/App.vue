<script setup lang="ts">
import { useFavicon } from '@vueuse/core'
import AppHeader from './components/AppHeader.vue'
import SolarIrradiationChart from './components/SolarIrradiationChart.vue'

import policies from './data/policies.json'
import irradiation from './data/irradiation.json'

const icon: Ref<string> = useFavicon()
icon.value = '/favicon.png'
</script>

<template>
  <AppHeader />

  <main>
    <div class="container">
      <div class="cards">
        <SolarIrradiationChart
          :policies="policies"
          :irradiation="irradiation"
          :min="90"
          :max="110"
          :intervals="[90, 100, 110]"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.cards {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
}
</style>
