import React from 'react'
import Header from '../../src/components/Header'
import { render } from 'react-testing-library'

describe('<Header />', () => {
  let wrapper

  beforeEach(() => wrapper = render(<Header />))

  test('should render correctly', () => {

    const { container } = wrapper;
    expect(container).toMatchSnapshot()
  })
})
