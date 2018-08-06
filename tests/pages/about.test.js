import React from 'react'
import About from '../../src/pages/about'
import jQuery from '../../static/vendor/jquery/dist/jquery'

describe('<About />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<About />)
    global.$ = global.jQuery = $
  })

  test.skip('should invoke play method on click', () => {
    const spy = jest.spyOn(wrapper.instance(), 'play')
    wrapper.find('.play-button').simulate('click')
    expect(spy).toHaveBeenCalled()
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})