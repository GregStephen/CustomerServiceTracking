import React, { useMemo, useCallback } from 'react';
import { Column, CellProps } from 'react-table';
import moment from 'moment';
import { GlobalTable } from '../Global';
import ChangeLogCell from './ChangeLogCell';
import { ChangeLogSubComponent } from './ChangeLogSubComponent';

interface Props {
  logData?: Array<ChangeLog>;
  entityName: string;
}

function ChangeLogTable({ logData, entityName }: Props) {
  const emptyMessage = `No changes found for this ${entityName}`;
  // const tableColumns: Array<Column<ChangeLog>> = useMemo(() => [
  //   {
  //     accessor: (note) => note,
  //     id: 'Delta',
  //     Cell: (({ value }: { value: ChangeLog }) => (
  //       <div style={{ width: '100%' }}>
  //         <div className="text-muted text-right mb-1 fs-xs">
  //           <span className="font-weight-bold">{value.username}</span> - {moment.utc(value.timestamp).local().format('LLL')}
  //         </div>
  //         <ChangeLogCard delta={value.delta} />
  //       </div>
  //     )),
  //   },
  // ], []);
  const tableColumns: Array<Column<ChangeLog>> = useMemo(() => [
    {
      Header: 'Change',
      accessor: (note) => note,
      Cell: (({ value }: { value: ChangeLog }) => (
        <ChangeLogCell delta={value.delta} />
      )),
    },
    {
      Header: 'User',
      accessor: 'username'
    },
    {
      Header: 'Date',
      accessor: 'timestamp',
      Cell: ({ value }) => moment(value).format('L'),
    },
    {
      id: 'delta',
      Cell: ({ row }: CellProps<ChangeLog>) => {
        return (<span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? <i className="fas fa-minus-circle text-primary" /> : <i className="fas fa-plus-circle text-info" />}
        </span>)
      }
    }
  ], []);

  const renderSubComponents = useCallback(
    (row) => (
      <ChangeLogSubComponent tableData={row.original} />
    ), []
  )
  return logData
    ? <GlobalTable
      small
      columns={tableColumns}
      data={logData}
      pageRowCount={5}
      pageCountOptions={[5]}
      emptyTableMessage={emptyMessage}
      hidePagination={false}
      renderRowSubComponent={renderSubComponents}
    /> : <div></div>;
}

export default ChangeLogTable;
