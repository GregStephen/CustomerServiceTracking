/* eslint-disable no-nested-ternary */
import React, { useMemo, useEffect } from 'react';

import {
  CustomInput,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
} from 'react-table';

function GlobalTable({
  columns,
  data,
  hidePagination,
  sortable = true,
  sortColumns,
  defaultSortColumn = '',
  sortDesc = false,
  filters = [],
  hiddenColumns,
  emptyTableMessage = 'No data to display',
  pageRowCount = 10,
  pageCountOptions = [10, 25, 50, 100],
}) {
  const initialTableState = useMemo(() => {
    const state = {
      sortBy: [],
      pageSize: pageRowCount,
      filters,
    };
    if (sortColumns) {
      state.sortBy = sortColumns;
    } else if (defaultSortColumn) {
      state.sortBy = [{ id: defaultSortColumn, desc: sortDesc }];
    }
    if (hiddenColumns) {
      state.hiddenColumns = hiddenColumns;
    }
    return state;
  }, [defaultSortColumn, pageRowCount, filters, hiddenColumns, sortColumns, sortDesc]);


  const defaultColumn = useMemo(() => ({
    Filter: () => null,
  }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    setAllFilters,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      disableSortBy: !sortable,
      initialState: initialTableState,
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    if (hiddenColumns) {
      setHiddenColumns(hiddenColumns);
    }
  }, [hiddenColumns, setHiddenColumns]);

  useEffect(() => {
    if (filters.length > 0) {
      setAllFilters(filters);
    }
  }, [filters, setAllFilters]);
  return (
    <>
      <div className="col-12">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.canSort
                      ? (<span className="d-flex align-items-center">
                        <div className="mr-2">
                          {column.render('Header')}
                        </div>
                        <div className="ml-auto sortby-handler" id={`column-${column.id.replace(/[\W_]+/g, '')}`}>
                          {sortBy.length > 1 && column.sortedIndex >= 0 && (
                            <span className="opacity-50 mr-1">{column.sortedIndex + 1}</span>
                          )}
                          <span
                            className="fa-stack"
                            style={{
                              fontSize: '0.5em', height: '2em', width: '1.5em', lineHeight: '1.5em',
                            }}>
                            <i className="fas fa-stack-2x fa-sort opacity-30" />
                            {column.isSorted
                              ? column.isSortedDesc ? <i className="fas fa-stack-2x fa-sort-down" />
                                : <i className="fas fa-stack-2x fa-sort-up" />
                              : null}
                          </span>
                        </div>
                      </span>)
                      : column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.length > 0
              ? page.map(
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
              )
              : (
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: 'center' }}>{emptyTableMessage}</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      {!hidePagination
        && <div className="w-100 ml-4">
          <div className="d-sm-flex juustify-content-between">
            <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
              <span className="mr-2 text-nowrap">
                {pageIndex * pageSize + 1}
                {' to '}
                {pageIndex + 1 === pageCount ? rows.length : pageSize * (pageIndex + 1)}
                {' of '}
                {rows.length}
              </span>
              {rows.length > 10 && (
                <CustomInput id="pageSize" type="select" bsSize="sm" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ maxWidth: '75px' }}>
                  {pageCountOptions.map((pagedSize) => (
                    <option key={pagedSize} value={pagedSize}>{pagedSize}</option>
                  ))}
                </CustomInput>
              )}
            </div>
            <div>
              {pageCount > 1 && (
                <Pagination className="mb-n3 mt-2 mt-sm-0 d-flex d-sm-block justify-content-center">
                  <PaginationItem disabled={!canPreviousPage}>
                    <PaginationLink
                      first
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}>
                      <i className="fas fa-angle-double-left" />
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled={!canPreviousPage}>
                    <PaginationLink
                      previous
                      onClick={() => previousPage()}>
                      <i className="fas fa-angle-left" />
                    </PaginationLink>
                  </PaginationItem>
                  { pageCount > 3 && (
                    <React.Fragment>
                      {pageIndex >= 2 && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => gotoPage(pageIndex - 2)}>
                            {pageIndex - 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      {pageIndex >= 1 && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => previousPage()}>
                            {pageIndex}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      <PaginationItem active>
                        <PaginationLink selected>
                          {pageIndex + 1}
                        </PaginationLink>
                      </PaginationItem>
                      {pageIndex <= pageCount - 2 && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => nextPage()}>
                            {pageIndex + 2}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      {pageIndex <= pageCount - 3 && (
                        <PaginationItem>
                          <PaginationLink
                            previous
                            onClick={() => gotoPage(pageIndex + 2)}>
                            {pageIndex + 3}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                    </React.Fragment>
                  )}
                  <PaginationItem disabled={!canNextPage}>
                    <PaginationLink
                      next
                      onClick={() => nextPage()}>
                      <i className="fas fa-angle-right" />
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled={!canNextPage}>
                    <PaginationLink
                      last
                      onClick={() => gotoPage(pageCount - 1)}>
                      <i className="fas fa-angle-double-right" />
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default GlobalTable;
