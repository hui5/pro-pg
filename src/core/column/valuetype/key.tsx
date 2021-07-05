import { Edit } from "core/action/SchemaForm"
import { Text } from "core/ui/components/Text"
import { DrawerDesc } from "core/ui/descriptions/DrawerDesc"
import React from "react"
import { Template } from ".."

const key: Template = (column) => ({
  editable: false,
  _form: {
    readonly: true,
  },

  render: (dom, entity, index, action, schema) => {
    const val = entity[schema.dataIndex as string]
    return schema.type === "form" ? (
      <Text>{dom}</Text>
    ) : schema.type === "descriptions" ? (
      <Edit table={column.table} id={val} />
    ) : (
      <DrawerDesc table={column.table} id={val} entity={entity}>
        <Text underline>{val}</Text>
      </DrawerDesc>
    )
  },
})

export default key
