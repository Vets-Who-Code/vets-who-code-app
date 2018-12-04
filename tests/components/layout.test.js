import React from 'react'
import TemplateWrapper from '../../src/components/layout'
import { render } from 'react-testing-library'

describe('<Layout />', () => {
  test('should render correctly', () => {
    const { container } = render(<TemplateWrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
