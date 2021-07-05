import { useSchema } from "client/dvdrental"
import { Film } from "client/dvdrental/meta/types"
import Table from "core/ui/table"
import React from "react"

export default () => {
  return (
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
  )
}
