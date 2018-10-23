import React from 'react'
import Footer from '../../src/components/Footer'
import { render } from 'react-testing-library'

describe('<Footer />', () => {
  let wrapper

  beforeEach(() => wrapper = render(<Footer />))

  test('should render correctly', () => {
    const { container } = wrapper;
    expect(container.firstChild).toMatchSnapshot()
  })

})
