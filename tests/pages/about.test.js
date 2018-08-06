import React from 'react'
import About from '../../src/pages/about'
import jQuery from '../../static/vendor/jquery/dist/jquery'

describe('<About />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<About />)
    global.$ = global.jQuery = $
  })

  test('should invoke play method on click', () => {
    wrapper = mount(<About />)

    global.HTMLMediaElement.prototype.play = () => ({})
    const spy = jest.spyOn(wrapper.instance(), 'play')
    wrapper.instance().forceUpdate()
    wrapper.find('.play-button').simulate('click')
    expect(spy).toHaveBeenCalled()
  })

  test('should invoke end method when video completes', () => {
    wrapper = mount(<About />)
    const spy = jest.spyOn(wrapper.instance(), 'end')
    window.HTMLMediaElement.prototype.end = wrapper.instance().end()
    wrapper.instance().forceUpdate()
    expect(spy).toHaveBeenCalled()
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})