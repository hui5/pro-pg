import { PostgrestClient } from "@supabase/postgrest-js"
import { SupabaseClient } from "@supabase/supabase-js"
import { Config } from "core/schema/config"
import React, { useContext } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

export type Client<definitions> = {
  pg: PostgrestClient
  pg_base: PostgrestClient
  queryClient: QueryClient
  supabase: SupabaseClient
  supabase_base: SupabaseClient
  staticMeta: any
  config: Config<definitions>
}

const ClientContext = React.createContext<Client<any>>(null)

export const ClientProvider = ({
  client,
  children,
}: {
  client: Client<any>
  children: any
}) => {
  return (
    <ClientContext.Provider value={client}>
      <QueryClientProvider client={client.queryClient}>
        {children}
      </QueryClientProvider>
    </ClientContext.Provider>
  )
}

export const useClient = () => {
  return useContext(ClientContext)
}
