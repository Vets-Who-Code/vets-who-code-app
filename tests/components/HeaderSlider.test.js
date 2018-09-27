import React from 'react';
import HeaderSlider from '../../src/components/HeaderSlider';

describe('<HeaderSlider />', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<HeaderSlider />));

  test('should call slickNext when next method is invoked', () => {
    wrapper = mount(<HeaderSlider />);
    wrapper.instance().next();
    wrapper.instance().forceUpdate();
    expect(wrapper.instance().slider.slickNext).toHaveBeenCalled();
  });

  test('should call slickPrev when previous method is invoked', () => {
    wrapper = mount(<HeaderSlider />);
    wrapper.instance().previous();
    wrapper.instance().forceUpdate();
    expect(wrapper.instance().slider.slickPrev).toHaveBeenCalled();
  });
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
