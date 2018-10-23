import React from 'react'
import Nav from '../../src/components/Nav'
import jQuery from '../../static/vendor/jquery/dist/jquery'
import { render } from 'react-testing-library'

describe('<Nav />', () => {
  let wrapper

  beforeEach(() => wrapper = render(<Nav />))

  test('should render correctly', () => {
    const { container } = wrapper
    expect(container.firstChild).toMatchSnapshot()
  })
})
