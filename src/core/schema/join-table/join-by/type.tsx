import { JoinByMeta } from "core/db/meta/useTableMeta"
import { ReactNode } from "react"

export type JoinProps = {
  meta: JoinByMeta
  fromRecord: object
  title: string | ReactNode
  cols: string[]
}

export type Editable = {
  editable?: boolean
}
