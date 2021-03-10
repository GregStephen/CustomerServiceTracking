import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import EditContactModal from '../Modals/EditContactModal/EditContactModal';

function ContactCard({ contact }) {
  return (
    <div className="col-12">
      <Card body>
        <CardHeader>
          <div className="d-flex align-items-baseline">
            {contact.primary && <i className="mr-1 fas fa-star" />}
            <h6 className="ml-2">{contact.firstName} {contact.lastName}</h6>
            <div className="ml-auto d-flex justify-content-end align-items-baseline">
              <EditContactModal contact={contact} />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {contact.email?.length > 0 && <p><i className="fas fa-envelope" /><a href={`mailto:${contact.email}`}>{contact.email}</a></p>}
          {contact.homePhone?.length > 0 && <p><i className="fas fa-phone" />H: <a href={`tel:${contact.homePhone}`}>{contact.homePhone}</a></p>}
          {contact.cellPhone?.length > 0 && <p><i className="fas fa-mobile-alt" />C: <a href={`tel:${contact.cellPhone}`}>{contact.cellPhone}</a></p>}
          {contact.workPhone?.length > 0 && <p><i className="fas fa-phone" />W: <a href={`tel:${contact.workPhone}`}>{contact.workPhone}</a></p>}
        </CardBody>
      </Card>
    </div>
  );
}

export default ContactCard;
