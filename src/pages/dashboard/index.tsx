import { Box, Text } from '@chakra-ui/react';
import { useFetchAllTodo } from '@src/api/todo';
import EmptyScreen from '@src/components/EmptyScreen';
import { DataTable } from '@src/components/Table';
import { extractDate, extractTime } from '@src/utils/timeHelpers';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

interface IParticipantsTable {
  name: string;
  description: number;
  dateTime: string;
  status: {
    status: string;
    changeStatus: (id: string) => void;
  };
}

const columnHelper = createColumnHelper<IParticipantsTable>();

const column = [
  columnHelper.accessor(row => row.name, {
    size: 1000,
    id: 'name',
    header: info => (
      <Text fontSize={'0.875rem'} fontWeight={'500'} textTransform="none">
        Name
      </Text>
    ),
    cell: info => (
      <Text fontSize={'0.875rem'} fontWeight={'500'} textTransform="none">
        {info.getValue()}
      </Text>
    ),
  }),
  columnHelper.accessor(row => row.description, {
    id: 'description',
    header: info => (
      <Text
        fontSize={'0.875rem'}
        fontWeight={'500'}
        textTransform="none"
        align={'center'}
        w={'full'}
      >
        Description
      </Text>
    ),
    cell: info => (
      <Text fontWeight={'normal'} fontSize={'0.875rem'} align={'center'}>
        {info.getValue()}
      </Text>
    ),
  }),
  columnHelper.accessor(row => row.dateTime, {
    id: 'date',
    header: info => (
      <Text
        fontSize={'0.875rem'}
        fontWeight={'500'}
        textTransform="none"
        align={'center'}
        w={'full'}
      >
        Todo Date
      </Text>
    ),
    cell: info => (
      <Text fontWeight={'normal'} fontSize={'0.875rem'} align={'center'}>
        {extractDate(info.getValue())}
      </Text>
    ),
  }),
  columnHelper.accessor(row => row.dateTime, {
    id: 'time',
    header: info => (
      <Text
        fontSize={'0.875rem'}
        fontWeight={'500'}
        textTransform="none"
        align={'center'}
        w={'full'}
      >
        Todo Time
      </Text>
    ),
    cell: info => (
      <Text fontWeight={'normal'} fontSize={'0.875rem'} align={'center'}>
        {extractTime(info.getValue())}
      </Text>
    ),
  }),
  columnHelper.accessor(row => row.status, {
    id: 'status',
    header: info => (
      <Text
        fontSize={'0.875rem'}
        fontWeight={'500'}
        textTransform="none"
        align={'center'}
        w={'full'}
      >
        Status
      </Text>
    ),
    cell: info => {
      const { status } = info.getValue();
      return (
        <Text fontWeight={'normal'} fontSize={'0.875rem'} align={'center'}>
          {status || ''}
        </Text>
      );
    },
  }),
] as ColumnDef<Record<any, any>>[];

export default function Dashboard() {
  const { data } = useFetchAllTodo();

  const todoFromApi = data?.data?.data?.data;

  const changeStatus = (id: string) => {
    console.log('change status', id);
  };

  const todos = todoFromApi
    ? todoFromApi.map(el => {
        return {
          name: el.name,
          description: el.description,
          dateTime: el.dateTime,
          status: {
            status: el.status,
            changeStatus: changeStatus,
          },
        };
      })
    : [];

  console.log('todos : ', todoFromApi, todos);

  const pagination = data?.data.data.pagination || {
    total: 0,
    hasNextPage: false,
  };

  return (
    <Box m={4}>
      <DataTable
        data={todos}
        columns={column}
        isClientSidePagination={false}
        emptyScreen={
          <EmptyScreen
            title="No Winners"
            description={`There are no winners yet`}
          />
        }
      />
    </Box>
  );
}
