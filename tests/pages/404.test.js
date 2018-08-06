import React from 'react'
import NotFoundPage from '../../src/pages/404'

describe('<NotFoundPage />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<NotFoundPage />))

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
