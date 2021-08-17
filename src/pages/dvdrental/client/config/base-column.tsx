import date from "core/column/valuetype/date"
import { Item } from "core/schema/schema"

//  ------------- dvdrental---------------------

export const last_update: Item = {
  ...date,
  editable: false,
  _form: {
    valueType: "dateTime",
    readonly: true,
  },
}
