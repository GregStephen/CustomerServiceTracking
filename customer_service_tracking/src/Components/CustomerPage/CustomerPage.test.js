import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomerPage from './CustomerPage';

Enzyme.configure({ adapter: new Adapter() });

describe('CustomerPage component', () => {
  test('renders', () => {
    const testUserObj = {
      businessName: '',
      firstName: '',
      lastName: '',
      admin: true,
    };

    const match = {
      params: {
        baseId: 1,
      },
    };
    const wrapper = shallow(<CustomerPage userObj={ testUserObj } authorized={ true } match={ match } />);
    expect(wrapper.exists()).toBe(true);
  });
});
