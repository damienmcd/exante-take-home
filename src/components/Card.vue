<script setup lang="ts">
import { ref } from 'vue'
import { AgGauge } from 'ag-charts-vue3'
import type { AgChartOptions } from 'ag-charts-types'
import 'ag-charts-enterprise'

const metricTotal: Ref<number> = ref(0)
const chartValue: Ref<number> = ref(102)

defineProps<{
  title?: string
  subtitle?: string
  unit?: string
  data?: object
  min?: string
  max?: string
  intervals?: string
  label?: string
  description?: string
}>()

// Chart Options
const options = ref<AgChartOptions>({
  type: 'radial-gauge',
  value: chartValue.value,
  label: {
    fontSize: 40,
    fontFamily: 'Inter',
    formatter({ value }) {
      return `${value.toFixed(0)}%`
    },
  },
  scale: {
    min: 90,
    max: 110,
    label: {
      formatter({ value }) {
        return `${value.toFixed(0)}%`
      },
      avoidCollisions: true,
    },
    fill: '#f5f6fa',
    interval: {
      values: [90, 100, 110],
    },
  },
  bar: {
    fill: '#1172ba',
  },
  targets: [
    {
      value: 100,
      shape: 'line',
      placement: 'middle',
      fill: 'black',
      size: 32,
      stroke: '#222222',
      strokeWidth: 3,
      rotation: 90,
    },
  ],
})
</script>

<template>
  <div class="card">
    <div class="card__header">
      <h2 class="card__header__title">{{ title }}</h2>
      <h3 class="card__header__subtitle">{{ subtitle }}</h3>
      <p class="card__header__total">{{ `${metricTotal} ${unit}` }}</p>
    </div>

    <AgGauge class="card__chart" :options="options" />

    <div class="card__footer">
      <h4 class="card__footer__label">{{ label }}</h4>
      <p class="card__footer__description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 550px;
  padding: 1rem 1rem 4rem;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.12);
  border-radius: 0.5rem;
}

.card__header {
  flex: 1 0 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: space-between;
}

.card__header__title {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.card__header__subtitle {
  color: var(--color-text-light);
}

.card__header__total {
  font-weight: 500;
}

.card__footer {
  flex: 1 0 100%;
  display: flex;
  flex-flow: column wrap;
  place-items: center;
  text-align: center;

  .card__footer__label {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .card__footer__description {
    max-width: 400px;
  }
}

.card__chart {
  width: 100%;
  height: 200px;
}

@media (min-width: 768px) {
  .card {
    padding: 2rem 2rem 4rem;
  }

  .card__chart {
    height: 280px;
  }
}
</style>
