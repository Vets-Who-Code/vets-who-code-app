import React from 'react'
import { FormAlert } from '../../../src/components/Forms'
import { render } from '@testing-library/react'

describe('<FormAlert>', () => {
  test('should render generic error message for a required field', () => {
    const { container } = render(<FormAlert />)
    expect(container.textContent).toContain('Field is required')
  })

  test('should render specific error message for a required field', () => {
    const { container } = render(<FormAlert errorMessage="Please input a valid email" />)
    expect(container.textContent).toContain('Please input a valid email')
  })
})
