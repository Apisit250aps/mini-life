import { CardEntity } from '@/internal/entities/card.entity'
import { useApiMutation, useApiQuery } from '@/lib/client'

const useCardQuery = () => {
  return useApiQuery('get', '/cards', undefined)
}

const useCardByIdQuery = (id: string) =>
  useApiQuery('get', '/cards/{id}', {
    params: { path: { id } },
  })

const useCardMutation = () => {
  const createMutation = useApiMutation('post', '/cards')
  const updateMutation = useApiMutation('put', '/cards/{id}')
  const deleteMutation = useApiMutation('delete', '/cards/{id}')

  const create = (data: Omit<CardEntity, 'id' | 'createdAt' | 'updatedAt'>) =>
    createMutation.mutateAsync({
      body: {
        title: data.title,
        unit: data.unit,
        card: data.card,
        pick: data.pick,
        dangerous: data.dangerous,
        score: data.score,
        action: data.action as string,
        token: data.token as 1 | 2,
        mode: data.mode,
      },
    })
  const update = (
    id: string,
    data: Omit<CardEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ) =>
    updateMutation.mutateAsync({
      params: { path: { id } },
      body: {
        title: data.title,
        unit: data.unit,
        card: data.card,
        pick: data.pick,
        dangerous: data.dangerous,
        score: data.score,
        action: data.action,
        token: data.token as 1 | 2,
        mode: data.mode,
      },
    })
  const remove = (id: string) =>
    deleteMutation.mutateAsync({ params: { path: { id } } })

  return { create, update, remove }
}

export { useCardQuery, useCardByIdQuery, useCardMutation }
