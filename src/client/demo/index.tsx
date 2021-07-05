import { Select, select as _select } from "core/column/valuetype/search-select"
import { UseSchema } from "core/schema/type"
import { default as _useSchema } from "core/schema/useSchema"
import { initClient } from "../../core/db/client/initClient"
import { API_KEY, API_URL } from "./api_key"
import * as baseColumns from "./config/base-column"
import cols from "./config/cols"
import options from "./config/options"
import schema from "./config/schema"
import { definitions } from "./meta/definitions"
import { staticMeta } from "./meta/meta"

export const client = initClient({
  API_URL,
  API_KEY,
  staticMeta,
  config: {
    cols,
    schema,
    options,
    baseColumns,
  },
  subscribe: false,
})

export const useSchema: UseSchema<definitions> = _useSchema

export const select: Select<definitions> = _select
