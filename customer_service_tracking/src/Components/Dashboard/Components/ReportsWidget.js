import React, { useContext, useMemo } from 'react';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import { GlobalTable, Header } from '../../Global';
import UserContext from '../../../Contexts/UserContext';
import { useGetAllReportsByBusinessId } from '../../../Helpers/Data/ReportRequests';

function ReportsWidget() {
  const user = useContext(UserContext);
  const reports = useGetAllReportsByBusinessId(user.businessId);
  const history = useHistory();

  const tableData = useMemo(() => (reports?.data ? reports.data : []), [reports]);

  const tableColumns = useMemo(() => [
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
      accessor: (r) => r.property.id,
      Cell: ({ row: { original } }) => (original.property?.displayName),
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
  ], []);

  return (
    <div className="widget">
      <Header title="Recent Reports" />
      <GlobalTable
        hover
        striped
        customRowProps={(row) => ({
          className: 'cursor-pointer',
          onClick: () => {
            history.push(`/report/${row.original.id}`);
          },
        })}
        emptyTableMessage="No Reports for the last 7 days"
        columns={tableColumns}
        data={tableData}
        hidePagination={tableData?.length < 10}
        defaultSortColumn='serviceDate'
        sortDesc={true}
      />
      <Link className="btn btn-info" to='/reports'>View All Reports</Link>
    </div>
  );
}

export default ReportsWidget;
