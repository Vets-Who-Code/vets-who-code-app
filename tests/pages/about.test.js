import React from 'react';
import About from '../../src/pages/about';
import jQuery from '../../static/vendor/jquery/dist/jquery';

describe('<About />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<About />);
  });

  test.skip('should invoke play method on click', () => {
    wrapper.find('.play-button').simulate('click');
    const spy = jest.spyOn(wrapper.instance(), 'play');
    // global.HTMLMediaElement.prototype.play = () => ({});
    // wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalled();
  });

  test('should invoke end method when video completes', () => {
    const spy = jest.spyOn(wrapper.instance(), 'end');
    window.HTMLMediaElement.prototype.end = wrapper.instance().end();
    expect(spy).toHaveBeenCalled();
  });

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
