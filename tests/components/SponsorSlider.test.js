import React from 'react'
import SponsorSlider from '../../src/components/SponsorSlider'

describe('<SponsorSlider />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<SponsorSlider />))
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
