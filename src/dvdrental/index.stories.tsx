import { ClientProvider } from "core/db/client/ClientContext"
import Table from "core/ui/table"
import LightTable from "core/ui/table/LightTable"
import { client } from "dvdrental/client"
import { useSchema } from "./client"
import { Film } from "./client/meta/types"

export const _0_default = () => <Table<Film> {...useSchema("film")} />

export const _1_light_table = () => <LightTable<Film> {...useSchema("film")} />

export const _2_alter_column_display = () => (
  <Table<Film>
    {...useSchema(
      "film",
      {
        title: {
          title: "电影名",
          render: (value) => <div style={{ fontWeight: "bold" }}>{value}</div>,
        },
      },
      { cols: ["title"] }
    )}
  />
)

export const _3_search = () => (
  <Table<Film>
    {...useSchema(
      "film",
      {
        title: {
          _search: false,
        },
        release_year: {
          _search: {
            title: "发布年代 <=",
            _operator: "lte",
          },
        },
      },
      {
        cols: ["title", "release_year"],
      }
    )}
  />
)

export const _4_add_operates = () => (
  <Table<Film>
    {...useSchema("film", {}, { cols: ["title", "rating"] })}
    operates={[
      "create",
      "inline_edit",
      "edit",
      { name: "修改电影级别", form: ["rating"] },
      {
        name: "修改电影为R级",
        fun: (film, request) => {
          film.rating = "R"
          request.update(film)
        },
        show: (film) => film.rating !== "R",
      },
    ]}
  />
)

export const _5_one_to_one_relation = () => (
  <Table<Film>
    {...useSchema(
      "film",
      {},
      {
        cols: ["title", "language_id"],
      }
    )}
  />
)

export const _6_one_to_many_relation = () => (
  <Table<Film>
    {...useSchema(
      "film",
      {},
      {
        cols: ["title"],
        join: { inventory__film_id: { title: "影片库存" } },
      }
    )}
  />
)

export const _7_many_to_many_relation = () => (
  <Table<Film>
    {...useSchema(
      "film",
      {
        film_id: {
          _search: false,
        },
      },
      {
        cols: ["title"],
        joinBy: { film_category: {}, film_actor: {} },
      }
    )}
  />
)

export default {
  title: "examples",
  decorators: [
    (Story) => (
      <ClientProvider client={client}>
        <Story />
      </ClientProvider>
    ),
  ],
}
