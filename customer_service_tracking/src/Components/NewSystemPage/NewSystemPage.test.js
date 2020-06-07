import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewSystemPage from './NewSystemPage';

Enzyme.configure({ adapter: new Adapter() });

describe('NewSystemPage component', () => {
  const testUserObj = {
    businessName: '',
    firstName: '',
    lastName: '',
    admin: true,
  };

  test('renders', () => {
    const wrapper = shallow(<NewSystemPage userObj={ testUserObj } authorized={ true } />);
    expect(wrapper.exists()).toBe(true);
  });
});
