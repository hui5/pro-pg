import { client } from "client/dvdrental"
import { ClientProvider } from "core/db/client/ClientContext"
import React from "react"

export default ({ children }) => {
  return <ClientProvider client={client}>{children}</ClientProvider>
}
