import React from 'react'
import HeaderSlider from '../../src/components/HeaderSlider'
import { render, fireEvent } from 'react-testing-library'

describe('<HeaderSlider />', () => {
  test('should update slide on click', () => {
    const { container } = render(<HeaderSlider />)
    const nextButton = container.querySelector('.flex-next')
    fireEvent.click(nextButton)
    expect(container).toMatchSnapshot()
  })

  test('should update slide on click', () => {
    const { container } = render(<HeaderSlider />)
    const prevButton = container.querySelector('.flex-prev')
    fireEvent.click(prevButton)
    expect(container).toMatchSnapshot()
  })

  test('should render correctly', () => {
    const { container } = render(<HeaderSlider />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
