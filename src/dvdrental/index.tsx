import { ClientProvider } from "core/db/client/ClientContext"

import { client, useSchema, select } from "./client"
import { Film, FilmList } from "./client/meta/types"
import Table from "core/ui/table"

import Tabs from "components/Tabs"

export const Page = () => (
  <Tabs name="dvdrental">
    <Table<Film>
      {...useSchema(
        "film",
        {
          release_year: {
            _search: {
              _operator: "lte",
            },
          },
        },
        {
          join: { inventory__film_id: {} },
          joinBy: { film_category: { cols: ["name"] }, film_actor: {} },

          hide: ["description"],
        }
      )}
    />

    <Table<FilmList>
      {...useSchema("film_list", {
        category: {
          _search: select("category", "name"),
        },

        actors: {
          _search: select("actor", "fullname"),
        },
      })}
    />
  </Tabs>
)

export default () => (
  <ClientProvider client={client}>
    <Page />
  </ClientProvider>
)
