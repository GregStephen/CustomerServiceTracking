import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditCustomerModal from './EditCustomerModal';

Enzyme.configure({ adapter: new Adapter() });

describe('EditCustomerModal component', () => {
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
    const wrapper = shallow(<EditCustomerModal customer={ testCustomer } toggleModalOpen={ () => {} } updateCustomer={ () => {} }/>);
    expect(wrapper.exists()).toBe(true);
  });
});
