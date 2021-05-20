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
  HeaderGroup,
  Column,
  TableState,
  SortingRule,
  Row as TableRow,
  Cell
} from 'react-table';

interface ReactTableProps {
  columns: any[];
  data: object[];
  hiddenColumns?: string[];
  hidePagination?: boolean;
  sortable?: boolean;
  sortColumns?: SortingRule<object>[];
  defaultSortColumn?: string;
  sortDesc?: boolean;
  filters?: { id: string; value: any }[];
  bordered?: boolean;
  striped?: boolean;
  hover?: boolean;
  small?: boolean;
  className?: string;
  enableOverflow?: boolean;
  customHeaderProps?: (column?: Column<any>) => object;
  customRowProps?: (row?: TableRow<any>) => object;
  customCellProps?: (cell?: Cell<any>) => object;
  customColumnProps?: (column?: Column<any>) => object;
  emptyTableMessage?: string;
  pageRowCount?: number;
  pageCountOptions?: number[];

}
const renderHeaderStyles = (column: Column, customStyles = {}) => {
  const styles: React.CSSProperties = { ...customStyles };
  if (column.minWidth) {
    styles.minWidth = column.minWidth;
  }
  if (column.maxWidth && column.maxWidth !== Number.MAX_SAFE_INTEGER) {
    styles.maxWidth = column.maxWidth;
  }
  if (column.width !== 150) {
    styles.width = column.width;
  }
  return styles;
};

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
  bordered = true,
  striped = true,
  hover = false,
  small = true,
  className = '',
  enableOverflow = false,
  customHeaderProps = () => ({}),
  customRowProps = () => ({}),
  customCellProps = () => ({}),
  customColumnProps = () => ({}),
  emptyTableMessage = 'No data to display',
  pageRowCount = 10,
  pageCountOptions = [10, 25, 50, 100],
}: ReactTableProps) {
  const allRowPros = (row: TableRow) => {
    const props = row.getRowProps(customRowProps(row));
    props.className = `${props.className ?? ''}`;
    return props;
  };

  const initialTableState = useMemo(() => {
    const state: Partial<TableState> = {
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

  const tableClasses = useMemo(() => {
    let classes = 'table mb-0';
    if (bordered) {
      classes += 'table-borderd ';
    }
    if (striped) {
      classes += 'table-striped ';
    }
    if (small) {
      classes += 'table-sm ';
    }
    if (hover) {
      classes += 'table-hover ';
    }
    if (className) {
      classes += className;
    }
    return classes;
  }, [bordered, striped, small, hover, className]);

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
      <div className="col-12" style={enableOverflow ? { overflowX: 'visible' } : {}}>
        <table {...getTableProps({ className: tableClasses })}>
          <thead>
            {headerGroups.map((headerGroup: HeaderGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, h) => (
                  <th  {...column.getHeaderProps([
                    {
                      className: `${column.canSort ? 'cursor-pointer' : ''} ${column.headerClassName ?? ''}`,
                      style: renderHeaderStyles(column, column.headerStyle),
                    },
                    customColumnProps(column),
                    customHeaderProps(column),
                    column.getSortByToggleProps(),
                  ])}>
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
                (row, r) => {
                  prepareRow(row);
                  return (
                    <tr {...allRowPros(row)}>
                      {row.cells.map((cell: any, c) => (
                        <td {...cell.getCellProps([
                          {
                            className: cell.column.cellClassName,
                            style: cell.column.cellStyle,
                          },
                          customColumnProps(cell.column),
                          customCellProps(cell),
                        ])}>
                          {cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                },
              )
              : (
                <tr>
                  <td colSpan={columns[0]?.columns ? columns[0].columns.length : columns.length} style={{ textAlign: 'center' }}>{emptyTableMessage}</td>
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
                <CustomInput id="pageSize" type="select" bsSize="sm" value={pageSize} onChange={(e: any) => setPageSize(Number(e.target.value))} style={{ maxWidth: '75px' }}>
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
