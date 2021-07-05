import { select, useSchema } from "client/dvdrental"
import { FilmList } from "client/dvdrental/meta/types"
import Table from "core/ui/table"
import React from "react"

export default () => {
  return (
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
  )
}
