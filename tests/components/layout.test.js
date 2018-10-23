import React from 'react'
import TemplateWrapper from '../../src/components/layout'
import { render } from 'react-testing-library'

describe('<Layout />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = render(<TemplateWrapper />)
  })

  test('should render correctly', () => {
    const { container } = wrapper
    expect(container.firstChild).toMatchSnapshot()
  })
})
