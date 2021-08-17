import {
  defaultsDeep,
  difference,
  filter,
  isEmpty,
  isNumber,
  isPlainObject,
  isUndefined,
  keys,
  map,
  mapKeys,
  startsWith,
  union,
} from "lodash"
import { DATATYPE_USERDEF, defaultSchema } from "../column"
import { useClient } from "../db/client/ClientContext"
import { useTableMeta } from "../db/meta/useTableMeta"
import { hideColumns } from "./columns/hide"
import { orderColumns } from "./columns/order"
import { JOIN_BY_PREFIX, JOIN_PREFIX } from "./join-table/constant"
import { addEmbed } from "./join-table/embed"
import { addJoin } from "./join-table/join"
import { addJoinBy } from "./join-table/join-by"
import { Schema, toSchema } from "./schema"
import { Column, Draft, UseSchema } from "./type"
import { useGetDefaultCols } from "./useGetDefaultCols"

/**
 *
 *
 *
 * useSchema
 *
 *
 * @param name
 * @param userDef
 * @param option
 * @returns
 */
const useSchema: UseSchema<any> = (
  name,
  userDef = {},
  {
    cols,
    type = "normal",
    join = {},
    joinBy = {},
    returnDraft = false,
    params = {},
    hide,
    show,
    addKeys = true,
  } = {}
) => {
  const meta = useTableMeta(name)
  const tableDesc = meta.tableDesc || name

  const getDefaultCols = useGetDefaultCols()

  if (isEmpty(cols)) {
    if (isUndefined(cols)) {
      let defaultShow = union(
        addKeys && !returnDraft && meta.keys,
        getDefaultCols(name),
        keys(userDef),
        // default show embed table (foreignKeys). hide here only effect search form，table part use a array dataIndex.
        meta.foreignKeys
      )
      // not count join ( by ) table,  if you config,  it will show.
      if (defaultShow.length < 4) {
        defaultShow = union(defaultShow, meta.cols).slice(0, 4)
      }
      hide = union(difference(meta.cols, defaultShow), hide) as any
    }
    cols = union(keys(userDef), meta.cols)
  } else {
    cols = union(cols, keys(userDef))
  }

  // when returnDraft = true, it's meaning only inner use,  no need to add keys
  if (addKeys && !returnDraft) {
    cols = meta.addKeys(cols)
  }

  cols = filter(cols, (col) => userDef[col as string] !== false)

  const _join = mapKeys(join, (_, key) => JOIN_PREFIX + key)
  const _joinBy = mapKeys(joinBy, (_, key) => JOIN_BY_PREFIX + key)
  defaultsDeep(userDef, _join, _joinBy)

  const { config } = useClient()

  const draft: Draft = {
    name,
    select: cols.join(","),
    // TODO  support compose keys
    id: meta.keys[0],
    isView: meta.isViewTable,
    sort: meta.isViewTable ? {} : { [meta.keys[0]]: "ascend" },

    columns: map(union(cols, keys(_join), keys(_joinBy)), (col) => {
      const column: Column = {
        ...(meta.getColumn(col as string) || {
          name: col as string,
          table: name,
          dataType: DATATYPE_USERDEF,
        }),
        isJoin: startsWith(col, JOIN_PREFIX),
        isJoinBy: startsWith(col, JOIN_BY_PREFIX),
        isEmbed: type === "embed",
      }

      const def = userDef[col]
      return defaultsDeep(
        { dataIndex: col, _column: column },
        // user def
        isPlainObject(def) ? def : isNumber(def) ? { _order: def } : {},
        defaultSchema(column, config, meta, params)
      )
    }),
  }

  if (returnDraft === true) {
    return {
      draft,
    } as any
  } else {
    let schema: Schema

    addJoin(draft)

    addJoinBy(draft)

    type !== "static" && addEmbed(draft, params)

    schema = toSchema(draft)

    const { columnsStateMap, onColumnsStateChange } = hideColumns(schema, {
      hide: difference(hide, show),
    })

    orderColumns(schema, columnsStateMap)

    return {
      schema,
      tableDesc,
      params,
      columnsStateMap,
      onColumnsStateChange,
    }
  }
}

export default useSchema
