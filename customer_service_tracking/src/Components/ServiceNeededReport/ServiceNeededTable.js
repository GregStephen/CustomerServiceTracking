/* eslint-disable no-nested-ternary */
import React from 'react';
// { useMemo, useState }

// import { Col, Row, Input } from 'reactstrap';
import { useTable, useSortBy, usePagination } from 'react-table';

function ServiceNeededTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  );

  return (
    <>
      <div className="col-12">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination col-12">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageToGoTo = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageToGoTo);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((newPageSize) => (
            <option key={newPageSize} value={newPageSize}>
              Show {newPageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

/*
function ReportsTable({ reports, emptyTableMessage = null, searchable = false }) {
  const [searchFilter, setSearchFilter] = useState('');
  const tableData = useMemo(() => (reports || []), [reports]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Service Date',
      accessor: (r) => r.serviceDate,
    },
    {
      Header: 'Technician',
      accessor: (r) => r.technician,
    },
    {
      Header: 'Customer',
      accessor: (r) => r.fullName,
    },
    {
      Header: 'Type',
      accessor: (r) => r.type,
    },
    {
      Header: 'Search',
      accessor: (r) => r.serviceDate + r.technician + r.fullName + r.type,
    },
  ], []);

  const hiddenColumns = useMemo(() => ['Search'], []);
  const filters = useMemo(
    () => [
      { id: 'Search', value: searchFilter },
    ],
    [searchFilter],
  );

  const emptyMessage = useMemo(() => emptyTableMessage ?? 'No reports available', [emptyTableMessage]);

  return (<>
    {searchable && (<Row className="mb-3">
      <Col className="d-flex justify-content-between">
        <div>
          <Input
            type="text"
            value={searchFilter}
            onCHange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search Reports"
            style={{ maxWidth: '100%', width: '300px' }}
          />
        </div>
      </Col>
    </Row>)}
    <ReactTable
      hover
      columns={tableColumns}
      data={tableData}
      emptyTableMessage={emptyMessage}
      defaultSortColumn='serviceDate'
      defaultSortDesc
      hiddenColumns={hiddenColumns}
      filters={filters}
    />
  </>
  );
} */

export default ServiceNeededTable;
