import { SERVER_URL } from '@src/configs/constant';
import { todoApiPath } from './path';
import { httpClient } from '@src/configs/axios';
import { useQuery } from '@tanstack/react-query';
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

const fetchAllTodo = (limit = 10, skip = 0) => {
  return () =>
    httpClient.get<ITodoBackendResponse<IPaginatedResponse<ITodoRes>>>(
      `${SERVER_URL}/${todoApiPath.getAll}?limit=${limit}&skip=${skip}`,
    );
};

export const useFetchAllTodo = (limit = 10, skip = 0) => {
  return useQuery({
    queryKey: ['todos', limit, skip],
    queryFn: fetchAllTodo(limit, skip),
  });
};
