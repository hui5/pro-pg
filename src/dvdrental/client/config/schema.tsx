import year from "core/column/valuetype/year"
import { SchemaConfig } from "core/schema/config"
import { definitions } from "../meta/definitions"
/**
 *
 * value type config
 */
export default {
  film: {
    release_year: year,
  },
} as SchemaConfig<definitions>
