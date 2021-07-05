import { OptionsConfig } from "core/schema/config"
import fs from "fs"
import handlebars from "handlebars"
import {
  camelCase,
  each,
  filter,
  isArray,
  isEmpty,
  isObject,
  isPlainObject,
  keys,
  map,
  mapValues,
  pickBy,
  union,
  upperFirst,
} from "lodash"
import fetch from "node-fetch"
import openapiTS from "openapi-typescript"
import path from "path"
import prettier from "prettier"
import replace from "replace-in-file"
import { generateApi } from "swagger-typescript-api"
import ts from "typescript"
import {
  EMBED_PREFIX,
  JOIN_BY_PREFIX,
  JOIN_PREFIX,
} from "../../../core/schema/join-table/constant"
import { initClient } from "../client/initClient"
import { fetchMeta } from "./fetchMeta"
import { extractNode, printNode } from "./parseTS"
import { TableMeta } from "./useTableMeta"

/**
 *
 *      main
 *
 */
export const generate = async ({
  API_KEY,
  API_URL,
  pathName,
  optionsConfig,
}) => {
  const url = API_KEY ? `${API_URL}/rest/v1/?apikey=${API_KEY}` : API_URL
  const schema = async (name) =>
    await fetch(url, {
      headers: {
        "Accept-Profile": name,
      },
    }).then((response) => response.json())

  console.log("start fetch rest schema : " + url)
  const rest = await schema("public")
  const rest_base = await schema("base")

  console.log("start generate definitions...")
  let definitions = openapiTS(rest)
  definitions = definitions.replace(
    /[\s\S]+(export interface definitions [\s\S]+?)export interface [\s\S]+/,
    "$1"
  )

  const definitionsFile = path.join(pathName, "definitions.ts")

  fs.writeFileSync(definitionsFile, definitions)

  // addTypes(path.join(pathName, 'definitions.ts'));

  fs.writeFileSync(
    path.join(__dirname, "definitions-base.ts"),
    openapiTS(rest_base)
  )

  console.log("start generate types...")

  await generateApi({
    name: "types.ts",
    output: pathName,
    spec: rest,
    generateClient: false,
  })

  await generateApi({
    name: "types-base.ts",
    output: __dirname,
    spec: rest_base,
    generateClient: false,
  })

  addOptions([definitionsFile, path.join(pathName, "types.ts")], optionsConfig)

  console.log("start generate meta...")
  const { pg_base } = initClient({ API_URL, API_KEY })

  const metaFile = path.join(pathName, "meta.ts")
  const metaTemplate = path.join(__dirname, "meta.hbs")

  await generateMetaFile(pg_base, metaFile, metaTemplate)

  await addJoinTableToDefinitions(definitionsFile, metaFile)

  console.log("end")
  process.exit(0)
}

/**
 *
 * retreatment definitions
 *
 * extract & add types
 */
const addTypes = (file) => {
  const definitionsNode = extractNode(file, "definitions")

  let definitions = printNode(definitionsNode)

  definitionsNode.forEachChild((node) => {
    // console.log(node.kind);
    if (ts.isTypeElement(node)) {
      // @ts-ignore
      const name = node.name.escapedText
      const camelName = upperFirst(camelCase(name))
      definitions += `\n export type ${camelName} = definitions['${name}']`
    }
  })
  fs.writeFileSync(file, definitions)
}

/**
 *
 *   add options  to types and definitions
 */
const addOptions = (files, optionsConfig: OptionsConfig<any>) => {
  const targetFiles = files
  each(optionsConfig, (tableOptions, table) => {
    each(tableOptions, (colOptions, col) => {
      const selectType = (
        isObject(colOptions)
          ? keys(colOptions)
          : map(colOptions, (option) => option["value"] || option)
      )
        .map((name) => `"${name}"`)
        .join(" | ")

      const results = replace.sync({
        files: targetFiles,
        from: new RegExp(
          `(\\s(${upperFirst(
            camelCase(table)
          )}|${table}:) {[^}]+\\s+${col}[\\?]?:\\s)(string)(;[^}]+})`
        ),
        to: `$1${selectType}$4`,
      })
      console.log(table, col)

      console.log(results)
    })
  })
}

/**
 *
 * generate meta file
 */
const generateMetaFile = async (pg_base, file, template) => {
  let dbMeta = await fetchMeta(pg_base)

  const notEmpty = (val) =>
    val && (isPlainObject(val) || isArray(val) ? !isEmpty(val) : true)

  const removeEmpty = (obj) =>
    isPlainObject(obj)
      ? pickBy(mapValues(obj, removeEmpty), notEmpty)
      : isArray(obj)
      ? filter(map(obj, removeEmpty), notEmpty)
      : obj

  handlebars.registerHelper("removeEmpty", function (obj) {
    return JSON.stringify(removeEmpty(obj))
  })

  fs.writeFileSync(
    file,
    prettier.format(
      handlebars.compile(fs.readFileSync(template, "utf-8"), {
        noEscape: true,
      })({
        dbMeta,
        date: new Date(),
      }),
      { semi: false, parser: "typescript" }
    )
  )
}

/**
 *
 * add join table to definitions
 */
const addJoinTableToDefinitions = async (definitionsFile, metaFile) => {
  const { staticMeta } = await import(metaFile)

  const appendJoinTable = (tableMeta) => {
    const toString =
      (pre, post = "") =>
      (item, key) =>
        `'${pre}${key}': types.${upperFirst(
          camelCase(item["to"]["table"])
        )}${post};`
    const content = union(
      map(tableMeta?.embed, toString(EMBED_PREFIX)),
      map(tableMeta?.join, toString(JOIN_PREFIX, "[]")),
      map(tableMeta?.joinBy, toString(JOIN_BY_PREFIX, "[]"))
    ).join("\n\n\t\t")
    return (
      content &&
      `/**
    * join table
    */
    ${content}`
    )
  }

  const content = fs
    .readFileSync(definitionsFile, "utf-8")
    .replace(/(\w+)(: {[^}]+)};/g, (match, p1, p2) => {
      const tableMeta: TableMeta = staticMeta[p1]
      return `${p1}${p2}
    ${appendJoinTable(tableMeta)}
  };
  `
    })

  fs.writeFileSync(
    definitionsFile,
    "import * as types from './types'\n\n" + content
  )
}
