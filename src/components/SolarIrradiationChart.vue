<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AgGauge } from 'ag-charts-vue3'
import type { AgChartOptions } from 'ag-charts-types'
import 'ag-charts-enterprise'

import { isAfter, isBefore, format, subMonths } from 'date-fns'

// Props
const props = defineProps<{
  policies?: object
  irradiation?: object
  min: number
  max: number
  intervals: Array<number>
}>()

// Labels
const title: Ref<string> = ref('Your Solar Irradiation')
const subtitle: Ref<string> = ref('Total expected solar energy this period:')
const label: Ref<string> = ref('Total Solar Irradiation')
const description: Ref<string> = ref(
  'The total expected solar energy this period is the sum of the solar energy for each day in the period.',
)

// Metrics
const metricTotal: Ref<number> = ref(0)
const unit: Ref<string> = ref('kWh')
const chartValue: Ref<number> = ref(102)

// Dates
const isActivePolicy: Ref<boolean> = ref(false)
const currentDate: Ref<Date> = ref(new Date())
const policyStartDate: Ref<Date> = ref(null)
const policyExpireDate: Ref<Date> = ref(null)

// Data
const totalIrradiation: Ref<number> = ref(0)
const actualValues: Ref<Array<any>> = ref([])
const expectedValues: Ref<Array<any>> = ref([])

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
    min: props.min,
    max: props.max,
    label: {
      formatter({ value }) {
        return `${value.toFixed(0)}%`
      },
      avoidCollisions: true,
    },
    fill: '#f5f6fa',
    interval: {
      values: [...props.intervals],
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

// Methods
const getTotalIrradiation = () => {
  // Get the last 6 months of data
  const last6Months = actualValues.value.filter((value) => {
    return isAfter(new Date(value.datetime), subMonths(new Date(policyExpireDate.value), 6))
  })

  // Get the total irradiation for the last 6 months
  totalIrradiation.value = last6Months.reduce(
    (acc, value) => acc + +Number.parseFloat(value.value).toFixed(4),
    0,
  )
  console.log('totalIrradiation', totalIrradiation.value)
}

onMounted(() => {
  actualValues.value = props?.irradiation?.parameters[0]?.actualValues
  expectedValues.value = props?.irradiation?.parameters[0]?.expectedValues

  // Get the policy start date
  if (props.policies?.policies[0]?.policyStartDate) {
    policyStartDate.value = new Date(props.policies.policies[0].policyStartDate)
  }

  // Get the policy end date
  if (
    actualValues.value.length > 0 &&
    Array.isArray(actualValues.value) &&
    props.policies?.policies[0]?.policyExpireDate
  ) {
    // Get the date of the last data point
    const lastDataPoint = actualValues.value.findLast((value) => value)

    // If the last data point is before the policy end date, use the last data point, otherwise use the policy end date
    policyExpireDate.value = isBefore(
      new Date(lastDataPoint.datetime),
      new Date(props.policies?.policies[0]?.policyExpireDate),
    )
      ? new Date(lastDataPoint.datetime)
      : new Date(props.policies?.policies[0]?.policyExpireDate)
  }

  if (props.policies?.policies[0]?.status && props.policies?.policies[0]?.status === 'ACTIVE') {
    isActivePolicy.value = true
  }

  getTotalIrradiation()
})
</script>

<template>
  <div class="card">
    <div class="card__header">
      <h2 v-if="title" class="card__header__title">{{ title }}</h2>
      <h3 v-if="subtitle" class="card__header__subtitle">
        {{ subtitle }}
      </h3>
      <p v-if="metricTotal && unit" class="card__header__total">{{ `${metricTotal} ${unit}` }}</p>
    </div>

    <AgGauge class="card__chart" :options="options" />

    <div class="card__footer">
      <h4 v-if="label" class="card__footer__label">{{ label }}</h4>
      <p v-if="description" class="card__footer__description">{{ description }}</p>
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
