import { Select, SelectProps } from "antd"
import { useJoinTableAction } from "core/db/action/join-table"
import { useQueryList } from "core/db/action/useQuery"
import { differenceBy, find, map, unionBy } from "lodash"
import React from "react"
import { ValueProps } from "../../../ui/type"
import { JoinProps } from "./type"

/**
 *
 * Warning : will fetch all  table list.
 *
 *
 */
export default ({
  meta,
  fromRecord,
  title,
  cols,
  onChange,
  value,
  ...props
}: JoinProps & ValueProps & SelectProps<any>) => {
  const { add, del } = useJoinTableAction(meta, fromRecord)
  const key = meta.to.key

  const list = useQueryList(meta.to.table)
  const options = list.map((item) => ({
    value: item[key],
    label: item[cols[0]],
  }))

  const onSelect = async (val) => {
    const child = find(list, [key, val])
    await add(child)
    onChange && onChange(unionBy(value, [child], key))
  }

  const onDeselect = async (val) => {
    const child = find(list, [key, val])
    await del(child)
    onChange && onChange(differenceBy(value, [child], key))
  }

  return (
    <Select
      mode="multiple"
      value={map(value, key)}
      options={options}
      placeholder="请选择"
      optionFilterProp="label"
      onSelect={onSelect}
      onDeselect={onDeselect}
      {...props}
    ></Select>
  )
}
