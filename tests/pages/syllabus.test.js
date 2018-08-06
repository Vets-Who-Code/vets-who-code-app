import React from 'react'
import Syllabus from '../../src/pages/syllabus'

describe('<Syllabus />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<Syllabus />))

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
