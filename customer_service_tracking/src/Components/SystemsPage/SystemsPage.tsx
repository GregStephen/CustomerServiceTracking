import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';
import { Column } from 'react-table';
import { Page, Header, GlobalTable } from '../Global';
import EditSystemModal from '../Modals/EditSystemModal';

import { useDeleteSystemById, useEditSystem, useGetSystemsForBusiness } from '../../Helpers/Data/SystemRequests';

import './SystemsPage.scss';
import UserContext from '../../Contexts/UserContext';

function SystemsPage() {
  const userObj = useContext(UserContext);
  const systems = useGetSystemsForBusiness(userObj.businessId);
  const [editSystemModalIsOpen, getEditSystemModalIsOpen] = useState(false);
  const editTheSystem = useEditSystem();
  const deleteTheSystem = useDeleteSystemById();

  const tableData = useMemo(() => (systems?.data ? systems.data : []), [systems]);

  const tableColumns: Column<Business.BusinessSystem>[] = useMemo(() => [
    {
      Header: 'System Type',
      accessor: 'type',
    },
    {
      Header: 'Gallons',
      accessor: 'gallons',
    },
    {
      Header: 'Inches',
      accessor: 'inches',
    },
    {
      Header: 'Edit',
      accessor: 'id',
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
      <div className="widget col-10 mt-4">
        <Header title="Systems" />
        <div className="d-flex justify-content-end">
          <Link className="btn btn-info mr-4 mb-4" to='/new-system'>Create a New System</Link>
        </div>
        <GlobalTable
          columns={tableColumns}
          data={tableData}
          hidePagination={tableData.length < 10}
        />
      </div>
    </Page>
  );
}

export default SystemsPage;
