import { useRPC } from "core/db/action/rpc"
import React from "react"
import { SelectBase } from "./Select"

export const SelectField = ({ table, field, ...props }) => {
  const rpc = useRPC()
  return (
    <SelectBase
      request={() => rpc("select", { table, field })}
      {...props}
    ></SelectBase>
  )
}
