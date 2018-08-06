import React from 'react'
import Footer from '../../src/components/Footer'

describe('<Footer />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<Footer />))

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

})
