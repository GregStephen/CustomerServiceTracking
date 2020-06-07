import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SystemsPage from './SystemsPage';

Enzyme.configure({ adapter: new Adapter() });

describe('SystemsPage component', () => {
  const testUserObj = {
    businessName: '',
    firstName: '',
    lastName: '',
    admin: true,
  };

  test('renders', () => {
    const wrapper = shallow(<SystemsPage
      userObj={ testUserObj }
      authorized={ true} />);
    expect(wrapper.exists()).toBe(true);
  });
});
