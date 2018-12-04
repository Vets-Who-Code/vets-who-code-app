import React from 'react'
import Footer from '../../src/components/Footer'
import { render } from 'react-testing-library'

describe('<Footer />', () => {
  test('should render correctly', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot()
  })

})
