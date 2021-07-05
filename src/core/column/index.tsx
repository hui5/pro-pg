import { Rule } from "antd/lib/form"
import array from "core/column/valuetype/array"
import boolean from "core/column/valuetype/boolean"
import date from "core/column/valuetype/date"
import { ColumnMeta, TableMeta } from "core/db/meta/useTableMeta"
import { defaultsDeep, isArray, isFunction, merge } from "lodash"
import { Config } from "../schema/config"
import { embed, EmbedParams } from "../schema/join-table/embed"
import { join } from "../schema/join-table/join"
import { joinBy } from "../schema/join-table/join-by"
import { Item } from "../schema/schema"
import { Column } from "../schema/type"
import fulltextsearch from "./valuetype/fulltextsearch"
import key from "./valuetype/key"

export type Template = (
  column: Partial<ColumnMeta>,
  tableMeta?: TableMeta
) => Item

export const DATATYPE_USERDEF = "userDef"

export const defaultTemplate = {
  key,
  array,
  date,
  boolean,
  fulltextsearch,
  join,
  joinBy,
  embed,
}

/**
 *
 *
 *
 *
 *  default column schema
 *
 */
export const defaultSchema = (
  column: Column,
  config: Config<any>,
  tableMeta: TableMeta,
  params: Record<string, any>
) => {
  const { table, name, defaultValue } = column

  let schemaDef = config.schema?.[table]?.[name]
  if (isFunction(schemaDef)) {
    schemaDef = schemaDef(column, tableMeta)
  }

  const optionsDef = config.options?.[table]?.[name]

  const selectType: Item = {
    valueType: "select",
    filters: true,
    onFilter: true,
    _form: {
      width: "sm",
    },
  }

  const configSchema: Item = defaultsDeep(
    {},

    schemaDef,

    optionsDef &&
      (isArray(optionsDef)
        ? {
            ...selectType,
            fieldProps: {
              options: optionsDef,
            },
          }
        : {
            ...selectType,
            valueEnum: optionsDef,
          }),

    config.baseColumns?.[name]
  )

  const template = new Proxy(defaultTemplate, {
    get: function (target, prop) {
      return isFunction(target[prop])
        ? (...args) =>
            merge(target[prop](...args), config.template?.[prop]?.(...args))
        : merge(target[prop], config.template?.[prop])
    },
  })

  const templateSchema: Item = defaultsDeep(
    {},

    column.isJoin && template.join(column, tableMeta),
    column.isJoinBy && template.joinBy(column, tableMeta),
    column.isEmbed && template.embed(column, params as EmbedParams),

    column.isKey && template.key(column),
    column.isGenerated && {
      editable: false,
      _form: {
        readonly: true,
      },
    },
    column.isEnum &&
      ({
        ...selectType,
        fieldProps: {
          options: column.enums,
        },
        initialValue: defaultValue && defaultValue.split("'")[1], //  'G'::mpaa_rating
        _search: {
          initialValue: null,
        },
      } as Item),
    column.isArray && template.array,
    column.isDate && template.date,
    column.isBoolean && template.boolean(column),
    column.isNumber && { valueType: "digit" },
    column.isText && { valueType: "textarea" },
    column.isFullTextSearch && template.fulltextsearch
  )

  const columnSchema: Item = defaultsDeep(
    { dataIndex: name },
    //  config
    configSchema,
    //  column value type
    templateSchema,
    // set title
    // init rules
    {
      title: column.desc || name,
      formItemProps: {
        rules: [],
      },
    } as Item
  )

  const rules: Rule[] = columnSchema["formItemProps"]?.["rules"]
  rules.push(...defaultRules(column))

  return columnSchema
}

const defaultRules = (column: ColumnMeta) => {
  const rules: Rule[] = []
  column.dataType !== DATATYPE_USERDEF &&
    !column.isNullable &&
    !column.isKey &&
    rules.push({
      required: true,
      message: "此项为必填项",
    })

  column.maxLength &&
    rules.push({
      max: column.maxLength,
      message: "最大字符数 " + column.maxLength,
    })

  return rules
}
