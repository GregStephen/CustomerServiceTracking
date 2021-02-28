import React, { useMemo } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Header, GlobalTable } from '../../Global';

function PropertyReports({ reports }) {
  const tableData = useMemo(() => (reports || []), [reports]);
  const tableColums = useMemo(() => [
    {
      Header: 'Date',
      accessor: (r) => moment(r.serviceDate).format('L'),
    },
    {
      Header: 'Technician',
      accessor: (r) => r.technician,
    },
    {
      Header: 'Type',
      accessor: (r) => r.type,
    },
    {
      Header: 'Inspect',
      accessor: (r) => r.id,
      Cell: ({ row: { original } }) => (
        <Link className="btn btn-info" tag={Link} to={`/report/${original.id}`}>Inspect</Link>
      ),
    },
  ], []);
  return (
    <div className="PropertyReports widget col-10 pt-0">
      <Header title="Reports" icon="fa-file-signature" />
      {reports.length > 0
        && <GlobalTable
          columns={tableColums}
          data={tableData}
        />
      }
    </div>
  );
}

export default PropertyReports;
