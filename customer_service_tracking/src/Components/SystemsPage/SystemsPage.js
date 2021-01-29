import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';

import { Page, Header, GlobalTable } from '../Global';
import EditSystemModal from '../Modals/EditSystemModal/EditSystemModal';

import { useDeleteSystemById, useEditSystem, useGetSystemsForBusiness } from '../../Helpers/Data/SystemRequests';

import './SystemsPage.scss';

function SystemsPage({ userObj }) {
  const systems = useGetSystemsForBusiness(userObj.businessId);
  const [editSystemModalIsOpen, getEditSystemModalIsOpen] = useState();
  const editTheSystem = useEditSystem();
  const deleteTheSystem = useDeleteSystemById();

  const tableData = useMemo(() => (systems?.data ? systems.data : []), [systems]);

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
  ], [editSystemModalIsOpen, deleteTheSystem, editTheSystem]);
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
            hidePagination={tableData.length < 10}
          />
        </div>
      </div>
    </Page>
  );
}

export default SystemsPage;
