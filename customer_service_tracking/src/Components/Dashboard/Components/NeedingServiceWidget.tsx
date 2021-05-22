import React, { useContext, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header, GlobalTable } from '../../Global';
import UserContext from '../../../Contexts/UserContext';
import { Column } from 'react-table';
import { useJobsNeedingAssignment } from '../../../Helpers/Data/JobRequests';

function NeedingServiceWidget() {
  const user = useContext(UserContext);
  const history = useHistory();
  const upcomingService = useJobsNeedingAssignment(user.businessId, '7');

  const tableData = useMemo(() => (upcomingService?.data ? upcomingService.data : []), [upcomingService]);

  const tableColumns: Column<Business.ServiceNeed>[]= useMemo(() => [
    {
      Header: 'Property',
      accessor: (r) => r.property.displayName,
    },
    {
      Header: 'Address',
      accessor: (r) => r.property?.addressLine1,
    },
    {
      Header: 'System',
      accessor: (r) => r.system.displayName,
    },
    {
      Header: 'Days Until Service Date',
      accessor: 'daysUntilServiceDate',
      Cell: ({ value }) => (value > 0 ? value : 'Past Due'),
    },
  ], []);
  return (
    <div className="widget col-10">
      <Header title="Jobs needing Assigned" />
      <div className="d-flex justify-content-end">
        <Link className="btn btn-info mr-3 mb-3" to='/jobs'>Assign Jobs</Link>
      </div>
      <GlobalTable
        hover
        striped
        customRowProps={(row) => ({
          className: 'cursor-pointer',
          onClick: () => {
            history.push(`/property/${row?.original.property?.id}/system/${row?.original.system?.id}`);
          },
        })}
        emptyTableMessage="No unassigned upcoming service"
        columns={tableColumns}
        data={tableData}
        hidePagination={tableData?.length < 10}
        defaultSortColumn='serviceDate'
        sortDesc={true}
      />
    </div>
  );
}

export default NeedingServiceWidget;
