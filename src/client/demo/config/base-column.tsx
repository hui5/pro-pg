import date from "core/column/valuetype/date"
import { Item } from "core/schema/schema"

export const id: Item = {
  title: "ID",
}

/*
   时间
*/

export const created_at: Item = {
  title: "创建时间",
  ...date,
  editable: false,
  _form: {
    readonly: true,
  },
}

export const updated_at: Item = {
  title: "修改时间",
  _table: false,
  _form: {
    valueType: "dateTime",
    readonly: true,
  },
}
