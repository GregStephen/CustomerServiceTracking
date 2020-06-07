import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Customer from './Customer';

Enzyme.configure({ adapter: new Adapter() });

describe('Customer component', () => {
  const testCustomer = {
    id: '',
    firstName: '',
    lastName: '',
    officePhone: '',
    homePhone: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
    },
  };

  test('renders', () => {
    const wrapper = shallow(<Customer customer={ testCustomer } />);
    expect(wrapper.exists()).toBe(true);
  });
});
