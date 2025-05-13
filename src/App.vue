<script setup lang="ts">
import { useFavicon } from '@vueuse/core'
import Header from './components/Header.vue'
import Card from './components/Card.vue'

const icon: Ref<string> = useFavicon()
icon.value = '/favicon.png'
</script>

<template>
  <Header />

  <main>
    <div class="container">
      <div class="cards">
        <Card
          title="Your Solar Irradiation"
          subtitle="Total expected solar energy this period:"
          unit="kWh"
          :data="{}"
          min="90"
          max="100"
          intervals="1"
          label="Total Solar Irradiation"
          description="Since 16th August 2023, your panels have received 102% of the total expected sun."
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
