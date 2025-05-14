import { describe, it, expect } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import SolarIrradiationChart from '../SolarIrradiationChart.vue'

// Test Data
import policies from '../../data/testdata/policies.json'
import policiesInactive from '../../data/testdata/policies-inactive.json'
import irradiation from '../../data/testdata/irradiation.json'
import irradiationAbove100Percent from '../../data/testdata/irradiation-above-100-percent.json'

describe('SolarIrradiationChart for ACTIVE Policy', () => {
  it('displays the title and subtitle', () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policies,
        irradiation: irradiation,
        min: 80,
        max: 120,
        intervals: [80, 100, 120],
      },
    })
    expect(wrapper.text()).toContain('Your Solar Irradiation')
    expect(wrapper.text()).toContain('Total expected solar energy this period')
  })

  it('displays the total expected solar energy', async () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policies,
        irradiation: irradiation,
        min: 80,
        max: 120,
        intervals: [80, 100, 120],
      },
    })

    await flushPromises()
    expect(wrapper.text()).toContain('521,578 KWh')
  })

  it('displays the summary of energy received', async () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policies,
        irradiation: irradiation,
        min: 80,
        max: 120,
        intervals: [80, 100, 120],
      },
    })

    await flushPromises()
    expect(wrapper.text()).toContain(
      'Since 15th August 2023, your panels have received 81% of the total expected sun.',
    )
  })

  it('displays the chart', () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policies,
        irradiation: irradiation,
        min: 80,
        max: 120,
        intervals: [80, 100, 120],
      },
    })
    expect(wrapper.find('.card__chart').exists()).toBe(true)
  })

  it('displays the loading message', () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policies,
        irradiation: irradiation,
        min: 80,
        max: 120,
        intervals: [80, 100, 120],
      },
    })
    expect(wrapper.text()).toContain('Loading Data')
  })
})

describe('SolarIrradiationChart for INACTIVE Policy', () => {
  it('displays the title and subtitle', () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policiesInactive,
        irradiation: irradiation,
        min: 90,
        max: 110,
        intervals: [90, 100, 110],
      },
    })
    expect(wrapper.text()).toContain('Your Solar Irradiation')
    expect(wrapper.text()).not.toContain('Total expected solar energy this period')
  })

  it('displays the total expected solar energy', async () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policiesInactive,
        irradiation: irradiation,
        min: 90,
        max: 110,
        intervals: [90, 100, 110],
      },
    })

    await flushPromises()
    expect(wrapper.text()).not.toContain('521,578 KWh')
  })

  it('displays the summary of energy received', async () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policiesInactive,
        irradiation: irradiation,
        min: 90,
        max: 110,
        intervals: [90, 100, 110],
      },
    })

    await flushPromises()
    expect(wrapper.text()).not.toContain(
      'Since 15th August 2023, your panels have received 81% of the total expected sun.',
    )
  })

  it('displays the chart', () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policiesInactive,
        irradiation: irradiation,
        min: 90,
        max: 110,
        intervals: [90, 100, 110],
      },
    })
    expect(wrapper.find('.card__chart').exists()).toBe(true)
  })

  it('displays the loading message', () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policiesInactive,
        irradiation: irradiation,
        min: 90,
        max: 110,
        intervals: [90, 100, 110],
      },
    })
    expect(wrapper.text()).not.toContain('Loading Data')
  })

  it('displays the inactive policy message', () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policiesInactive,
        irradiation: irradiation,
        min: 90,
        max: 110,
        intervals: [90, 100, 110],
      },
    })
    expect(wrapper.text()).toContain(
      'No active policy. Please contact your account manager to activate a new policy.',
    )
  })
})

describe('SolarIrradiationChart for Irradiation above 100%', () => {
  it('displays the title and subtitle', () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policies,
        irradiation: irradiationAbove100Percent,
        min: 90,
        max: 110,
        intervals: [90, 100, 110],
      },
    })
    expect(wrapper.text()).toContain('Your Solar Irradiation')
    expect(wrapper.text()).toContain('Total expected solar energy this period')
  })

  it('displays the summary of energy received', async () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policies,
        irradiation: irradiationAbove100Percent,
        min: 90,
        max: 110,
        intervals: [90, 100, 110],
      },
    })

    await flushPromises()
    expect(wrapper.text()).toContain(
      'Since 15th August 2023, your panels have received 104% of the total expected sun.',
    )
  })

  it('displays the chart', () => {
    const wrapper = mount(SolarIrradiationChart, {
      props: {
        policies: policies,
        irradiation: irradiationAbove100Percent,
        min: 90,
        max: 110,
        intervals: [90, 100, 110],
      },
    })
    expect(wrapper.find('.card__chart').exists()).toBe(true)
  })
})
