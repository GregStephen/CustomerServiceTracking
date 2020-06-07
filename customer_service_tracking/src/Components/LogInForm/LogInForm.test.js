import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LogInForm from './LogInForm';

Enzyme.configure({ adapter: new Adapter() });

describe('LogInForm component', () => {
  test('renders', () => {
    const wrapper = shallow(<LogInForm loggingIn={() => {}} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('User email text is echoed', () => {
    const wrapper = shallow(<LogInForm loggingIn={() => {}}/>);
    wrapper.find('input#email').simulate('change', {
      target: { id: 'email', value: 'test@test.com' },
    });
    expect(wrapper.find('input#email').props().value).toEqual('test@test.com');
  });

  test('User password text is echoed', () => {
    const wrapper = shallow(<LogInForm loggingIn={() => {}}/>);
    wrapper.find('input#password').simulate('change', {
      target: { id: 'password', value: 'bestPassword' },
    });
    expect(wrapper.find('input#password').props().value).toEqual('bestPassword');
  });

  test('When the form is submitted the event is cancelled', () => {
    const wrapper = shallow(<LogInForm loggingIn={() => {}}/>);
    let prevented = false;
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {
        prevented = true;
      },
    });
    expect(prevented).toBe(true);
  });
});
