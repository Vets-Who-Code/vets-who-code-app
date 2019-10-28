import React from 'react'
import Syllabus from '../../src/pages/syllabus'
import { render } from '@testing-library/react'

describe('<Syllabus />', () => {
  test('should render correctly', () => {
    const { container } = render(<Syllabus />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
