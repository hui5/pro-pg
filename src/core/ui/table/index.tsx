import { ParamsType } from "@ant-design/pro-provider"
import type { ActionType, ProTableProps } from "@ant-design/pro-table"
import ProTable from "@ant-design/pro-table"
import React, { useRef } from "react"
import { Operate } from "../../action/operate"
import { useAction } from "../../action/useAction"
import { Schema } from "../../schema/schema"

type TableProps<T> = {
  schema: Schema
  tableDesc?: string
  operates?: Operate<T>[]
  // only for test, direct show edit
  testKey?: string | number
} & ProTableProps<any, ParamsType>

const Table = <T extends object>({
  schema,
  tableDesc,
  operates,
  testKey,
  ...props
}: TableProps<T>) => {
  const actionRef = useRef<ActionType>()

  const { request, columns, Create, editable, batch, ID, testOnly } =
    useAction<T>({
      schema,
      actionRef,
      operates:
        operates || (schema.isView ? [] : ["create", "inline_edit", "edit"]),
    })

  return (
    <ProTable
      {...request.list}
      columns={columns}
      actionRef={actionRef}
      editable={editable}
      rowKey={ID || (((_, index) => index) as any)}
      search={{
        labelWidth: "auto",
        defaultCollapsed: true,
      }}
      form={{
        syncToUrl: false,
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle={tableDesc || schema.name}
      {...(schema.isView
        ? {}
        : {
            toolBarRender: () => [!schema.isView && <Create />],
            ...batch,
          })}
      expandable={
        testKey && ({ defaultExpandedRowKeys: [testKey], ...testOnly } as any)
      }
      {...props}
    />
  )
}

export default Table
