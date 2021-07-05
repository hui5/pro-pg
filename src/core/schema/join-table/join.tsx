import { Typography } from "antd"
import { BadgeNumber } from "core/ui/components/BadgeNumber"
import { Dialog } from "core/ui/components/Dialog"
import LightTable from "core/ui/table/LightTable"
import { StaticTable } from "core/ui/table/StaticTable"
import { each, startsWith, without } from "lodash"
import React from "react"
import { ColumnMeta, TableMeta, useTableMeta } from "../../db/meta/useTableMeta"
import useSchema from "..//useSchema"
import { Item } from "../schema"
import { Draft, JoinItem, UserItem } from "../type"
import { useGetDefaultCols } from "../useGetDefaultCols"
import { JOIN_KEY_SPLITER, JOIN_PREFIX } from "./constant"
const { Text, Link } = Typography

/**
 *
 *   one-to-many ralation
 */

const isJoin = (column: UserItem<any, any>): column is JoinItem<any, any> =>
  startsWith(column.dataIndex.toString(), JOIN_PREFIX)

export const addJoin = (draft: Draft) => {
  const getDefaultCols = useGetDefaultCols()

  each(draft.columns, (item) => {
    if (isJoin(item)) {
      const name = item.dataIndex.toString()

      const [table, field] = name
        .replace(JOIN_PREFIX, "")
        .split(JOIN_KEY_SPLITER)
      const { cols = without(getDefaultCols(table), field) } = item

      const meta = useTableMeta(table)

      draft.select = `${draft.select},${name}:${table}!${field}(${meta
        .addKeys(cols)
        .join(",")})`

      draft.sort[`${name}.${meta.keys[0]}`] = "ascend"
    }
  })
}

/**
 *
 *   join column template
 */
export const join = (
  { table: fromTable, name }: ColumnMeta,
  fromMeta: TableMeta
) => {
  const [table, field] = name.replace(JOIN_PREFIX, "").split(JOIN_KEY_SPLITER)
  const getDefaultCols = useGetDefaultCols()

  return {
    title: <Text keyboard>{fromMeta.tableDesc || fromTable}</Text>,
    render: (val: [], record) => (
      <Dialog trigger={<BadgeNumber num={val.length} />}>
        <LightTable
          {...useSchema(
            table,
            { [field]: false },
            { params: { [field]: record[fromMeta.keys.toString()] } }
          )}
          subTitle={record[getDefaultCols(fromTable)[0]]}
        ></LightTable>
      </Dialog>
    ),

    editable: false,

    _search: false,

    _form: {
      renderFormItem: (schema, config, form) => {
        return (
          <StaticTable
            value={config["value"]}
            table={table}
            plain
          ></StaticTable>
        )
      },
    },
  } as Item
}
