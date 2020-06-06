import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LogInForm from './LogInForm';

Enzyme.configure({ adapter: new Adapter() });

describe('LogInForm component', () => {
  test('renders', () => {
    const wrapper = shallow(<LogInForm />);

    expect(wrapper.exists()).toBe(true);
  });
});
