import React from 'react'
import Loader from '../../src/components/Loader'

describe('<Loader />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<Loader />))
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
