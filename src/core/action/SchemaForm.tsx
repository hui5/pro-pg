import { EditOutlined } from "@ant-design/icons"
import { BetaSchemaForm } from "@ant-design/pro-form"
import { FormSchema } from "@ant-design/pro-form/lib/components/SchemaForm"
import { FormInstance } from "antd"
import { default as React, ReactNode, useEffect, useRef } from "react"
import { useQueryRequest } from "../db/action/useQuery"
import useSchema from "../schema/useSchema"

export const SchemaForm = ({
  name,
  onFinish,
  columns,
  record,
  ...props
}: FormSchema & { name?: ReactNode; record?: {} }) => {
  const formRef = useRef<FormInstance>()

  // when other components change the data (like inline edit),  reset is needed
  useEffect(() => {
    formRef.current?.setFieldsValue(record)
  }, [record])
  return (
    <BetaSchemaForm
      title={name}
      formRef={formRef}
      layoutType="DrawerForm"
      // after close, data will auto clear
      onFinish={onFinish}
      columns={columns}
      trigger={<a>{name}</a>}
      // onValuesChange={(changedValues: any, values: any) => {
      //   console.log(changedValues, values);
      // }}
      // initialValues={record}
      // drawerProps={{
      //   destroyOnClose: true,
      // }}
      omitNil={false}
      {...props}
    />
  )
}

export const Edit = ({ table, id }) => {
  const formRef = useRef<FormInstance>()
  const { schema, tableDesc } = useSchema(table, {}, { cols: [] })
  const {
    upsert,
    one: { dataSource, request },
  } = useQueryRequest(schema)

  useEffect(() => {
    request({ [schema.id]: id })
  }, [])

  useEffect(() => {
    formRef.current?.setFieldsValue(dataSource)
  }, [dataSource])

  return (
    <BetaSchemaForm
      title={tableDesc || table}
      formRef={formRef}
      layoutType="DrawerForm"
      onFinish={upsert as any}
      columns={schema.form}
      trigger={
        <a>
          {id} <EditOutlined />
        </a>
      }
      omitNil={false}
    />
  )
}
