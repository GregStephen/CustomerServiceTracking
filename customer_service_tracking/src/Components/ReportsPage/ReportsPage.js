import React, { useMemo, useState, useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Row, Col, Input } from 'reactstrap';
import UserContext from '../../Contexts/UserContext';
import { Page, Header, GlobalTable } from '../Global';

import './ReportsPage.scss';

import { useGetAllReportsByBusinessId } from '../../Helpers/Data/ReportRequests';


function ReportsPage() {
  const userObj = useContext(UserContext);
  const reports = useGetAllReportsByBusinessId(userObj.businessId);
  const [searchFilter, setSearchFilter] = useState('');

  const tableData = useMemo(() => (reports?.data ? reports.data : []), [reports]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Service Date',
      accessor: (r) => moment(r.serviceDate).format('L'),
    },
    {
      Header: 'Technician',
      accessor: (r) => r.technician,
    },
    {
      Header: 'Property',
      accessor: (r) => r.property.id,
      Cell: ({ row: { original } }) => (
        <Link to={{ pathname: `/property/${original.propertyId}` }}>{original.property?.displayName}</Link>
      ),
    },
    {
      Header: 'Type',
      accessor: (r) => r.type,
    },
    {
      Header: 'Search',
      accessor: (r) => r.serviceDate + r.technician + r.property?.displayName + r.type,
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
      <div className="ReportsPage">
        <Header title="Reports" icon="fa-file-signature" />
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
            hidePagination={tableData?.length < 10}
            defaultSortColumn='Service Date'
            hiddenColumns={hiddenColumns}
            filters={filters}
          />
        </div>
      </div>
    </Page>
  );
}

export default ReportsPage;
