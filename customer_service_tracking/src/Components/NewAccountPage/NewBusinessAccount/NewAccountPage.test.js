import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewAccountPage from './NewAccountPage';

Enzyme.configure({ adapter: new Adapter() });

describe('NewAccount component', () => {
  test('renders', () => {
    const wrapper = shallow(<NewAccountPage logIn={ () => {} } authorized={ true } />);
    expect(wrapper.exists()).toBe(true);
  });
});
