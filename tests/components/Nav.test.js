import React from 'react'
import Nav from '../../src/components/Nav'
import { render } from 'react-testing-library'

describe('<Nav />', () => {
  test('should render correctly', () => {
    const { container } = render(<Nav />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
