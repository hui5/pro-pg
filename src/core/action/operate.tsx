import { ProFormColumnsType } from "@ant-design/pro-form"
import { ButtonProps } from "antd"
import { filter, flatten, isString, map } from "lodash"
import { Schema } from "../schema/schema"
import { useQueryRequest } from "../db/action/useQuery"

/**
 *
 *
 *   operate interface
 *
 *
 */

export type Operate<T> = DefaultOper | UserOper<T> | OperOption

type DefaultOper =
  | "create"
  | "inline_edit"
  | /** default inline edit */ "edit" /** default edit */

export type UserOper<T = any> = {
  name: string

  set?: { [key in keyof T]?: T[key] }

  // default in toolbar,  can enable in row , set showInRow = true
  form?: (keyof T | ProFormColumnsType)[]

  // only in row
  fun?: (record: T, request: ReturnType<typeof useQueryRequest>) => any
  // both in row and toolbar
  funs?: (records: T[], request: ReturnType<typeof useQueryRequest>) => any

  hide?: (record: T) => boolean
  show?: (record: T) => boolean

  /** defalut true */
  relaod?: boolean

  // records in toolbar can't refresh when changed.  so force clearSelected = true
  /** defalut false */
  // clearSelected?: boolean;

  /** form operate default hide in row,  showInRow can enable it */
  showInRow?: boolean

  button?: ButtonProps
}

type OperOption = {
  /** defalut 2 , only include userOpers */
  maxInRow?: number
  /** defalut true */
  batchDelete?: boolean
}

type GroupOpers<T> = {
  defaultOpers: DefaultOper[]
  userOpers: (Omit<UserOper<T>, "form"> & { form?: ProFormColumnsType[] })[]
  operOption: OperOption
}

export const groupOperates = <T extends object>(
  operates: Operate<T>[],
  schema: Schema
): GroupOpers<T> => {
  const group: GroupOpers<T> = {
    defaultOpers: [],
    userOpers: [],
    operOption: {},
  }

  operates?.forEach((oper) => {
    if (isString(oper)) {
      group.defaultOpers.push(oper)
    } else if (!("name" in oper)) {
      group.operOption = oper
    } else {
      const { form, ...props } = oper
      group.userOpers.push(
        form
          ? {
              ...props,
              form: flatten(
                map(oper.form, (item) =>
                  isString(item)
                    ? filter(schema.form, ["dataIndex", item])
                    : item
                )
              ) as ProFormColumnsType[],
            }
          : props
      )
    }
  })

  return group
}
