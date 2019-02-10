import React from 'react'
import About from '../../src/pages/about'
import { render, fireEvent } from 'react-testing-library'

describe('<About />', () => {
  test('should invoke play method on click', async () => {
    const { container } = render(<About />)
    global.HTMLMediaElement.prototype.play = () => ({})
    const playButton = container.querySelector('.play-button')
    const animatedGif = container.querySelector('.vwc-animated-gif')

    expect(animatedGif.style.display).toBe('none')

    fireEvent.click(playButton)
    await (() => {
      expect(playButton.style.opacity).toBe("")
    })
  })

  test('should render correctly', () => {
    const { container } = render(<About />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
