import { ActionType } from "@ant-design/pro-table"
import { PostgrestResponse } from "@supabase/postgrest-js/dist/main/lib/types"
import { Schema } from "core/schema/schema"
import {
  chain,
  cloneDeep,
  each,
  includes,
  isEqual,
  isUndefined,
  merge,
  omit,
  some,
} from "lodash"
import React, { useMemo, useState } from "react"
import {
  QueryClient,
  QueryKey,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "react-query"
import { useClient } from "../client/ClientContext"
import Request from "./request"

/**
 *
 *    query key format :
 *
 *    [ relatedTables: [...], table, params: search & pageInfo, sort, filter]
 *
 */
export const invalidateQueries = (queryClient: QueryClient, table) => {
  queryClient
    .getQueryCache()
    .getAll()
    .forEach(
      (item) =>
        includes(item.queryKey[0], table) &&
        queryClient.invalidateQueries(item.queryKey)
    )
}
export const getCacheQuery = (queryClient: QueryClient, table, params) =>
  queryClient
    .getQueryCache()
    .getAll()
    .find(
      (item) => item.queryKey[1] === table && isEqual(item.queryKey[2], params)
    )

/**
 *
 *  wrap pg.from(table)
 */
export const useQueryTable = () => {
  const { pg, queryClient } = useClient()
  return (table: string) => {
    const builder = pg.from(table)
    const _then = builder.then
    builder.then = function (resolve, reject) {
      const url: URL = this.url
      const params = {}
      url.searchParams.forEach((val, key) => (params[key] = val))
      return queryClient
        .fetchQuery(
          [[table], table, params],
          async () =>
            await new Promise<PostgrestResponse<any>>((r) =>
              _then.call(this, r)
            )
        )
        .then((data) => resolve(data))
    }
    return builder
  }
}

/**
 *
 *   query table list ( plain )
 *
 */
export const useQueryList = <T,>(
  table,
  params: { [key in keyof T]?: any } = {},
  options: UseQueryOptions<T[], unknown, T[], QueryKey> = {}
) => {
  const { pg } = useClient()
  const { isLoading, data } = useQuery<T[]>(
    [[table], table, params],
    async () => {
      if (some(params, isUndefined)) {
        return []
      }
      const query = pg.from<T>(table).select()
      each(params, (v, k) => query.eq(k as keyof T, v))
      const { data } = await query
      return data
    },
    { staleTime: Infinity, ...options }
  )
  return isLoading ? [] : data
}

/**
 *
 *
 *
 *  wrap request
 *
 */
export const useQueryRequest = (
  schema: Schema,
  actionRef?: React.MutableRefObject<ActionType | undefined>
) => {
  const { queryClient } = useClient()
  const request = Request(schema)
  const [params, setParams] = useState([])
  // first disable query , waiting page request with params
  const [enabledQuery, setEnabledQuery] = useState(false)
  const relatedTables = chain([...schema.select.matchAll(/:([!a-zA-Z_]+)\(/g)])
    .map((item) => item[1].split("!"))
    .flatten()
    .unshift(schema.name)
    .value()

  const {
    isLoading,
    isFetching,
    data: { data, total } = { total: 0 },
  } = useQuery(
    [relatedTables, schema.name, ...params],
    async () => {
      // @ts-ignore
      // request.list can change params, which will cause query key change
      return await request.list(...cloneDeep(params))
    },
    {
      enabled: enabledQuery,
      /*from active ->
       *      inactive                          isLaading = false
       *      stale                             isLaading = false,  refetch data
       *      new key                           isLoading = true,   fetch data
       *      new key & keepPreviousData        isLoading = false,  fetch data  */
      keepPreviousData: true,
    }
  )

  /**
   * only updae total after total changed ( after request) .
   * avoid  change pageInfo  with other logic (like useSearchKeyword) at the same time,
   * which will cause conflict ( setPageInfo use requestAnimationFrame)
   */
  useMemo(() => {
    actionRef?.current?.setPageInfo?.({ total })
  }, [total])

  const requestFromPage = async (...params) => {
    // if setParams after setEnabledQuery, will cause useQuery fetch  twice
    setParams(params)
    !enabledQuery && setEnabledQuery(true)
    // return total,  avoid total lost when page current change，
    return { total }
  }

  const updateMutation = useMutation(request.upsert as any, {
    onMutate: async (newData) => {
      const cache = getCacheQuery(queryClient, schema.name, {
        [schema.id]: newData[schema.id],
      })
      // await queryClient.cancelQueries(cache.queryKey);
      if (cache) {
        const previousData = queryClient.getQueryData(cache.queryKey)
        queryClient.setQueryData(cache.queryKey, (old) =>
          merge(previousData, {
            data: [newData],
          })
        )
        return { previousData: previousData, queryKey: cache.queryKey }
      }
    },
    onError: (err, newTodo, context) => {
      context["previousData"] &&
        queryClient.setQueryData(context["queryKey"], context["previousData"])
    },
    // Always refetch after error or success:
    onSettled: () => {
      invalidateQueries(queryClient, schema.name)
    },
  })

  // use proxy, can reuse origin request's  type
  const otherRequestMethod = new Proxy(omit(request, "list"), {
    get: function (obj, prop) {
      return async (...args) => {
        const result = await obj[prop].apply(this, args)
        invalidateQueries(queryClient, schema.name)
        return result
      }
    },
  })

  return {
    list: {
      dataSource: data,
      // when page current changing or search,  display loading
      loading: isFetching,
      request: requestFromPage as any,
    },
    one: {
      dataSource: data?.[0],
      //  when refetch data , loading = false,
      //  ( import for discriptions, it can disable skeleton, avoid inner commponents remount)
      loading: isLoading,
      request: requestFromPage as any,
    },
    // optimistic update
    update: (newData) => {
      updateMutation.mutate(newData)
      return newData
    },
    ...otherRequestMethod,
  }
}
