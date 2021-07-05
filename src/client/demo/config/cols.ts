import { ColsConfig } from "core/schema/config"
import { definitions } from "../meta/definitions"

const config: ColsConfig<definitions> = {
  actor: ["name", "email"],
  todo: ["task", "state"],
}

export default config
