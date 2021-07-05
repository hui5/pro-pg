import { Item } from "core/schema/schema"
import React from "react"
import { Template } from ".."
import { SelectField } from "../../ui/select/SelectField"
/**
 *
 *  select for search :   select from table [ field: name ] 's all distinct values
 *
 */
export const selectColumn: Template = ({ table, name }) => {
  return {
    renderFormItem: (schema, config, form) => {
      return <SelectField table={table} field={name}></SelectField>
    },
  }
}

export type Select<definitions> = <T extends keyof definitions>(
  table: T,
  name: keyof definitions[T]
) => Item

export const select: Select<any> = (table, name) =>
  selectColumn({ table: table as string, name: name as string })

export default select
