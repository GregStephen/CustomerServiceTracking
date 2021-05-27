import React, { useMemo, useState, useContext } from 'react';
import moment from 'moment';
import { Column } from 'react-table';
import { useHistory } from 'react-router-dom';
import { Row, Col, Input } from 'reactstrap';
import UserContext from '../../Contexts/UserContext';
import { Page, Header, GlobalTable } from '../Global';

import './ReportsPage.scss';

import { useGetAllReportsByBusinessId } from '../../Helpers/Data/ReportRequests';

function ReportsPage() {
  const userObj = useContext(UserContext);
  const reports = useGetAllReportsByBusinessId(userObj.businessId);
  const [searchFilter, setSearchFilter] = useState('');
  const history = useHistory();

  const tableData = useMemo(() => (reports?.data ? reports.data : []), [reports]);

  const tableColumns: Column<Property.Report>[] = useMemo(() => [
    {
      Header: 'Service Date',
      accessor: 'serviceDate',
      Cell: ({ row: { original } }) => (
        moment(original.serviceDate).format('L')
      ),
    },
    {
      Header: 'Technician',
      accessor: 'technician',
    },
    {
      Header: 'Property',
      accessor: 'property',
      Cell: ({ row: { original }} ) => (original.property?.displayName),
    },
    {
      Header: 'Type',
      accessor: 'type',
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
      <div className="widget col-10 mt-4">
        <Header title="Reports" icon="fa-file-signature" />
        <Row className="mb-3">
          <Col className="d-flex justify-content-between">
            <div className="ml-4">
              <Input
                type="text"
                value={searchFilter}
                onChange={(e: any) => setSearchFilter(e.target.value)}
                placeholder="Search Reports"
                style={{ maxWidth: '100%', width: '300px' }}
              />
            </div>
          </Col>
        </Row>
        <GlobalTable
          hover
          striped
          customRowProps={(row) => ({
            className: 'cursor-pointer',
            onClick: () => {
              history.push(`/property/${row?.original.propertyId}/system/${row?.original.systemId}/report/${row?.original.id}`);
            },
          })}
          emptyTableMessage="No Reports to show"
          columns={tableColumns}
          data={tableData}
          hidePagination={tableData?.length < 10}
          defaultSortColumn='serviceDate'
          sortDesc={true}
          hiddenColumns={hiddenColumns}
          filters={filters}
        />
      </div>
    </Page>
  );
}

export default ReportsPage;
