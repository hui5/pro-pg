import ProDescriptions, {
  ProDescriptionsProps,
} from "@ant-design/pro-descriptions"
import { ActionType } from "@ant-design/pro-table"
import { useAction } from "core/action/useAction"
import { useGetDefaultCols } from "core/schema/useGetDefaultCols"
import useSchema from "core/schema/useSchema"
import React, { useRef } from "react"
import { Dialog } from "../components/Dialog"
import LightTable from "../table/LightTable"
// import styles from "./styles.less"

export const Desc = ({
  table,
  id,
  ...props
}: { table: any; id: any } & ProDescriptionsProps) => {
  const actionRef = useRef<ActionType>()
  const { schema, tableDesc } = useSchema(table, {}, { cols: [] })
  const { request, columns, editable } = useAction({ schema, actionRef })
  const getDefaultCols = useGetDefaultCols()

  return (
    <ProDescriptions
      {...request.one}
      params={{ [schema.id]: id }}
      title={
        <Dialog trigger={tableDesc || table}>
          <LightTable
            {...useSchema(table, {}, { cols: getDefaultCols(table) })}
          ></LightTable>
        </Dialog>
      }
      columns={columns}
      actionRef={actionRef}
      editable={editable}
      // className={styles.descriptions}
      {...props}
    ></ProDescriptions>
  )
}
