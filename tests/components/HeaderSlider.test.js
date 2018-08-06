import React from 'react'
import HeaderSlider from '../../src/components/HeaderSlider'

describe('<HeaderSlider />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<HeaderSlider />))
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
