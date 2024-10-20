import { SERVER_URL } from '@src/configs/constant';
import { todoApiPath } from './path';
import { httpClient } from '@src/configs/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  IPaginatedResponse,
  ITodoBackendResponse,
} from '@src/shared-interface/api-response';

export interface ITodoRes {
  _id: string;
  name: string;
  description: string;
  dateTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status?: string;
}

export interface IAddFields {
  name: string;
  description: string;
  dateTime: string;
}

export interface IUpdateTodoFields extends Partial<IAddFields> {
  _id: string;
  status?: string;
}

const fetchAllTodo = (limit = 10, skip = 0, status?: string[]) => {
  return () =>
    httpClient.get<ITodoBackendResponse<IPaginatedResponse<ITodoRes>>>(
      `${SERVER_URL}/${todoApiPath.todo}?limit=${limit}&skip=${skip}${
        status && status.length ? `&statusFilter=${status.join(',')}` : ''
      }`,
    );
};

const addTodo = (props: IAddFields) => {
  return httpClient.post<ITodoBackendResponse<ITodoRes>>(
    `${SERVER_URL}/${todoApiPath.todo}`,
    props,
  );
};

const updateTodo = (props: IUpdateTodoFields) => {
  return httpClient.patch<ITodoBackendResponse<ITodoRes>>(
    `${SERVER_URL}/${todoApiPath.todo}/${props._id}`,
    props,
  );
};

const deleteTodo = (id: string) => {
  console.log('first', id);
  return httpClient.delete<ITodoBackendResponse<ITodoRes>>(
    `${SERVER_URL}/${todoApiPath.todo}/${id}`,
  );
};

export const useFetchAllTodo = (limit = 10, skip = 0, status?: string[]) => {
  return useQuery({
    queryKey: ['todos', limit, skip, status],
    queryFn: fetchAllTodo(limit, skip, status),
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess() {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onSuccess() {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess() {
      queryClient.invalidateQueries(['todos']);
    },
  });
};
