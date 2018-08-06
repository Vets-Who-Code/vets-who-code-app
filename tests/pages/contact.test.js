import React from 'react'
import Contact from '../../src/pages/contact'


describe('<Contact />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<Contact />))

  test.skip('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
