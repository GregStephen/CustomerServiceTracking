import React, { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { Badge } from 'reactstrap';

import { Header, GlobalTable } from '../Global';

function PropertySystems({ property }) {
  const history = useHistory();
  const addSystemLink = `/add-system-to-property/${property.id}`;

  const tableData = useMemo(() => (property.systems || []), [property.systems]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Install Date',
      accessor: 'installDate',
      Cell: ({ value }) => (moment(value).format('L')),
    },
    {
      Header: 'Serial Number',
      accessor: 'serialNumber',
    },
    {
      Header: 'Active',
      accessor: 'enabled',
      Cell: ({ value }) => (
        value ? <Badge color="success">Active</Badge> : <Badge color="danger">Inactive</Badge>
      ),
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
            history.push(`/system/${row.original.id}`);
          },
        })}
          />
      </div>
  );
}

export default PropertySystems;
