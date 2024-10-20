import { Box } from '@chakra-ui/react';
import { useFetchAllTodo } from '@src/api/todo';
import EmptyScreen from '@src/components/EmptyScreen';
import { DataTable } from '@src/components/Table';
import { todoColumn } from './component/tableColumn';
import React from 'react';
import EditTodoModel from './component/edit.model';

export default function Dashboard() {
  const [editTodoId, seteditTodoId] = React.useState<string | null>(null);

  const { data } = useFetchAllTodo();

  const todoFromApi = data?.data?.data?.data;

  const updateTodo = (id: string) => {
    seteditTodoId(id);
  };

  const deleteTodo = (id: string) => {
    console.log('change status', id);
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
    <Box m={4}>
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
    </Box>
  );
}
