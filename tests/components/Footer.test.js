import React from 'react'
import Footer from '../../src/components/Footer'
import { render } from '@testing-library/react'

describe('<Footer />', () => {
  test('should render correctly', () => {
    const { container } = render(<Footer />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
