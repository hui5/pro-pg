import date from "core/column/valuetype/date"
import year from "core/column/valuetype/year"
import { Config } from "core/schema/config"
import { EmbedParams } from "core/schema/join-table/embed"
import { Column } from "core/schema/type"
import { definitions } from "./meta/definitions"

const config: Config<definitions> = {
  cols: { actor: ["fullname"] },
  schema: {
    film: {
      release_year: year,
    },
  },
  options: {},
  baseColumns: {
    last_update: {
      ...date,
      editable: false,
      _form: {
        valueType: "dateTime",
        readonly: true,
      },
    },
  },
  template: {
    embed: ({ table, name }: Column, { cols, desc }: EmbedParams) => ({
      // title: name,
    }),
  },
}

export default config
