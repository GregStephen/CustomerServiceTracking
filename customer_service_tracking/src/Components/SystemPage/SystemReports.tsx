import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { Column } from 'react-table';
import { Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Header, GlobalTable } from '../Global';

interface Props {
  reports: Property.Report[];
}
function ServiceReports({ reports }: Props) {
  const history = useHistory();
  const [searchFilter, setSearchFilter] = useState('');

  const tableData = useMemo(() => (reports || []), [reports]);
  const tableColums: Column<Property.Report>[] = useMemo(() => [
    {
      Header: 'Date',
      accessor: 'serviceDate',
      Cell: ({ value }) => moment(value).format('L'),
    },
    {
      Header: 'Technician',
      accessor: 'technician',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Search',
      accessor: (r) => r.technician + r.type,
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
    <div className="ServiceReports widget col-10 pt-0">
      <Header title="Reports" icon="fa-file-signature" />
      <div className="ml-4 mb-4">
        <Input
          type="text"
          value={searchFilter}
          onChange={(e: any) => setSearchFilter(e.target.value)}
          placeholder="Search Reports"
          style={{ maxWidth: '100%', width: '300px' }}
        />
      </div>
      <GlobalTable
        hover
        emptyTableMessage="No Reports to show"
        columns={tableColums}
        data={tableData}
        defaultSortColumn='serviceDate'
        sortDesc={true}
        hiddenColumns={hiddenColumns}
        filters={filters}
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

export default ServiceReports;
