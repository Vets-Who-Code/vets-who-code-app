import React from 'react'
import { render } from 'react-testing-library'
import StickyButton from '../../src/components/StickyButton'

describe('<StickyButton />', () => {
  test('should render correctly', () => {
    const { container } = render(<StickyButton />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
