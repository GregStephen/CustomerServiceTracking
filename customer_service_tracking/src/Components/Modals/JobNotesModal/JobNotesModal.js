import React, { useState } from 'react';
import {
  ModalBody,
  Modal,
  ModalHeader,
  Button,
  ModalFooter,
} from 'reactstrap';

function JobNotesModal({
  note,
}) {
  const [isToggled, setIsToggled] = useState(false);

  return (<>
    <button className="btn btn-info" onClick={() => setIsToggled(true)}>{'View Notes'}</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>Job Notes</ModalHeader>
        <ModalBody>
        <p>{note}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Close</Button>
        </ModalFooter>
    </Modal>
  </>
  );
}

export default JobNotesModal;
