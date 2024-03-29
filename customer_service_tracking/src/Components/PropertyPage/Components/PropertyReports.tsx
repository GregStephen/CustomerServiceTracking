import React, { useMemo } from 'react';
import moment from 'moment';
import { Column } from 'react-table';
import { useHistory } from 'react-router-dom';
import { Header, GlobalTable } from '../../Global';


interface Props {
  reports: Property.Report[];
}
function PropertyReports({ reports }: Props) {
  const history = useHistory();
  const tableData = useMemo(() => (reports || []), [reports]);
  const tableColums = useMemo<Column<Property.Report>[]>(() => [
    {
      Header: 'Date',
      accessor: 'serviceDate',
      Cell: ({ value }) => moment(value).format('L'),
    },
    {
      Header: 'System',
      accessor: 'systemName',
    },
    {
      Header: 'Technician',
      accessor: 'technician',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
  ], []);
  return (
    <div className="PropertyReports widget col-10 pt-0 mb-4">
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
            history.push(`/property/${row?.original.propertyId}/system/${row?.original.systemId}/report/${row?.original.id}`);
          },
        })}
      />
    </div>
  );
}

export default PropertyReports;
