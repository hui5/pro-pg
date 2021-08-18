import { Select, select as _select } from "core/column/valuetype/search-select"
import { initClient } from "core/db/client/initClient"
import { UseSchema } from "core/schema/type"
import { default as _useSchema } from "core/schema/useSchema"
import { API_KEY, API_URL } from "./api_key"
import { definitions } from "./meta/definitions"
import { staticMeta } from "./meta/meta"
import config from "./config"

export const client = initClient({
  API_URL,
  API_KEY,
  staticMeta,
  config,
  subscribe: true,
})

export const useSchema: UseSchema<definitions> = _useSchema

export const select: Select<definitions> = _select
