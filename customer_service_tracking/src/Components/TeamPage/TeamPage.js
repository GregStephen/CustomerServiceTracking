import React, { useState, useEffect, useMemo } from 'react';
import {
  Modal,
  ModalHeader,
  Input,
  Col,
  Row,
} from 'reactstrap';

import { Page, Header, GlobalTable } from '../Global';

import AddTeamMemberModal from '../Modals/NewTeamMemberModal/NewTeamMemberModal';
import BusinessRequests from '../../Helpers/Data/BusinessRequests';
import UserRequests from '../../Helpers/Data/UserRequests';

import './TeamPage.scss';

function TeamPage({ userObj }) {
  const [teamMembers, getTeamMembers] = useState();
  const [searchFilter, setSearchFilter] = useState('');
  const [addTeamMemberModalIsOpen, getAddTeamMemberModalIsOpen] = useState();

  useEffect(() => {
    BusinessRequests.getRegisteredAndUnregisteredEmployees(userObj.businessId)
      .then((teamMembersReturned) => getTeamMembers(teamMembersReturned))
      .catch((err) => console.error(err));
  }, [userObj.businessId]);

  const addTeamMember = (teamMember) => {
    UserRequests.addUnregisteredEmployee(teamMember)
      .then()
      .catch((err) => console.error(err));
  };
  const tableData = useMemo(() => (teamMembers || []), [teamMembers]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Name',
      accessor: (e) => e.fullName,
    },
    {
      Header: 'Registered',
      accessor: (e) => e.registered,
      Cell: ({ row: { original } }) => (
        original.registered ? <i className="fas fa-check"/> : <i className="fas fa-times"/>
      ),
    },
    {
      Header: 'Search',
      accessor: (r) => r.fullName,
    },
  ], []);

  const hiddenColumns = useMemo(() => ['Search'], []);

  const filters = useMemo(
    () => [
      { id: 'Search', value: searchFilter },
    ],
    [searchFilter],
  );

  return (
    <Page>
      <div className="TeamPage">
        <Header title='Team' icon='fa-users' />
        <div className="d-flex row justify-content-end">
          <button className="btn btn-info mr-4 mb-4" onClick={() => getAddTeamMemberModalIsOpen(!addTeamMemberModalIsOpen)}><i className="fa fa-user-plus" />Add a Team Member</button>
        </div>
        <div className="widget col-10">
        <Row className="mb-3">
            <Col className="d-flex justify-content-between">
              <div className="ml-4">
                <Input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search Reports"
                  style={{ maxWidth: '100%', width: '300px' }}
                />
              </div>
            </Col>
          </Row>
          <GlobalTable
            columns={tableColumns}
            data={tableData}
          />
        </div>
        <Modal isOpen={addTeamMemberModalIsOpen} toggle={() => getAddTeamMemberModalIsOpen(!addTeamMemberModalIsOpen)}>
          <ModalHeader toggle={() => getAddTeamMemberModalIsOpen(!addTeamMemberModalIsOpen)}>
            Add Team Member
          </ModalHeader>
          <AddTeamMemberModal
            toggleModalOpen={getAddTeamMemberModalIsOpen}
            modalIsOpen={addTeamMemberModalIsOpen}
            businessId={userObj.businessId}
            addTeamMember={addTeamMember}
            defaultSortColumn='Name'
            hiddenColumns={hiddenColumns}
            filters={filters}
          />
        </Modal>
      </div>
    </Page>
  );
}

export default TeamPage;
