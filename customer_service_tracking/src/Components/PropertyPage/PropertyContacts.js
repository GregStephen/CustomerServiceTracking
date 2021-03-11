import React from 'react';
import { Link } from 'react-router-dom';
import EditContactModal from '../Modals/EditContactModal/EditContactModal';
import { Header } from '../Global';
import ContactCard from './ContactCard';

function PropertyContacts({ property }) {
  return (
    <div className="widget col-10 mb-4 mr-0 ml-0 mt-0 pt-0">
      <Header title="Contacts" icon="fas fa-address-card" />
      <div className="d-flex justify-content-end">
        <EditContactModal contact={null}/>
        {false && <Link className="btn btn-info mr-4 mb-2" to={`/new-contact/${property.id}`}>Create a New Contact</Link>}
      </div>
      <div className="d-flex justify-content-start">
          {property.contacts.map((contact) => (
            <ContactCard contact={contact} />
          ))}
        </div>
    </div>
  );
}

export default PropertyContacts;
