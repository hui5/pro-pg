import { ClientProvider } from "core/db/client/ClientContext"

import { client, useSchema } from "./client"
import Table from "core/ui/table"
import { Actor, TodoActor, Todo } from "demo/client/meta/types"
import { BadgeNumber } from "core/ui/components/BadgeNumber"
import { Dialog } from "core/ui/components/Dialog"
import LightTable from "core/ui/table/LightTable"
import { filter } from "lodash"
import { Collapse } from "antd"

const { Panel } = Collapse
const Page = () => (
  <Collapse
    ghost
    accordion={true}
    bordered={false}
    defaultActiveKey={[]}
    className="text-xl"
  >
    <Panel header="actor" key="1">
      <Table<Actor>
        {...useSchema(
          "actor",
          {},
          {
            join: {
              todo__creator: { title: "创建的任务" },
              todo_actor__actor_id: {
                title: "管理的任务",
                render: (val: TodoActor[], record) => (
                  <Dialog
                    trigger={
                      <BadgeNumber
                        num={filter(val, (item) => item.is_manager).length}
                      />
                    }
                  >
                    <LightTable
                      {...useSchema(
                        "todo_actor",
                        { is_manager: false, actor_id: false },
                        {
                          params: {
                            is_manager: true,
                            actor_id: record.id,
                          },
                        }
                      )}
                    ></LightTable>
                  </Dialog>
                ),
                _form: false,
              },
            },

            joinBy: { todo_actor: { title: "参与的任务" } },
          }
        )}
      />
    </Panel>

    <Panel header="todo" key="2">
      <Table<Todo>
        {...useSchema(
          "todo",
          {
            creator: {
              _order: 3,
              _embed: {
                name: { title: "test" },
              },
            },

            done: -1,
          },

          {
            cols: [],
            joinBy: { todo_actor: {} },
            join: { todo_actor__todo_id: {} },
          }
        )}
        operates={["edit", { name: "修改完成状态", form: ["done"] }]}
      />
    </Panel>
  </Collapse>
)

export default () => (
  <ClientProvider client={client}>
    <Page />
  </ClientProvider>
)
