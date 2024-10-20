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

const fetchAllTodo = (limit = 10, skip = 0) => {
  return () =>
    httpClient.get<ITodoBackendResponse<IPaginatedResponse<ITodoRes>>>(
      `${SERVER_URL}/${todoApiPath.todo}?limit=${limit}&skip=${skip}`,
    );
};

const addTodo = (props: IAddFields) => {
  return httpClient.post<ITodoBackendResponse<ITodoRes>>(
    `${SERVER_URL}/${todoApiPath.todo}`,
    props,
  );
};

export const useFetchAllTodo = (limit = 10, skip = 0) => {
  return useQuery({
    queryKey: ['todos', limit, skip],
    queryFn: fetchAllTodo(limit, skip),
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
