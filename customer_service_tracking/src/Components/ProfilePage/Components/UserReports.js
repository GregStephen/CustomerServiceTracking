import React, { useMemo } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Header, GlobalTable } from '../../Global';

function UserReports({ reports }) {
  const history = useHistory();
  const tableData = useMemo(() => (reports || []), [reports]);
  const tableColums = useMemo(() => [
    {
      Header: 'Date',
      accessor: 'serviceDate',
      Cell: ({ value }) => moment(value).format('L'),
    },
    {
      Header: 'Property',
      accessor: 'property.displayName',
    },
    {
      Header: 'System',
      accessor: 'systemName',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
  ], []);
  return (
    <div className="UserReports widget col-10 pt-0">
      <Header title="Reports" icon="fa-file-signature" />
      <GlobalTable
        hover
        emptyTableMessage="No Reports to show"
        columns={tableColums}
        data={tableData}
        defaultSortColumn='Date'
        customRowProps={(row) => ({
          className: 'cursor-pointer',
          onClick: () => {
            history.push(`/report/${row.original.id}`);
          },
        })}
      />
    </div>
  );
}

export default UserReports;
