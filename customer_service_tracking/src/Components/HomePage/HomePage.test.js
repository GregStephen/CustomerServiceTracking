import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from './HomePage';

Enzyme.configure({ adapter: new Adapter() });

describe('HomePage component', () => {
  const testUserObj = {
    businessName: '',
    firstName: '',
    lastName: '',
    admin: true,
  };

  test('renders', () => {
    const wrapper = shallow(<HomePage userObj={ testUserObj } authorized={ true } />);
    expect(wrapper.exists()).toBe(true);
  });
});
