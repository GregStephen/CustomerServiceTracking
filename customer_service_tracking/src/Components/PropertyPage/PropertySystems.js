import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// import {
//   Modal,
//   ModalHeader,
// } from 'reactstrap';

import { Header, GlobalTable } from '../Global';
// import DeleteCustomerSystemModal from '../Modals/DeleteCustomerSystemModal/DeleteCustomerSystemModal';

function PropertySystems({ property, deleteThisPropertySystem }) {
  // const [deleteCustomerSystemModalIsOpen, getDeleteCustomerSystemModalIsOpen] = useState();
  const addSystemLink = `/add-system-to-property/${property.id}`;

  // const deleteTheSystem = (systemId) => {
  //   deleteThisCustomerSystem(systemId);
  // };

  const tableData = useMemo(() => (property.systems || []), [property.systems]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Install Date',
      accessor: (s) => moment(s.installDate).format('L'),
    },
    {
      Header: 'Serial Number',
      accessor: (s) => s.serialNumber,
    },
    {
      Header: 'Owned or Leased',
      accessor: (s) => s.sold,
      Cell: ({ row: { original } }) => (
        original.sold ? 'Owned' : 'Leased'
      ),
    },
    {
      Header: 'Nozzles',
      accessor: (s) => s.nozzles,
    },
    {
      Header: 'Spray Cycles',
      accessor: (s) => s.sprayCycles,
    },
    {
      Header: 'Spray Duration',
      accessor: (s) => s.sprayDuration,
    },
    {
      Header: 'Edit',
      accessor: (s) => s.id,
      Cell: ({ row: { original } }) => (
        <Link className="btn btn-info" tag={Link} to={`/edit-property-system/${original.id}`}>Change settings</Link>
      ),
    },
    {
      Header: 'New Report',
      accessor: (s) => s.id,
      Cell: ({ row: { original } }) => (
        <Link className="btn btn-info" tag={Link} to={`/new-report/${original.id}`}>New Report</Link>
      ),
    },
    // {
    //   Header: 'Delete',
    //   accessor: (s) => s.id,
    //   Cell: ({ row: { original } }) => (
    //     <>
    //       <button className="btn btn-danger" onClick={() => getDeleteCustomerSystemModalIsOpen(!deleteCustomerSystemModalIsOpen)}>Delete</button>
    //       <Modal isOpen={deleteCustomerSystemModalIsOpen} toggle={() => getDeleteCustomerSystemModalIsOpen(!deleteCustomerSystemModalIsOpen)}>
    //       <ModalHeader toggle={() => getDeleteCustomerSystemModalIsOpen(!deleteCustomerSystemModalIsOpen)}>Delete Customer System</ModalHeader>
    //         <DeleteCustomerSystemModal
    //           toggleModalOpen={getDeleteCustomerSystemModalIsOpen}
    //           modalIsOpen={deleteCustomerSystemModalIsOpen}
    //           deleteCustomerSystem={deleteTheSystem}
    //           systemId={original.id}
    //         />
    //     </Modal>
    //     </>
    //   ),
    // },
  ], []);
  return (
      <div className="widget col-10 mb-4 pt-0">
        <Header title="Systems" />
        <div className="d-flex justify-content-end mb-4">
        <Link className="btn btn-info mr-4" tag={Link} to={addSystemLink}>Add System</Link>
        </div>
      <GlobalTable
            columns={tableColumns}
        data={tableData}
        emptyTableMessage="No Systems to show"
          />
      </div>
  );
}

export default PropertySystems;
