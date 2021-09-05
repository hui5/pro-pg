import { PostgrestClient, PostgrestFilterBuilder } from "@supabase/postgrest-js"
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { Config } from "core/schema/config"
import { QueryClient } from "react-query"
import { invalidateQueries } from "../action/useQuery"
import { QUERY_KEY_DB_META } from "../meta/useTableMeta"
import { processResult } from "./processResult"

/* PostgrestFilterBuilder  created by select, upsert ....  ,  finally return to user
   has then(onResoled, onReject) function, then can be trait as a promise   
  direct change the then function, add result err notification, and new fields for pro components 
*/
const originThen = PostgrestFilterBuilder.prototype.then
PostgrestFilterBuilder.prototype.then = function (resolve, reject) {
  return originThen.call(this, processResult).then(resolve as any, reject)
}

/**
 *
 *  init client
 */
export const initClient = ({
  API_URL,
  API_KEY,
  subscribe = false,
  staticMeta = {},
  config = {},
  baseSchema = "base",
}: {
  API_URL: string
  API_KEY?: string
  subscribe?: boolean
  staticMeta?: any
  config?: Config<any>
  baseSchema?: string
}) => {
  let pg: PostgrestClient,
    pg_base: PostgrestClient,
    supabase: SupabaseClient,
    supabase_base: SupabaseClient

  if (API_KEY) {
    supabase = createClient(API_URL, API_KEY)
    supabase_base = createClient(API_URL, API_KEY, { schema: baseSchema })
    pg = supabase as any
    pg_base = supabase_base as any
  } else {
    pg = new PostgrestClient(API_URL)
    pg_base = new PostgrestClient(API_URL, { schema: baseSchema })
  }

  // global queryClient
  // put  queryClient and supabase in one file, avoid file reload, status not consistent
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })

  subscribe &&
    supabase
      .from("*")
      .on("*", (payload) => {
        console.log(`${payload.table} ${payload.eventType}`)
        invalidateQueries(queryClient, payload.table)
      })
      .subscribe(() => console.log("subscribe"))

  subscribe &&
    supabase_base
      .from("ddl_command")
      .on("INSERT", (payload) => {
        console.log(`ddl command ${payload.new.command_tag}`)
        queryClient.invalidateQueries(QUERY_KEY_DB_META)
      })
      .subscribe(() => console.log("subscribe meta"))

  return {
    pg,
    pg_base,
    queryClient,
    supabase,
    supabase_base,
    staticMeta,
    config,
  }
}
