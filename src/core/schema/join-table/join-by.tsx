import { useClient } from "core/db/client/ClientContext"
import { Text } from "core/ui/components/Text"
import { SelectForeignTable } from "core/ui/select/SelectForeignTable"
import { each, map, startsWith } from "lodash"
import React from "react"
import { ColumnMeta, TableMeta, useMeta } from "../../db/meta/useTableMeta"
import { Item } from "../schema"
import { Draft, JoinByItem, UserItem } from "../type"
import { useGetDefaultCols } from "../useGetDefaultCols"
import { JOIN_BY_PREFIX } from "./constant"
import { JoinEdit } from "./join-by/JoinEdit"
import { JoinShow } from "./join-by/JoinShow"

/**
 *
 * many-to-many relation
 */

const isJoinBy = (column: UserItem<any, any>): column is JoinByItem<any, any> =>
  startsWith(column.dataIndex.toString(), JOIN_BY_PREFIX)

export const addJoinBy = (draft: Draft) => {
  const meta = useMeta()
  const getDefaultCols = useGetDefaultCols()

  each(draft.columns, (item) => {
    if (isJoinBy(item)) {
      const name = item.dataIndex.toString()

      const joinByTable = name.replace(JOIN_BY_PREFIX, "")

      const { to, by } = meta[draft.name].joinBy[joinByTable]
      const table = to.table
      const tableMeta = meta[table]

      const {
        cols = getDefaultCols(table),
        manageable = false,
        titleText = tableMeta.tableDesc || table,
      } = item

      const alias = name
      draft.select = `${
        draft.select
      },${alias}:${table}!${joinByTable}(${tableMeta.addKeys(cols).join(",")})`

      draft.sort[`${alias}.${tableMeta.keys[0]}`] = "ascend"

      item["_data"] = {
        cols,
        manageable,
        titleText,
      }
    }
  })
}

const schemaData = (schema) =>
  (schema["originProps"]?.["_data"] || schema?.["_data"] || {}) as {
    cols: string[]
    manageable: boolean
    titleText: string
  }

/**
 *
 *  join by column template
 */

export const joinBy = ({ name }: ColumnMeta, tableMeta: TableMeta) => {
  const joinByMeta = tableMeta.joinBy[name.replace(JOIN_BY_PREFIX, "")]
  const { from, to, by } = joinByMeta

  const { pg } = useClient()

  return {
    title: (scheam, type, dom) => {
      const { titleText } = schemaData(scheam)
      return (
        <Text keyboard={type === "table"} mark={type === "form"}>
          {titleText}
        </Text>
      )
    },
    render: (value, record, index, action, schema) => {
      const { cols, titleText } = schemaData(schema)
      return (
        <JoinShow
          meta={joinByMeta}
          fromRecord={record}
          title={titleText}
          cols={cols}
          value={value as object[]}
        ></JoinShow>
      )
    },

    editable: false,

    _search: {
      // first : find child key value
      renderFormItem: (schema, config, form) => {
        const { cols } = schemaData(schema)
        return (
          <SelectForeignTable
            table={to.table}
            field={to.key}
            by={cols?.[0]}
            constraint={[by.table, by.toKey, null]}
          ></SelectForeignTable>
        )
      },

      // second : through child key value , find  all parent key values , and filter
      _transform: async (field, val, query) => {
        const result = (
          await pg.from(by.table).select(by.fromKey).eq(by.toKey, val)
        ).data
        query.in(from.key, map(result, by.fromKey))
      },
    },

    _form: {
      renderFormItem: (schema, config, form) => {
        const { cols, manageable, titleText } = schemaData(schema)
        return (
          <JoinEdit
            meta={joinByMeta}
            fromRecord={form.getFieldsValue(true)}
            manageable={manageable}
            title={titleText}
            cols={cols}
          ></JoinEdit>
        )
      },
    },
  } as Item
}
