import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPage from './LandingPage';

Enzyme.configure({ adapter: new Adapter() });

describe('LandingPage component', () => {
  test('renders', () => {
    const wrapper = shallow(<LandingPage authorized={ false } logIn={() => {}} />);
    expect(wrapper.exists()).toBe(true);
  });
});
