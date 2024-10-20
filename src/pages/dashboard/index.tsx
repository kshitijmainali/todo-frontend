import {
  Box,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useFetchAllTodo } from '@src/api/todo';
import EmptyScreen from '@src/components/EmptyScreen';
import { DataTable } from '@src/components/Table';
import { todoColumn } from './component/tableColumn';
import React from 'react';
import EditTodoModel from './component/edit.model';
import DeleteTodoModel from './component/delete.model';
import { SearchIcon } from '@chakra-ui/icons';
import AddNewBtn from './component/button';
import AddTodoModel from './component/add.model';

export default function Dashboard() {
  const [isAddOpen, setisAddOpen] = React.useState(false);
  const [editTodoId, seteditTodoId] = React.useState<string | null>(null);
  const [deleteTodoId, setdeleteTodoId] = React.useState<string | null>(null);

  const { data } = useFetchAllTodo();

  const todoFromApi = data?.data?.data?.data;

  const updateTodo = (id: string) => {
    seteditTodoId(id);
  };

  const deleteTodo = (id: string) => {
    setdeleteTodoId(id);
  };

  const addTodo = () => {
    setisAddOpen(true);
  };

  const todos = todoFromApi
    ? todoFromApi.map(el => {
        return {
          _id: el._id,
          name: el.name,
          description: el.description,
          dateTime: el.dateTime,
          status: el.status,
          action: {
            updateTodo,
            deleteTodo,
          },
        };
      })
    : [];

  const pagination = data?.data.data.pagination || {
    total: 0,
    hasNextPage: false,
  };

  const editProps = React.useMemo(() => {
    if (editTodoId && todoFromApi) {
      return todoFromApi?.find(todo => todo._id === editTodoId);
    }
  }, [editTodoId]);

  return (
    <>
      <VStack w={'full'} m={4} p={4}>
        <HStack w={'full'} gap={1} justifyContent={'space-between'}>
          <Text fontSize={'1.5rem'} fontWeight={500}>
            Todo list
          </Text>
          <AddNewBtn onClick={addTodo} />
        </HStack>
        <Divider borderColor="borderColorBlackOpacity" />
        <DataTable
          data={todos}
          columns={todoColumn}
          isClientSidePagination={false}
          emptyScreen={
            <EmptyScreen
              title="No Winners"
              description={`There are no winners yet`}
            />
          }
        />
        {editTodoId ? (
          <EditTodoModel
            isOpen={true}
            onClose={() => seteditTodoId(null)}
            initialData={editProps}
          />
        ) : null}
        {deleteTodoId ? (
          <DeleteTodoModel
            isOpen={true}
            onClose={() => setdeleteTodoId(null)}
            initialData={editProps}
          />
        ) : null}
        {isAddOpen ? (
          <AddTodoModel isOpen onClose={() => setisAddOpen(false)} />
        ) : null}
      </VStack>
    </>
  );
}
