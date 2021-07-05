import { LightFilterProps } from "@ant-design/pro-form/lib/layouts/LightFilter"
import { ParamsType } from "@ant-design/pro-provider"
import type { ActionType, ProTableProps } from "@ant-design/pro-table"
import ProTable from "@ant-design/pro-table"
import { useTableMeta } from "core/db/meta/useTableMeta"
import { at, map } from "lodash"
import React, { useRef } from "react"
import { Operate } from "../../action/operate"
import { useAction } from "../../action/useAction"
import { Schema } from "../../schema/schema"

const LightTable = <T extends object>({
  schema,
  tableDesc,
  subTitle,
  operates,
  ...props
}: {
  schema: Schema
  tableDesc?: string
  subTitle?: string
  operates?: Operate<T>[]
} & ProTableProps<any, ParamsType>) => {
  const actionRef = useRef<ActionType>()

  const { request, columns, Create, Action, editable, batch, ID } = useAction({
    schema,
    actionRef,
    operates: operates || [],
  })

  /**
   *
   * surport compose keys:  join table
   */
  const meta = useTableMeta(schema.name)
  const keys = meta.keys

  return (
    <ProTable
      {...request.list}
      columns={columns}
      actionRef={actionRef}
      editable={editable}
      rowKey={keys.join(",")}
      search={{
        filterType: "light",
        ignoreRules: true,
      }}
      type="table"
      postData={(data) =>
        map(data, (row) => ({
          ...row,
          [keys.join(",")]: at(row, keys).join(","),
        }))
      }
      // @ts-ignore
      form={
        {
          collapse: true,
          ignoreRules: true,
        } as LightFilterProps<any>
      }
      options={{
        setting: true,
        density: false,
        fullScreen: true,
        reload: false,
      }}
      pagination={{
        pageSize: 10,
        simple: true,
      }}
      dateFormatter="string"
      toolbar={{
        title: tableDesc || schema.name,
        subTitle,
      }}
      // toolBarRender={() => []}
      {...batch}
      {...(!operates || operates.length === 1 ? { rowSelection: false } : {})}
      {...props}
    />
  )
}

export default LightTable
