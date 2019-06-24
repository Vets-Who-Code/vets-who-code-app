import React from 'react'
import About from '../../src/pages/about'
import { render } from '@testing-library/react'

describe('<About />', () => {
  test('should render correctly', () => {
    const { container } = render(<About />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
