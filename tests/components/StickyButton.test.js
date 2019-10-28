import React from 'react'
import { render } from '@testing-library/react'
import StickyButton from '../../src/components/StickyButton'

describe('<StickyButton />', () => {
  test('should render correctly', () => {
    const { container } = render(<StickyButton />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
