import React, { useState, useMemo, useContext } from 'react';
import {
  Input,
  Col,
  Row,
  Badge,
} from 'reactstrap';
import { Column } from 'react-table';
import { useHistory } from 'react-router-dom';
import { Page, Header, GlobalTable } from '../Global';
import { useGetRegisteredAndUnregisteredEmployees } from '../../Helpers/Data/BusinessRequests';

import './TeamPage.scss';
import UserContext from '../../Contexts/UserContext';
import NewTeamMemberModal from '../Modals/NewTeamMemberModal';

function TeamPage() {
  const userObj = useContext(UserContext);
  const history = useHistory();
  const teamMembers = useGetRegisteredAndUnregisteredEmployees(userObj.businessId);
  const [searchFilter, setSearchFilter] = useState('');

  const tableData = useMemo(() => (teamMembers?.data ? teamMembers.data : []), [teamMembers]);

  const tableColumns: Column<Business.Employee>[] = useMemo(() => [
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
        <div className="widget col-10 mt-4">
          <Header title='Team' icon='fa-users' />
          <Row className="mb-3">
            <Col className="d-flex justify-content-between">
              <div className="ml-4">
                <Input
                  type="text"
                  value={searchFilter}
                  onChange={(e: any) => setSearchFilter(e.target.value)}
                  placeholder="Search Team"
                  style={{ maxWidth: '100%', width: '300px' }}
                />
              </div>
              <NewTeamMemberModal />
            </Col>
          </Row>
          <GlobalTable
            hover
            striped
            columns={tableColumns}
            data={tableData}
            defaultSortColumn='Name'
            hiddenColumns={hiddenColumns}
            filters={filters}
            customRowProps={(row) => ({
              className: 'cursor-pointer',
              onClick: () => {
                history.push(`/user/${row?.original.id}`);
              },
            })}
          />
        </div>
      </div>
    </Page>
  );
}

export default TeamPage;
