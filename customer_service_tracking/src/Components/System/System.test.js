import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import System from './System';

Enzyme.configure({ adapter: new Adapter() });

describe('System component', () => {
  const testSystem = {
    type: '',
    gallons: 0,
    inches: 0,
  };

  test('renders', () => {
    const wrapper = shallow(<System
      system={ testSystem }
      deleteTheSystem={ () => {} }
      editTheSystem={ () => {} } />);
    expect(wrapper.exists()).toBe(true);
  });
});
