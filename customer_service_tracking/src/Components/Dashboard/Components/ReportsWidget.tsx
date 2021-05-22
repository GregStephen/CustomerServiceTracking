import React, { useContext, useMemo } from 'react';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import { GlobalTable, Header } from '../../Global';
import { Column } from 'react-table';
import UserContext from '../../../Contexts/UserContext';
import { useGetAllReportsByBusinessIdLastWeek } from '../../../Helpers/Data/ReportRequests';

function ReportsWidget() {
  const user = useContext(UserContext);
  const reports = useGetAllReportsByBusinessIdLastWeek(user.businessId);
  const history = useHistory();

  const tableData = useMemo(() => (reports?.data ? reports.data : []), [reports]);

  const tableColumns: Column<Property.Report>[]= useMemo(() => [
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
      accessor: 'propertyId',
      Cell: ({ row: { original } }) => (original.property?.displayName),
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
  ], []);

  return (
    <div className="widget col-10">
      <Header title="Recent Reports" />
      <div className="d-flex justify-content-end">
        <Link className="btn btn-info mr-3 mb-3" to='/reports'>View All Reports</Link>
      </div>
      <GlobalTable
        hover
        striped
        customRowProps={(row) => ({
          className: 'cursor-pointer',
          onClick: () => {
            history.push(`/report/${row?.original.id}`);
          },
        })}
        emptyTableMessage="No Reports for the last 7 days"
        columns={tableColumns}
        data={tableData}
        hidePagination={tableData?.length < 10}
        defaultSortColumn='serviceDate'
        sortDesc={true}
      />
    </div>
  );
}

export default ReportsWidget;
