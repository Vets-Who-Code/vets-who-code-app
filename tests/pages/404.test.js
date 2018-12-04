import React from 'react'
import NotFoundPage from '../../src/pages/404'
import { render } from 'react-testing-library'

describe('<NotFoundPage />', () => {

  test('should render correctly', () => {
    const { container } = render(<NotFoundPage />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
