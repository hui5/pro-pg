import { generate } from "../../../core/db/meta/generate"
import { API_KEY, API_URL } from "../api_key"
import optionsConfig from "../config/options"

generate({ API_KEY, API_URL, pathName: __dirname, optionsConfig })
