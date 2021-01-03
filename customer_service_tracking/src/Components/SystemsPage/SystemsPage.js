import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';

import { Page, Header, GlobalTable } from '../Global';
import EditSystemModal from '../Modals/EditSystemModal/EditSystemModal';

import SystemsRequests from '../../Helpers/Data/SystemRequests';

import './SystemsPage.scss';

function SystemsPage({ userObj }) {
  const [systems, getSystems] = useState();
  const [editSystemModalIsOpen, getEditSystemModalIsOpen] = useState();

  useEffect(() => {
    SystemsRequests.getSystemsForBusiness(userObj.businessId)
      .then((systemsReturned) => getSystems(systemsReturned))
      .catch((err) => console.error(err));
  });

  const editTheSystem = (updatedSystem) => {
    SystemsRequests.editSystem(updatedSystem)
      .then(() => this.getAllSystems())
      .catch((err) => console.error(err));
  };

  const deleteTheSystem = (systemId) => {
    SystemsRequests.deleteSystemById(systemId)
      .then(() => this.getAllSystems())
      .catch((err) => console.error(err));
  };

  const tableData = useMemo(() => (systems || []), [systems]);

  const tableColumns = useMemo(() => [
    {
      Header: 'System Type',
      accessor: (s) => s.type,
    },
    {
      Header: 'Gallons',
      accessor: (s) => s.gallons,
    },
    {
      Header: 'Inches',
      accessor: (s) => s.inches,
    },
    {
      Header: 'Edit',
      accessor: (s) => s.id,
      Cell: ({ row: { original } }) => (
        <>
          <button className="btn btn-info" onClick={() => getEditSystemModalIsOpen(!editSystemModalIsOpen)}>Edit</button>
          <Modal isOpen={editSystemModalIsOpen} toggle={() => getEditSystemModalIsOpen(!editSystemModalIsOpen)}>
            <ModalHeader toggle={() => getEditSystemModalIsOpen(!editSystemModalIsOpen)}>Edit System</ModalHeader>
            <EditSystemModal
              toggleModalOpen={getEditSystemModalIsOpen}
              modalIsOpen={editSystemModalIsOpen}
              system={original}
              editSystem={editTheSystem}
              deleteSystem={deleteTheSystem}
            />
          </Modal>
        </>
      ),
    },
  ], [editSystemModalIsOpen]);
  return (
    <Page>
      <div className="SystemsPage">
        <Header title="Systems" />
        <div className="d-flex justify-content-end">
          <Link className="btn btn-info mr-4 mb-4" to={'/new-system'}>Create a New System</Link>
        </div>
        <div className="widget col-10">
          <GlobalTable
            columns={tableColumns}
            data={tableData}
          />
        </div>
      </div>
    </Page>
  );
}

export default SystemsPage;
