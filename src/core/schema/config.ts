import { IValueEnum } from "core/column/enums"
import { defaultTemplate, Template } from "core/column/index"
import { Item } from "core/schema/schema"
import { EMBED_KEY, UserItem } from "./type"

export type OptionsConfig<definitions> = {
  [T in keyof definitions]?: {
    [K in keyof definitions[T]]?:
      | (string | { label: string; value: number | string })[]
      | IValueEnum
  }
}

export type SchemaConfig<definitions> = {
  [T in keyof definitions]?: {
    [K in keyof definitions[T] as K extends EMBED_KEY ? never : K]?:
      | Template
      | UserItem<definitions[T], K>
  }
}

export type ColsConfig<definitions> = {
  [T in keyof definitions]?: (keyof definitions[T])[]
}

export type TemplateConfig = Partial<typeof defaultTemplate>

export type Config<definitions> = {
  cols?: ColsConfig<definitions>
  options?: OptionsConfig<definitions>
  schema?: SchemaConfig<definitions>
  baseColumns?: Record<string, Item>
  template?: TemplateConfig
}
