import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationBar from './NavigationBar';

Enzyme.configure({ adapter: new Adapter() });

describe('NaviagationBar component', () => {
  const testUserObj = {
    businessName: '',
    firstName: '',
    lastName: '',
    admin: true,
  };

  test('renders', () => {
    const wrapper = shallow(<NavigationBar userObj={ testUserObj } authorized={ true } />);
    expect(wrapper.exists()).toBe(true);
  });
});