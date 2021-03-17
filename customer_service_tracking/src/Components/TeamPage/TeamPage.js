import React, { useState, useMemo, useContext } from 'react';
import {
  Input,
  Col,
  Row,
  Badge,
} from 'reactstrap';

import { Page, Header, GlobalTable } from '../Global';
import { useGetRegisteredAndUnregisteredEmployees } from '../../Helpers/Data/BusinessRequests';

import './TeamPage.scss';
import UserContext from '../../Contexts/UserContext';
import NewTeamMemberModal from '../Modals/NewTeamMemberModal/NewTeamMemberModal';

function TeamPage() {
  const userObj = useContext(UserContext);
  const teamMembers = useGetRegisteredAndUnregisteredEmployees(userObj.businessId);
  const [searchFilter, setSearchFilter] = useState('');

  const tableData = useMemo(() => (teamMembers?.data ? teamMembers.data : []), [teamMembers]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'fullName',
      Cell: ({ row: { original } }) => (
        <p>{original.fullName} {original.admin ? <Badge color="success">Admin</Badge> : ''}</p>
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
          <NewTeamMemberModal />
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
            defaultSortColumn='Name'
            hiddenColumns={hiddenColumns}
            filters={filters}
          />
        </div>
      </div>
    </Page>
  );
}

export default TeamPage;
