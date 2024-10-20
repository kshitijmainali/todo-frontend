import {
  Box,
  Divider,
  Flex,
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
import AddNewBtn, { FilterBtn } from './component/button';
import AddTodoModel from './component/add.model';
import FilterTodoByStatuModel from './component/filterStatus.model';

export default function Dashboard() {
  const [isAddOpen, setisAddOpen] = React.useState(false);
  const [isFilterTodoOpen, setisFilterTodoOpen] = React.useState(false);
  const [editTodoId, seteditTodoId] = React.useState<string | null>(null);
  const [deleteTodoId, setdeleteTodoId] = React.useState<string | null>(null);
  const [limit, setLimit] = React.useState(10);
  const [filterStatus, setFilterStatus] = React.useState<string[]>([]);
  const [skip, setSkip] = React.useState(0);

  const { data } = useFetchAllTodo(limit, skip, filterStatus);

  const onPageSizeChange = (size: number) => {
    setLimit(size);
    setSkip(0);
  };

  const onPageChange = (page: number) => {
    if (page) {
      setSkip((page - 1) * limit);
      return;
    }
    setSkip(0);
  };

  const todoFromApi = data?.data?.data?.data;

  const openAddTodo = () => {
    setisAddOpen(true);
  };
  const closeAddModel = (isSucc = false) => {
    setisAddOpen(false);
    if (isSucc) {
      setSkip(0);
    }
  };

  const openEditTodo = (id: string) => {
    seteditTodoId(id);
  };
  const closeEditModel = (isSucc = false) => {
    seteditTodoId(null);
    if (isSucc) {
      setSkip(0);
    }
  };

  const openDeleteTodo = (id: string) => {
    setdeleteTodoId(id);
  };
  const closeDeleteModel = (isSucc = false) => {
    setdeleteTodoId(null);
    if (isSucc) {
      setSkip(0);
    }
  };

  const onSelectFilter = (status: string) => {
    if (filterStatus?.includes(status)) {
      setFilterStatus(filterStatus.filter(el => el !== status));
    } else {
      setFilterStatus([...(filterStatus || []), status]);
    }
  };

  const editProps = React.useMemo(() => {
    if (editTodoId && todoFromApi) {
      return todoFromApi?.find(todo => todo._id === editTodoId);
    }
  }, [editTodoId]);

  const todos = todoFromApi
    ? todoFromApi.map(el => {
        return {
          _id: el._id,
          name: el.name,
          description: el.description,
          dateTime: el.dateTime,
          status: el.status,
          action: {
            updateTodo: openEditTodo,
            deleteTodo: openDeleteTodo,
          },
        };
      })
    : [];

  const pagination = data?.data.data.pagination || {
    total: 0,
    hasNextPage: false,
  };

  const totalPageCount = limit ? Math.ceil(pagination.total / limit) : 0;
  const pageNumber = skip ? Math.ceil(skip / limit) + 1 : 1;
  return (
    <>
      <VStack w={'full'} m={4} p={4}>
        <HStack w={'full'} gap={1} justifyContent={'space-between'}>
          <Text fontSize={'1.5rem'} fontWeight={500}>
            Todo list
          </Text>
          <Flex gap={1}>
            <FilterBtn
              isSelected={!!filterStatus?.includes('upcoming')}
              onClick={onSelectFilter}
              title="upcoming"
              value="upcoming"
            />
            <FilterBtn
              isSelected={!!filterStatus?.includes('done')}
              onClick={onSelectFilter}
              title="Done"
              value="done"
            />
          </Flex>
          <AddNewBtn onClick={openAddTodo} title="Add todo" />
        </HStack>
        <Divider borderColor="borderColorBlackOpacity" />
        <DataTable
          data={todos}
          columns={todoColumn}
          isClientSidePagination={false}
          emptyScreen={
            <EmptyScreen
              title="No Todo"
              description={`There are no todo yet`}
            />
          }
          paginationProps={{
            pageSizeChange: onPageSizeChange,
            pageChange: onPageChange,
            totalDataCount: pagination.total,
            queryPageSize: limit,
            totalPageCount,
            queryPageIndex: pageNumber,
          }}
        />
        {editTodoId ? (
          <EditTodoModel
            isOpen={true}
            onClose={closeEditModel}
            initialData={editProps}
          />
        ) : null}
        {deleteTodoId ? (
          <DeleteTodoModel
            isOpen={true}
            onClose={closeDeleteModel}
            id={deleteTodoId}
          />
        ) : null}
        {isAddOpen ? <AddTodoModel isOpen onClose={closeAddModel} /> : null}
      </VStack>
    </>
  );
}
