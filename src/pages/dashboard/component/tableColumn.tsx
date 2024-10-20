import { ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { extractDate, extractTime } from '@src/utils/timeHelpers';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { info } from 'console';

export interface IParticipantsTable {
  _id: string;
  name: string;
  description: number;
  dateTime: string;
  status: string;
  action: {
    updateTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
  };
}

const columnHelper = createColumnHelper<IParticipantsTable>();

export const todoColumn = [
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
      const status = info.getValue();
      return (
        <Text fontWeight={'normal'} fontSize={'0.875rem'} align={'center'}>
          {status || ''}
        </Text>
      );
    },
  }),
  columnHelper.accessor(row => row.action, {
    id: 'action',
    header: info => (
      <Text
        fontSize={'0.875rem'}
        fontWeight={'500'}
        textTransform="none"
        align={'center'}
        w={'full'}
      >
        Action
      </Text>
    ),
    cell: info => {
      const { updateTodo, deleteTodo } = info.getValue();
      return (
        <Flex>
          <IconButton
            onClick={() => updateTodo(info.row.original._id)}
            fontWeight={'normal'}
            fontSize={'0.875rem'}
            aria-label="Edit todo"
            icon={<EditIcon />}
          />
          <IconButton
            onClick={() => deleteTodo(info.row.original._id)}
            fontWeight={'normal'}
            fontSize={'0.875rem'}
            aria-label="Change Status"
            icon={<DeleteIcon />}
          />
        </Flex>
      );
    },
  }),
] as ColumnDef<Record<any, any>>[];
