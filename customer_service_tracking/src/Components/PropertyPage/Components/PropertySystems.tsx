import React, { useContext, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { Badge } from 'reactstrap';
import { Column } from 'react-table';
import { Header, GlobalTable } from '../../Global';
import UserContext from '../../../Contexts/UserContext';

interface Props {
  property: Property.Property;
}
function PropertySystems({ property }: Props) {
  const history = useHistory();
  const addSystemLink = `${property.id}/add-system-to-property/`;
  const user = useContext(UserContext);
  const tableData = useMemo(() => (property.systems || []), [property.systems]);

  const tableColumns = useMemo<Column<Property.PropertySystem>[]>(() => [
    {
      Header: 'Name',
      accessor: 'displayName',
      Cell: ({ row: { original } }) => (
        <>{original.displayName} {!original.enabled && <Badge color="danger">Inactive</Badge>}</>
      ),
    },
    {
      Header: 'Install Date',
      accessor: 'installDate',
      Cell: ({ value }) => (moment(value).format('L')),
    },
    {
      Header: 'Next Service Date',
      accessor: 'nextServiceDate',
      Cell: ({ value }) => (moment(value).format('L')),
    },
  ], []);
  return (
    <div className="widget col-10 mb-4 mr-0 ml-0 mt-0 pt-0">
      <Header title="Systems" />
      {user.admin
        && <div className="d-flex justify-content-end mb-2">
          <Link className="btn btn-info mr-4" to={addSystemLink}><i className="fas fa-plus" /></Link>
        </div>
      }
      <GlobalTable
        columns={tableColumns}
        data={tableData}
        emptyTableMessage="No Systems to show"
        hover
        striped
        customRowProps={(row) => ({
          className: 'cursor-pointer',
          onClick: () => {
            history.push(`${row?.original.propertyId}/system/${row?.original.id}`);
          },
        })}
      />
    </div>
  );
}

export default PropertySystems;
