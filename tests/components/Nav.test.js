import React from 'react';
import Nav from '../../src/components/Nav';
import jQuery from '../../static/vendor/jquery/dist/jquery';

describe('<Nav />', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<Nav />));

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
