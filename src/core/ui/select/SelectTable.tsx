import { Space, Typography } from "antd"
import { useQueryTable } from "core/db/action/useQuery"
import { map } from "lodash"
import { default as React, useEffect, useState } from "react"
import { SelectBase } from "./Select"
const { Text, Link } = Typography

export const SelectTable = ({ table, field: key, by: cols, ...props }) => {
  const queryTable = useQueryTable()

  const customOption = ({ value, [cols[0]]: label, ...other }) => ({
    value,
    label: (
      <Space>
        <Text>{label}</Text>
        {map(other, (v, k) => (
          <Text key={k} type="secondary">
            {v}
          </Text>
        ))}
      </Space>
    ),
  })

  const [initOptions, setInitOptions] = useState<any[]>([])

  useEffect(() => {
    if (props.value) {
      queryTable(table)
        .select(`value:${key},${cols.join(",")}`)
        .eq(key, props.value)
        .then(({ data }) => setInitOptions(data.map(customOption)))
    } else {
      setInitOptions([])
    }
  }, [])

  return (
    <SelectBase
      // close select filter. otherwise has problems when label is ReactNode.
      // select is already filter by request. no need filter again
      filterOption={false}
      initOptions={initOptions}
      request={async (value) => {
        return (
          await queryTable(table)
            .select(`value:${key},${cols.join(",")}`)
            .ilike(cols[0], `%${value}%`)
            .limit(8)
        ).data?.map(customOption)
      }}
      {...props}
    ></SelectBase>
  )
}
