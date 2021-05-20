import React, { useContext } from 'react';
import EditContactModal from '../Modals/EditContactModal/EditContactModal';
import { Header } from '../Global';
import ContactCard from './Components/ContactCard';
import UserContext from '../../Contexts/UserContext';

function PropertyContacts({ property }) {
  const user = useContext(UserContext);
  return (
    <div className="widget col-10 mb-4 mr-0 ml-0 mt-0 pt-0">
      <Header title="Contacts" icon="fas fa-address-card" />
      {user.admin
        && <div className="d-flex justify-content-end">
          <EditContactModal contact={null} />
        </div>
      }
      <div className="d-flex justify-content-center row">
        {property.contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} deleteEnabled={property.contacts.length > 1} />
        ))}
      </div>
    </div>
  );
}

export default PropertyContacts;
