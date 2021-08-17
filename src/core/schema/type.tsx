import { ColumnsState } from "@ant-design/pro-table"
import { ColumnMeta } from "../db/meta/useTableMeta"
import {
  EMBED_PREFIX,
  JOIN_BY_PREFIX,
  JOIN_PREFIX,
} from "./join-table/constant"
import { DB, Item, Schema } from "./schema"

export type UseSchema<definitions> = <
  N extends keyof definitions & string,
  T extends definitions[N],
  ReturnDraft extends boolean = false
>(
  name: N,
  userDef?: UserDef<T>,
  option?: {
    /**
     *  isUndefined,  cols = meta.cols   show default cols
     *  isEmpty []    cols = meta.cols   show all cols
     *  not empty     cols = cols        show cols
     */
    cols?: (keyof T & string)[] | []
    type?: "normal" | "embed" | "static"
    join?: Join<T, ExtractByPre<T, JOIN_PRE>>
    joinBy?: JoinBy<T, ExtractByPre<T, JOIN_BY_PRE>>
    /**  when returnDraft: addKeys will force set to false .  only return draft, no join table added.  */
    returnDraft?: ReturnDraft
    /**  embed use it  to filter foreign table ,  meanwhile return pass to table  */
    params?: Partial<UserEntity<T>>
    /**  columns state */
    hide?: (keyof T)[]
    show?: (keyof T)[] // only a additional to hide

    /** whether add keys, only work when cols is set,   default true   */
    addKeys?: boolean
  }
) => ReturnDraft extends true
  ? {
      // inner use
      draft: Draft
    }
  : {
      schema: Schema
      tableDesc: string
      /** not modify, direct return  */
      params: Partial<UserEntity<T>>
      columnsStateMap?: Record<string, ColumnsState>
      onColumnsStateChange?: (map: Record<string, ColumnsState>) => void
    }

export type UserDef<T> = {
  [key in keyof UserEntity<T>]?: false | number | UserItem<T, key>
}

type UserEntity<T> = Omit<T, EMBED_KEY | JOIN_KEY | JOIN_BY_KEY>

export type Embed<T> =
  | {
      [key in keyof T]?: Pick<Item<T>, "title" | "render">
    }
  | false

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

export type ExtractByPre<T, Prefix extends string> = {
  [key in keyof T as key extends `${Prefix}${infer keyWithoutPrefix}`
    ? keyWithoutPrefix
    : never]?: T[key]
}

type EMBED_PRE = typeof EMBED_PREFIX
export type EMBED_KEY = `${EMBED_PRE}${string}`
type JOIN_PRE = typeof JOIN_PREFIX
export type JOIN_KEY = `${JOIN_PRE}${string}`
type JOIN_BY_PRE = typeof JOIN_BY_PREFIX
export type JOIN_BY_KEY = `${JOIN_BY_PRE}${string}`

export type UserItem<T, K> = K extends keyof T
  ? K extends JOIN_KEY
    ? JoinItem<T, T[K]>
    : K extends JOIN_BY_KEY
    ? JoinByItem<T, K>
    : `${EMBED_PRE}${K & string}` extends keyof T
    ? EmbedItem<T, K>
    : _Item<T>
  : _Item<T>

type _Item<T> = {
  /** order column :  1: first, ... -1 : last */
  _order?: number
} & Item<T>

export type EmbedItem<T, K> = _Item<T> & {
  _embed?: Embed<T[`${EMBED_PRE}${K & string}` & keyof T]>
}

export type JoinItem<T, I> = _Item<T> & {
  titleText?: string
  cols?: (keyof ArrayElement<I> & string)[]
}

export type JoinByItem<T, K> = JoinItem<T, K> & {
  manageable?: boolean
}

export type Join<T, J> = {
  [key in keyof J]?: JoinItem<T, J[key]>
}

export type JoinBy<T, J> = {
  [key in keyof J]?: JoinByItem<T, J[key]>
}

export type Column = ColumnMeta & {
  isEmbed?: boolean
  isJoin?: boolean
  isJoinBy?: boolean
}

export type DraftItem<T, K> = UserItem<T, K> & {
  _column?: ColumnMeta
}

export type Draft = DB & {
  columns: DraftItem<any, any>[]
}
