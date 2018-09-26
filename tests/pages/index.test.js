import React from 'react';
import IndexPaege from '../../src/pages/index';

describe('<IndexPaege />', () => {
  let wrapper;


  beforeEach(() => wrapper = shallow(<IndexPaege />));

  test('should update email property in state onChange', () => {
    const expected = 'someuser@mail.com';
    const mockEvent = {
      target: {
        name: 'email',
        value: expected
      }
    };
    wrapper.instance().handleInputChange(mockEvent);
    expect(wrapper.state('email')).toEqual(expected);
  });

  test('should call window.fetch when handleUserSubscribe is invoked', () => {
    const mockEvent = {
      preventDefault: jest.fn()
    };

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve());

    wrapper.instance().handleUserSubscribe(mockEvent);
    expect(window.fetch).toHaveBeenCalled();
  });


  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
