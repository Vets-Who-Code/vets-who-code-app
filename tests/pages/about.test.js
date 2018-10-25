import React from 'react'
import About from '../../src/pages/about'
import jQuery from '../../static/vendor/jquery/dist/jquery'
import { render, fireEvent } from 'react-testing-library'

describe('<About />', () => {
  // test('should invoke play method on click', async () => {
  //   const { container } = render(<About />)
  //   global.HTMLMediaElement.prototype.play = () => ({})
  //   const playButton = container.querySelector('.play-button')
  //   const animatedGif = container.querySelector('.vwc-animated-gif')

  //   expect(animatedGif.style.display).toBe('none')

  //   fireEvent.click(playButton)
  //   await (() => {
  //     expect(playButton.style.opacity).toBe("")
  //   })
  //   const pauseStub = jest
  //     .spyOn(window.HTMLMediaElement.prototype, 'pause')
  //     .mockImplementation(() => {})
  //   const wrapper = render(<About />);
  //   // trigger the code that you would expect to call the pause function
  //   expect(pauseStub).toHaveBeenCalled()
  //   pauseStub.mockRestore()
  // })

  test('should render correctly', () => {
    const { container, debug } = render(<About />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
