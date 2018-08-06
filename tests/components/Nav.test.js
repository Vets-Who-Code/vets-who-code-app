import React from 'react'
import Nav from '../../src/components/Nav'
import jQuery from '../../static/vendor/jquery/dist/jquery'

describe('<Nav />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<Nav />))

  test.skip('should add class name when window scrolled down by 1px', () => {
    // global.$ = jest.fn().mockImplementation(() =>({
    //   scrollTop: jest.fn(),
    //   removeClass: jest.fn(),
    //   blur: jest.fn()
    // }))
    global.$ = global.jQuery = $
    global.scrollTo = 50
    global.dispatchEvent(new Event('scroll'))
    console.log(wrapper.debug())
    expect(wrapper.find('nav').hasClass('navbar-solid')).toBe(true)
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
