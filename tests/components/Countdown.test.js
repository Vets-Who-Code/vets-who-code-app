import React from 'react';
import Countdown from '../../src/components/Countdown';

jest.useFakeTimers();

describe('<Countdown />', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(
    <Countdown />
  ));

  test('should set interval to a number that can be tracked in local state', () => {
    wrapper.setState({
      interval: null
    });
    wrapper.instance().componentDidMount();
    const result = wrapper.state('interval');
    expect(result).toBe(2);
  });

  test('should call stopCountDown when componentWillUnmount', () => {
    const spy = jest.spyOn(wrapper.instance(), 'stopCountDown');
    wrapper.instance().componentWillUnmount();
    expect(spy).toHaveBeenCalled();
  });

  test('should update state when getTimeRemaining is invoked', () => {
    wrapper.instance().getTimeRemaining();
    expect(wrapper.state('days')).not.toBe(null);
    expect(wrapper.state('hours')).not.toBe(null);
    expect(wrapper.state('minutes')).not.toBe(null);
    expect(wrapper.state('seconds')).not.toBe(null);
  });


  test('should clear interval when stopCountDown is invoked', () => {
    wrapper.instance().stopCountDown();
    expect(clearInterval).toHaveBeenCalledWith(expect.any(Number));
  });

  test('should render correctly', () => {
    wrapper.setState({
      days: 1,
      hours: 1,
      minutes: 27,
      seconds: 30
    });
    expect(wrapper).toMatchSnapshot();
  });
});
