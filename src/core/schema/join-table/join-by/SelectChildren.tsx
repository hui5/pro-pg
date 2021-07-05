import ProTable, { ActionType } from "@ant-design/pro-table"
import { differenceBy, find, map, unionBy } from "lodash"
import React, { useRef } from "react"
import { useAction } from "../../../action/useAction"
import { useJoinTableAction } from "../../../db/action/join-table"
import { USE_LOCAL_DATA } from "../../../db/action/request"
import { ValueProps } from "../../../ui/type"
import useSearchKeyword from "../../../ui/use/useSearchKeyword"
import { getSearchSchema } from "../../schema"
import useSchema from "../../useSchema"
// import styles from "./style.less"
import { JoinProps } from "./type"

export default ({
  meta,
  fromRecord,
  title,
  cols,
  onChange,
  value = [],
}: JoinProps & ValueProps) => {
  const actionRef = useRef<ActionType>()

  const { adds, dels } = useJoinTableAction(meta, fromRecord)
  const key = meta.to.key

  const isAdded = (child) => !!find(value, [key, child[key]])

  const { schema } = useSchema(meta.to.table, {}, { cols })

  const { request, columns, batch, ID } = useAction({
    schema,
    actionRef,
    operates: [
      {
        name: "添加",
        funs: async (children) => {
          await adds(children)
          onChange && onChange(unionBy(value, children, key))
        },
        hide: isAdded,
        relaod: false,
      },
      {
        name: "移除",
        funs: async (children) => {
          await dels(children)
          onChange && onChange(differenceBy(value, children, key))
        },
        button: { danger: true },
        show: isAdded,
        relaod: false,
      },
      {
        batchDelete: false,
      },
    ],
  })

  const { search, params, menu } = useSearchKeyword({
    searchSchema: getSearchSchema(schema, cols[0]),
    actionRef,
    subMode: () =>
      value.length > 0 ? { [key]: map(value, key) } : { [USE_LOCAL_DATA]: [] },
  })

  return (
    <ProTable
      {...request.list}
      params={params}
      rowKey={ID}
      actionRef={actionRef}
      columns={columns}
      // rowClassName={(record) => {
      //   return isAdded(record) ? styles["row-highlight"] : ""
      // }}
      pagination={{
        pageSize: 10,
        simple: true,
        // hideOnSinglePage: true,
      }}
      search={false}
      options={false}
      toolbar={{
        search,
        menu: menu("全部", "已添加"),
      }}
      {...batch}
    />
  )
}
