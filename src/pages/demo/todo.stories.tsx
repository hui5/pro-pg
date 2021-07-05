import { useSchema } from "client/demo"
import { Todo } from "client/demo/meta/types"
import React from "react"
import Table from "core/ui/table"

export const todo = () => {
  return (
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
  )
}

export default {
  title: "Demo",
}
