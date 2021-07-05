import { Space } from "antd"
import { DrawerDesc } from "core/ui/descriptions/DrawerDesc"
import React from "react"
import { BadgeNumber } from "../../../ui/components/BadgeNumber"
import { Dialog } from "../../../ui/components/Dialog"
import { StaticTable } from "../../../ui/table/StaticTable"
import { ValueProps } from "../../../ui/type"
import { useGetDefaultCols } from "../../useGetDefaultCols"
import { JoinProps } from "./type"

/**
 *
 * show join info
 *
 */
export const JoinShow = ({ value, meta, ...props }: JoinProps & ValueProps) => {
  const max = 5
  const showMore = value.length > max
  const getDefaultCols = useGetDefaultCols()

  return (
    <Space wrap={true}>
      {value?.slice(0, showMore ? max - 1 : max).map((item) => (
        <DrawerDesc
          key={item[meta.to.key]}
          table={meta.to.table}
          id={item[meta.to.key]}
          entity={item}
        >
          {item[props.cols[0]]}
        </DrawerDesc>
      ))}
      {showMore && (
        <Dialog
          trigger={
            <span>
              {"..."}
              <BadgeNumber num={value.length} />
            </span>
          }
        >
          <StaticTable
            table={meta.to.table}
            value={value}
            cols={props.cols}
            subTitle={props.fromRecord[getDefaultCols(meta.from.table)[0]]}
          ></StaticTable>
        </Dialog>
      )}
    </Space>
  )
}
