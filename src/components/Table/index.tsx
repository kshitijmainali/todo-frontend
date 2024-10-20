import React, { ReactElement, ReactNode } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  Column,
  flexRender,
  FilterFn,
} from '@tanstack/react-table';
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Pagination } from './Pagination';
import { rankItem } from '@tanstack/match-sorter-utils';

interface IDataTable {
  columns: ColumnDef<Record<any, any>>[];
  data: Record<string, any>[];
  emptyScreen?: React.ReactNode;
  // Element to show on expanded
  expandedView?: ReactNode;
  // Should expand all rows
  isAllExpanded?: boolean;
  // Element to show on hover
  hoverView?: ReactElement;
  height?: string;
  width?: string;
  filterParams?: {
    globalFilter: string;
    onGlobalFilterChange: (value: string) => void;
  };

  searchText?: string;

  sortBy?: (sortField: string, sort_order: 'asc' | 'des') => void;
  sorted?: { sort_by: string; sort_order: 'asc' | 'des' | string };
  disablePagination?: boolean;
  isClientSidePagination?: boolean;
  paginationProps?: {
    queryPageIndex: number;
    queryPageSize: number;
    totalPageCount: number;
    totalDataCount: number;
    pageChange: (queryPageIndex: number) => void;
    pageSizeChange: (queryPageSize: number) => void;
  };

  disableOverflow?: boolean;
  containerStyles?: React.CSSProperties;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  let itemRank = undefined;

  if (
    typeof row.getValue(columnId) === 'object' &&
    !(typeof row.getValue(columnId) === 'function') &&
    !(typeof row.getValue(columnId) === 'symbol') &&
    !(typeof row.getValue(columnId) === 'undefined')
  ) {
    const item = row.getValue<Record<string, string>>(columnId);
    const itemValues = Object.values(item)?.join(' ');
    itemRank = rankItem(itemValues, value);
  }

  if (
    typeof row.getValue(columnId) === 'string' ||
    typeof row.getValue(columnId) === 'number'
  ) {
    itemRank = rankItem(row.getValue(columnId), value);
  }

  // Rank the item

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank?.passed || false;
};

/**
 * General datatable component
 * @param props IDataTable
 * @returns JSX Table Element
 */
const DataTable = ({
  columns,
  data,
  disablePagination,
  emptyScreen,
  isClientSidePagination,
  paginationProps,
  filterParams,
}: IDataTable) => {
  const tableInstance = useReactTable({
    columns,
    data,
    state: {
      globalFilter: filterParams?.globalFilter || '',
    },
    filterFns: {
      fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: !isClientSidePagination && !!paginationProps,
    pageCount: paginationProps ? paginationProps.totalPageCount : undefined,
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: filterParams?.onGlobalFilterChange,
    enableFilters: true,
    getColumnCanGlobalFilter: (column: Column<any, any>) => {
      return column.columnDef.enableGlobalFilter || true;
    },
  });

  const { getHeaderGroups, getRowModel, getState } = tableInstance;

  const {
    pagination: { pageIndex, pageSize },
  } = getState();

  const {
    canNextPage,
    canPreviousPage,
    pageChange,
    pageSizeChange,
    queryPageIndex,
    queryPageSize,
    totalPageCount,
    totalDataCount,
  } = paginationProps
    ? {
        ...paginationProps,
        canPreviousPage: paginationProps?.queryPageIndex > 1,
        canNextPage:
          paginationProps?.queryPageIndex < paginationProps?.totalPageCount,
      }
    : {
        canNextPage: tableInstance.getCanNextPage(),
        totalDataCount: tableInstance.getPageCount() * pageSize,
        canPreviousPage: tableInstance.getCanPreviousPage(),
        queryPageIndex: pageIndex + 1,
        queryPageSize: pageSize,
        totalPageCount: tableInstance.getPageCount(),
        pageSizeChange: tableInstance.setPageSize,
        pageChange: (page: number) => tableInstance.setPageIndex(page - 1),
      };
  const headerGroups = getHeaderGroups();

  return (
    <TableContainer w="full" overflowX={'auto'} overflowY="auto">
      <Table
        variant={'unstyled'}
        w="full"
        size="lg"
        sx={{
          '& th': {
            boxShadow: 'none',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: 'borderColorBlackOpacity',
          },
          '& th:first-of-type': {
            padding: '0px',
          },
          '& td': {
            boxShadow: 'none',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: 'borderColorBlackOpacity',
          },
          '& td:first-of-type ': {
            padding: '0px',
          },
          '& tbody > tr:last-child > td ': {
            borderBottomWidth: disablePagination && 0,
          },
        }}
      >
        <Thead>
          {headerGroups.map((headerGroup, index) => {
            return (
              <Tr key={index}>
                {headerGroup.headers.map((header, i) => {
                  const meta: any = header.column.columnDef.meta;
                  return (
                    <Th
                      key={header.id}
                      style={{ width: header.column.getSize() }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>
        {getRowModel().rows.length ? (
          <Tbody>
            {getRowModel().rows.map((row, rowIndex) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  const meta: any = cell.column.columnDef.meta;
                  return (
                    <Td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        ) : (
          <>
            {!emptyScreen && (
              <Box py={2}>
                <Text fontStyle={'italic'} fontWeight="medium">
                  No Data Available
                </Text>
              </Box>
            )}
          </>
        )}
      </Table>
      <>{!getRowModel().rows.length ? emptyScreen : null}</>
      {!disablePagination || getRowModel().rows.length ? (
        <Pagination
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          changePage={pageChange}
          changePazeSize={pageSizeChange}
          totalpageCount={totalPageCount}
          totalDataCount={totalDataCount}
          pageSize={queryPageSize}
          pageIndex={queryPageIndex}
        />
      ) : null}
    </TableContainer>
  );
};
const MemoDataTable = React.memo(DataTable);
export { MemoDataTable as DataTable };
