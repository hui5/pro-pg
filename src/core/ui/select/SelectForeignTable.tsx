import { useRPC } from "core/db/action/rpc"
import { map } from "lodash"
import React from "react"
import { SelectBase } from "./Select"

export const SelectForeignTable = ({
  table,
  field,
  by,
  constraint: [fromTable, fromField, params],
  ...props
}) => {
  const rpc = useRPC()
  return (
    <SelectBase
      request={(value) =>
        rpc("select_foreign", {
          table,
          field,
          filter: [by, `%${value}%`] as any,
          constraint: [
            fromTable,
            fromField,
            params ? map(params, (v, k) => ` and t.${k}=${v} `).join("") : "",
          ] as any,
        })
      }
      {...props}
    ></SelectBase>
  )
}
