import React, { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { Badge } from 'reactstrap';

import { Header, GlobalTable } from '../Global';

function PropertySystems({ property }) {
  const history = useHistory();
  const addSystemLink = `${property.id}/add-system-to-property/`;

  const tableData = useMemo(() => (property.systems || []), [property.systems]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'displayName',
      Cell: ({ row: { original } }) => (
        <p>{original.displayName} {!original.enabled && <Badge color="danger">Inactive</Badge>}</p>
      ),
    },
    {
      Header: 'Install Date',
      accessor: 'installDate',
      Cell: ({ value }) => (moment(value).format('L')),
    },
    {
      Header: 'Day Depleted',
      accessor: 'dayTankDepleted',
      Cell: ({ value }) => (moment(value).format('L')),
    },
  ], []);
  return (
      <div className="widget col-10 mb-4 pt-0">
        <Header title="Systems" />
        <div className="d-flex justify-content-end mb-4">
        <Link className="btn btn-info mr-4" tag={Link} to={addSystemLink}>Add System</Link>
        </div>
      <GlobalTable
        columns={tableColumns}
        data={tableData}
        emptyTableMessage="No Systems to show"
        hover
        striped
        customRowProps={(row) => ({
          className: 'cursor-pointer',
          onClick: () => {
            history.push(`${row.original.propertyId}/system/${row.original.id}`);
          },
        })}
          />
      </div>
  );
}

export default PropertySystems;
