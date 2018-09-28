import React from 'react'
import TemplateWrapper from '../../src/components/layout'

describe('<Layout />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<TemplateWrapper />)
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
