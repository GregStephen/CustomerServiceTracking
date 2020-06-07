import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomersPage from './CustomersPage';

Enzyme.configure({ adapter: new Adapter() });

describe('CustomersPage component', () => {
  const testUserObj = {
    businessName: '',
    firstName: '',
    lastName: '',
    admin: true,
  };

  test('renders', () => {
    const wrapper = shallow(<CustomersPage userObj={ testUserObj } authorized={ true } />);
    expect(wrapper.exists()).toBe(true);
  });
});
