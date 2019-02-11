import React from 'react'
import About from '../../src/pages/about'
import { render, fireEvent, wait } from 'react-testing-library'

describe('<About />', () => {
  test('should render correctly', () => {
    const { container } = render(<About />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
