import React from 'react'
import Donate from '../../src/pages/donate'
import { render } from '@testing-library/react'

describe('<Donate />', () => {
  test('should render correctly', () => {
    const { container } = render(<Donate />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
