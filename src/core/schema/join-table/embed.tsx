import { Space, Typography } from "antd"
import { DrawerDesc } from "core/ui/descriptions/DrawerDesc"
import { SelectForeignTable } from "core/ui/select/SelectForeignTable"
import { SelectTable } from "core/ui/select/SelectTable"
import { chain, indexOf, isEmpty, keys } from "lodash"
import React from "react"
import { useTableMeta } from "../../db/meta/useTableMeta"
import { Item } from "../schema"
import { Column, Draft, DraftItem, Embed, EmbedItem } from "../type"
import { useGetDefaultCols } from "../useGetDefaultCols"
import useSchema from "../useSchema"
import { EMBED_PREFIX } from "./constant"
const { Text, Link } = Typography

/**
 *
 *    many-to-one realation
 *
 *
 *    embed data name :  [foreignFiedld]__[foreignTable]
 *
 */

const isEmbed = (item: DraftItem<any, any>): item is EmbedItem<any, any> =>
  item._column?.isForeignKey

export const addEmbed = (draft: Draft, params: { [key: string]: any }) => {
  const meta = useTableMeta(draft.name)
  const getDefaultCols = useGetDefaultCols()

  // @ts-ignore
  draft.columns = chain(draft.columns)
    .map((item) => {
      const name = item.dataIndex as string
      const desc = meta.colDesc(name)

      if (isEmbed(item)) {
        const {
          to: { table, key },
          constraint,
        } = meta.embed[name]

        const _embed: Embed<any> = item._embed
        const cols = isEmpty(_embed) ? getDefaultCols(table) : keys(_embed)

        const { draft: embedDraft } = useSchema(table, _embed || {}, {
          cols,
          type: "embed",
          returnDraft: true,
          params: {
            name,
            desc,
            cols,
          } as EmbedParams,
        })

        // embed data name :  [foreignFiedld]__[foreignTable]
        // cant direct use [name], it already exist, keep foreign id.
        const alias = `${EMBED_PREFIX}${name}`
        if (_embed !== false) {
          draft.select = `${draft.select},${alias}:${table}!${constraint}(*)`
        }

        return [
          {
            ...item,

            hideInTable: _embed !== false,
            hideInDescriptions: _embed !== false,

            title: _embed?.[embedDraft.columns[0].dataIndex as string]
              ?.title || <Text underline>{desc || name}</Text>,

            _search: embedDraft.columns[0]._column.isTextType
              ? {
                  renderFormItem: () => (
                    <SelectForeignTable
                      table={table}
                      field={key}
                      by={cols[0]}
                      constraint={[draft.name, name, params]}
                      placeholder={embedDraft.columns[0].title as string}
                    ></SelectForeignTable>
                  ),
                }
              : {}, // number direct search

            _form: {
              width: "md",
              renderFormItem: () => (
                <SelectTable table={table} field={key} by={cols}></SelectTable>
              ),
            },
          } as Item,

          ...(_embed !== false
            ? embedDraft.columns.map(
                ({ dataIndex, ...other }, index) =>
                  ({
                    dataIndex: [alias, dataIndex],

                    ...other,

                    _search: false,
                    onFilter: true,
                    _form: false,
                    editable: false,
                  } as Item)
              )
            : []),
        ]
      } else {
        return item
      }
    })
    .flatten()
    .value()
}

export type EmbedParams = {
  name: string
  desc: string
  cols: string[]
}

/**
 *
 *  embed column template
 */
export const embed = (
  { table, name: col }: Column,
  { name, desc, cols }: EmbedParams
): Pick<Item, "title" | "render"> => {
  return {
    title: (_, type) => {
      return (
        <EmbedTitle
          col={col}
          table={table}
          desc={desc}
          index={indexOf(cols, col)}
          type={type}
        ></EmbedTitle>
      )
    },

    render: (val, entity) => {
      return (
        <DrawerDesc table={table} id={entity[name]} entity={entity}>
          {val}
        </DrawerDesc>
      )
    },
  }
}

const EmbedTitle = ({ col, table, desc: foreignKeyDesc, index = 0, type }) => {
  const meta = table && useTableMeta(table)
  const colDesc = meta.colDesc(col) || col
  const tableDesc = foreignKeyDesc || meta.tableDesc || table

  return type === "table" ? (
    index > 0 ? (
      <Space>
        <Text>:{colDesc}</Text>
      </Space>
    ) : (
      <Text underline>{tableDesc}</Text>
    )
  ) : (
    <Space>
      <Text code>{tableDesc}</Text>
      <span>:</span>
      <Text>{colDesc}</Text>
    </Space>
  )
}
