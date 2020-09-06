import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewReportPage from './NewReportPage';

Enzyme.configure({ adapter: new Adapter() });

describe('NewReportPage component', () => {
  const testUserObj = {
    businessName: '',
    firstName: '',
    lastName: '',
    admin: true,
  };

  test('renders', () => {
    const wrapper = shallow(<NewReportPage userObj={ testUserObj } authorized={ true } />);
    expect(wrapper.exists()).toBe(true);
  });
});
