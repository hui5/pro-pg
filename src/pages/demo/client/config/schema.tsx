import tags from "core/column/valuetype/tags"
import { SchemaConfig } from "core/schema/config"
import { definitions } from "../meta/definitions"
/**
 *
 * value type config
 */
const config: SchemaConfig<definitions> = {
  todo: {
    labels: tags,
    creator: {},
    joinby__todo_actor: {
      title: "testwww",
      manageable: true,
    },
  },
}

export default config
