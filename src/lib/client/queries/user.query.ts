import { useApiMutationWithDates, useApiQuery } from '..'
import { mutateApiData, mutateApiSuccess } from '../utils/hooks'
import type { components } from '../api/v1'

export const useUsersQuery = () => useApiQuery('get', '/users')

export const useUserByIdQuery = (id: string) =>
  useApiQuery('get', '/users/{id}', {
    params: { path: { id } },
  })

export const useUserMutation = () => {
  const createMutation = useApiMutationWithDates('post', '/users')
  const updateMutation = useApiMutationWithDates('put', '/users/{id}')
  const deleteMutation = useApiMutationWithDates('delete', '/users/{id}')

  const create = (data: components['schemas']['CreateUserRequest']) =>
    mutateApiData<
      components['schemas']['User'],
      { body: components['schemas']['CreateUserRequest'] }
    >(
      createMutation.mutateAsync,
      { body: data },
      {
        queryAction: 'invalidate',
        fallbackMessage: 'Failed to create user',
      },
    )

  const update = (
    id: string,
    data: components['schemas']['UpdateUserRequest'],
  ) =>
    mutateApiData<
      components['schemas']['User'],
      {
        params: { path: { id: string } }
        body: components['schemas']['UpdateUserRequest']
      }
    >(
      updateMutation.mutateAsync,
      {
        params: { path: { id } },
        body: data,
      },
      {
        queryAction: 'invalidate',
        fallbackMessage: 'Failed to update user',
      },
    )

  const remove = (id: string) =>
    mutateApiSuccess<{ params: { path: { id: string } } }>(
      deleteMutation.mutateAsync,
      { params: { path: { id } } },
      {
        queryAction: 'invalidate',
        fallbackMessage: 'Failed to delete user',
      },
    )

  return { create, update, remove }
}
