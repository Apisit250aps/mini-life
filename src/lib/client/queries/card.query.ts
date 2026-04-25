import { useApiMutationWithDates, useApiQuery } from '..'
import { mutateApiData, mutateApiSuccess } from '../utils/hooks'
import type { components } from '../api/v1'

export const useCardsQuery = () => useApiQuery('get', '/cards')

export const useCardByIdQuery = (id: string) =>
  useApiQuery('get', '/cards/{id}', {
    params: { path: { id } },
  })

export const useCardMutation = () => {
  const createMutation = useApiMutationWithDates('post', '/cards')
  const updateMutation = useApiMutationWithDates('put', '/cards/{id}')
  const deleteMutation = useApiMutationWithDates('delete', '/cards/{id}')

  const create = (data: components['schemas']['CreateCardRequest']) =>
    mutateApiData<
      components['schemas']['Card'],
      { body: components['schemas']['CreateCardRequest'] }
    >(
      createMutation.mutateAsync,
      { body: data },
      {
        queryAction: 'invalidate',
        fallbackMessage: 'Failed to create card',
      },
    )

  const update = (
    id: string,
    data: components['schemas']['UpdateCardRequest'],
  ) =>
    mutateApiData<
      components['schemas']['Card'],
      {
        params: { path: { id: string } }
        body: components['schemas']['UpdateCardRequest']
      }
    >(
      updateMutation.mutateAsync,
      {
        params: { path: { id } },
        body: data,
      },
      {
        queryAction: 'invalidate',
        fallbackMessage: 'Failed to update card',
      },
    )

  const remove = (id: string) =>
    mutateApiSuccess<{ params: { path: { id: string } } }>(
      deleteMutation.mutateAsync,
      { params: { path: { id } } },
      {
        queryAction: 'invalidate',
        fallbackMessage: 'Failed to delete card',
      },
    )

  return { create, update, remove }
}
