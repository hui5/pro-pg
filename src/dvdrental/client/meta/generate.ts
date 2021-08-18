import { generate } from "core/db/meta/generate"
import { API_KEY, API_URL } from "../api_key"
import config from "../config"

generate({
  API_KEY,
  API_URL,
  pathName: __dirname,
  optionsConfig: config.options,
})
