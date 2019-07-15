import React from 'react'
import Header from '../../src/components/Header'
import { render } from '@testing-library/react'

describe('<Header />', () => {
  test('should render correctly', () => {
    const { container } = render(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
