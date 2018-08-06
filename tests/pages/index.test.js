import React from 'react'
import IndexPaege from '../../src/pages/index'

describe('<IndexPaege />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<IndexPaege />))

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
