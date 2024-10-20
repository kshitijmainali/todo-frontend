import { SERVER_URL } from '@src/configs/constant';
import { todoApiPath } from './path';
import { httpClient } from '@src/configs/axios';
import { useQuery } from '@tanstack/react-query';

const fetchAllTodo = async () => {
  return httpClient.get(`${SERVER_URL}/${todoApiPath.getAll}`);
};

export const useFetchAllTodo = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchAllTodo,
  });
};
