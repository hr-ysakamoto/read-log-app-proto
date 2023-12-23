import useAspidaSWR from '@aspida/swr';
import { Book, GetBookOutput } from '@repo/models/types';
import { KeyedMutator } from 'swr';
import { api } from './api';

export function useUser(): {
  userName: string | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<{ userName: string }>;
} {
  const query = { userId: '1' };
  const { data, error, isLoading, mutate } = useAspidaSWR(api.user, {
    query,
  });
  return {
    userName: data?.userName,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useBook(): {
  data: Book[] | undefined;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<GetBookOutput>;
} {
  const query = { userId: '1' };
  const { data, error, isLoading, mutate } = useAspidaSWR(api.books, {
    query,
  });
  return {
    data: data?.books || [],
    isLoading,
    isError: error,
    mutate,
  };
}
