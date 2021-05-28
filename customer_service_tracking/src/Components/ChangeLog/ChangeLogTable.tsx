import React, { useMemo } from 'react';
import { Column } from 'react-table';
import moment from 'moment';
import { GlobalTable } from '../Global';
import ChangeLogCell from './ChangeLogCell';

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
    }
  ], []);
  return logData
    ? <GlobalTable
      small
      columns={tableColumns}
      data={logData}
      pageRowCount={5}
      pageCountOptions={[5]}
      emptyTableMessage={emptyMessage}
      hidePagination={false}
    /> : <div></div>;
}

export default ChangeLogTable;
