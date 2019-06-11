import React from 'react'
import Header from '../../src/components/Header'
import { render, fireEvent } from 'react-testing-library'

describe('<Header />', () => {
  test('should render correctly', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should update slide on click', () => {
    const { container } = render(<Header />)
    const nextButton = container.querySelector('.flex-next')
    fireEvent.click(nextButton)
    expect(container).toMatchSnapshot()
  })

  test('should update slide on click', () => {
    const { container } = render(<Header />)
    const prevButton = container.querySelector('.flex-prev')
    fireEvent.click(prevButton)
    expect(container).toMatchSnapshot()
  })

  test('should render correctly', () => {
    const { container } = render(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
