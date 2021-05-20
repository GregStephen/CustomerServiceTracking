import React, { useContext } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import UserContext from '../../../Contexts/UserContext';
import Formatting from '../../../Helpers/Functions/Formatting';
import EditContactModal from '../../Modals/EditContactModal/EditContactModal';

interface Props {
  contact: Property.Contact;
  deleteEnabled: boolean;
}
function ContactCard({ contact, deleteEnabled }: Props) {
  const user = useContext(UserContext);
  return (
    <div className="col-10 mb-2">
      <Card body>
        <CardHeader>
          <div className="d-flex align-items-baseline">
            {contact.primary && <i className="mr-1 fas fa-star" />}
            <h6 className="ml-2">{contact.firstName} {contact.lastName}</h6>
            {user.admin
              && <div className="ml-auto d-flex justify-content-end align-items-baseline">
                <EditContactModal contact={contact} deleteEnabled={deleteEnabled} />
              </div>
            }
          </div>
        </CardHeader>
        <CardBody>
          {contact?.email && contact?.email?.length > 0 && <p><i className="fas fa-envelope" /><a href={`mailto:${contact.email}`}>{contact.email}</a></p>}
          {contact?.homePhone && contact?.homePhone?.length > 0 && <p><i className="fas fa-phone" />H: <a href={`tel:${contact.homePhone}`}>{Formatting.formatPhoneNumber(contact.homePhone)}</a></p>}
          {contact?.cellPhone && contact?.cellPhone?.length > 0 && <p><i className="fas fa-mobile-alt" /> C: <a href={`tel:${contact.cellPhone}`}>{Formatting.formatPhoneNumber(contact.cellPhone)}</a></p>}
          {contact?.workPhone && contact?.workPhone?.length > 0 && <p><i className="fas fa-phone" />W: <a href={`tel:${contact.workPhone}`}>{Formatting.formatPhoneNumber(contact.workPhone)}</a></p>}
        </CardBody>
      </Card>
    </div>
  );
}

export default ContactCard;
