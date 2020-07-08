import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditSystemModal from './EditSystemModal';

Enzyme.configure({ adapter: new Adapter() });

describe('EditSystemModal component', () => {
  const testSystem = {
    id: 0,
    type: '',
    gallons: 0,
    inches: 0,
  };

  test('renders', () => {
    const wrapper = shallow(<EditSystemModal system={ testSystem } toggleModalOpen={ () => {} } editSystem={ () => {} } deleteSystem={ () => {} }/>);
    expect(wrapper.exists()).toBe(true);
  });
});
