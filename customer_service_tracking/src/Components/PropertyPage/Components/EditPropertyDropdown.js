import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import EditPropertyModal from '../../Modals/EditPropertyModal/EditPropertyModal';
import { useGetPropertyFromPropertyId, useUpdatePropertyStatus } from '../../../Helpers/Data/PropertyRequests';
import EditPropertyNameModal from '../../Modals/EditPropertyNameModal/EditPropertyNameModal';

const EditPropertyDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { propertyId } = useParams();
  const property = useGetPropertyFromPropertyId(propertyId);
  const updatePropertyStatus = useUpdatePropertyStatus();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [editPropNameIsToggled, setEditPropNameIsToggled] = useState(false);
  const [editPropAddressIsToggled, setEditPropAddressIsToggled] = useState(false);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="mr-4">
      <DropdownToggle caret color="dark">
      <i className="fas fa-edit"></i> Edit Property
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          onClick={() => setEditPropNameIsToggled(true)}>
          Name
          </DropdownItem>
        <EditPropertyNameModal
          property={property.data}
          isToggled={editPropNameIsToggled}
          setIsToggled={setEditPropNameIsToggled} />
        <DropdownItem
          onClick={() => setEditPropAddressIsToggled(true)}>
          Address
        </DropdownItem>
        <EditPropertyModal
          property={property.data}
          isToggled={editPropAddressIsToggled}
          setIsToggled={setEditPropAddressIsToggled} />
        <DropdownItem
            onClick={() => updatePropertyStatus.mutate(property.data)}>
            {property.data?.enabled ? 'Deactivate' : 'Activate'}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default EditPropertyDropdown;
