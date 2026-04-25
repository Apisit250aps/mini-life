import createFetchClient from 'openapi-fetch'
import createClient from 'openapi-react-query'
import type { paths } from '@/lib/client/api/v1'
import { mapDatesDeep } from '@/lib/client/utils/date'

const fetchClient = createFetchClient<paths>({
  baseUrl: '/api',
})

const $api = createClient(fetchClient)

type ApiUseQuery = typeof $api.useQuery
type ApiUseMutation = typeof $api.useMutation
type ApiQueryArgs = Parameters<ApiUseQuery>
type ApiQueryResult = ReturnType<ApiUseQuery>
type ApiMutationArgs = Parameters<ApiUseMutation>
type ApiMutationResult = ReturnType<ApiUseMutation>
type QuerySelect = (data: unknown) => unknown

const rawUseMutation = $api.useMutation as unknown as ApiUseMutation

function withMappedDates(select?: QuerySelect): QuerySelect {
  return (data: unknown) => {
    const mapped = mapDatesDeep(data)
    return select ? select(mapped) : mapped
  }
}

function createQuery(args: ApiQueryArgs): ApiQueryResult {
  const [method, url, init, options, queryClient] = args
  const nextOptions = {
    ...(options ?? {}),
    select: withMappedDates(options?.select as QuerySelect | undefined),
  }

  return $api.useQuery(method, url, init, nextOptions, queryClient)
}

export const useApiQuery: ApiUseQuery = ((...args: ApiQueryArgs) => {
  return createQuery(args)
}) as ApiUseQuery

export const useApiMutation: ApiUseMutation = ((...args: ApiMutationArgs) => {
  return rawUseMutation(...args)
}) as unknown as ApiUseMutation

export const useApiQueryWithDates: ApiUseQuery = ((...args: ApiQueryArgs) => {
  return createQuery(args)
}) as ApiUseQuery

export const useApiMutationWithDates: ApiUseMutation = ((
  ...args: ApiMutationArgs
) => {
  const mutation = rawUseMutation(...args) as ApiMutationResult

  const originalMutateAsync = mutation.mutateAsync.bind(mutation)
  mutation.mutateAsync = async (
    ...params: Parameters<typeof originalMutateAsync>
  ) => {
    const result = await originalMutateAsync(...params)
    return mapDatesDeep(result)
  }

  return mutation
}) as unknown as ApiUseMutation

export { $api }
