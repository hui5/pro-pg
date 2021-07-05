import ProDescriptions, {
  ProDescriptionsProps,
} from "@ant-design/pro-descriptions"
import { ActionType } from "@ant-design/pro-table"
import { useAction } from "core/action/useAction"
import { useTableMeta } from "core/db/meta/useTableMeta"
import { useGetDefaultCols } from "core/schema/useGetDefaultCols"
import useSchema from "core/schema/useSchema"
import { chain, without } from "lodash"
import React, { useEffect, useRef } from "react"

export const MiniDesc = ({
  table,
  id,
  entity,
  ...props
}: { table: any; id: any; entity: any } & ProDescriptionsProps) => {
  const actionRef = useRef<ActionType>()
  const meta = useTableMeta(table)
  const { schema } = useSchema(
    table,
    {},
    { cols: without(meta.cols, ...meta.foreignKeys) as any }
  )

  const { request, columns } = useAction({ schema, actionRef })
  useEffect(() => {
    request.one.request({ [schema.id]: id })
  }, [])
  const data = request.one.dataSource || entity || {}

  const getDefaultCols = useGetDefaultCols()

  const [titleCol, ...otherCols] = chain(getDefaultCols(table))
    .union(meta.cols)
    .without(...meta.foreignKeys)
    .slice(0, 5)
    .value()

  return (
    <ProDescriptions
      dataSource={data}
      title={data[titleCol]}
      columns={without(otherCols, ...meta.keys).map((col) =>
        columns.find((item) => item.dataIndex === col)
      )}
      actionRef={actionRef}
      size="small"
      column={1}
      style={{ width: "250px" }}
      // labelStyle={{ minWidth: '30px' }}
      {...props}
    ></ProDescriptions>
  )
}
