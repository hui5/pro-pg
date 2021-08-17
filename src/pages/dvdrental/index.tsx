import { useSchema, select } from "./client"
import { Film, FilmList } from "./client/meta/types"
import Table from "core/ui/table"

import { Collapse } from "antd"

const { Panel } = Collapse
export default () => (
  <Collapse
    ghost
    accordion={true}
    bordered={false}
    defaultActiveKey={["1"]}
    className="text-xl"
  >
    <Panel header="film" key="1">
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
    </Panel>

    <Panel header="film list" key="2">
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
    </Panel>
  </Collapse>
)
