import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppHeader from '../AppHeader.vue'

describe('AppHeader', () => {
  it('displays the Header of the app', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.text()).toContain('Exante Take-Home Assignment')
  })
})
