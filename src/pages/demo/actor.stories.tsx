import { useSchema } from "client/demo"
import { Actor, TodoActor } from "client/demo/meta/types"
import { BadgeNumber } from "core/ui/components/BadgeNumber"
import { Dialog } from "core/ui/components/Dialog"
import Table from "core/ui/table"
import LightTable from "core/ui/table/LightTable"
import { filter } from "lodash"
import React from "react"

export const actor = () => {
  return (
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
  )
}

export default {
  title: "Demo",
}
