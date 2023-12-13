import useAspidaSWR from '@aspida/swr'
import { api } from './api'
import { KeyedMutator } from 'swr'

export function useUser(): {
  userName: string | undefined
  isLoading: boolean
  isError: boolean
  mutate: KeyedMutator<any>
} {
  const query = { userId: '1' }
  const { data, error, isLoading, mutate } = useAspidaSWR(api.user, {
    query,
  })
  return {
    userName: data?.userName,
    isLoading,
    isError: error,
    mutate,
  }
}
