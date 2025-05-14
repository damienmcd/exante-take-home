import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('displays the Header of the app', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Exante Take-Home Assignment')
  })

  it('displays the Card title and subtitle', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Your Solar Irradiation')
    expect(wrapper.text()).toContain('Total expected solar energy this period')
  })
})
