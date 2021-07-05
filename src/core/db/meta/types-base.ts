/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Column {
  /** @format text */
  table_description?: string;

  /** @format text */
  description?: string;

  /** @format json */
  enums?: string;

  /** @format name */
  table_catalog?: string;

  /** @format name */
  table_schema?: string;

  /** @format name */
  table_name?: string;

  /** @format name */
  column_name?: string;

  /** @format integer */
  ordinal_position?: number;

  /** @format character varying */
  column_default?: string;

  /** @format character varying */
  is_nullable?: string;

  /** @format character varying */
  data_type?: string;

  /** @format integer */
  character_maximum_length?: number;

  /** @format integer */
  character_octet_length?: number;

  /** @format integer */
  numeric_precision?: number;

  /** @format integer */
  numeric_precision_radix?: number;

  /** @format integer */
  numeric_scale?: number;

  /** @format integer */
  datetime_precision?: number;

  /** @format character varying */
  interval_type?: string;

  /** @format integer */
  interval_precision?: number;

  /** @format name */
  character_set_catalog?: string;

  /** @format name */
  character_set_schema?: string;

  /** @format name */
  character_set_name?: string;

  /** @format name */
  collation_catalog?: string;

  /** @format name */
  collation_schema?: string;

  /** @format name */
  collation_name?: string;

  /** @format name */
  domain_catalog?: string;

  /** @format name */
  domain_schema?: string;

  /** @format name */
  domain_name?: string;

  /** @format name */
  udt_catalog?: string;

  /** @format name */
  udt_schema?: string;

  /** @format name */
  udt_name?: string;

  /** @format name */
  scope_catalog?: string;

  /** @format name */
  scope_schema?: string;

  /** @format name */
  scope_name?: string;

  /** @format integer */
  maximum_cardinality?: number;

  /** @format name */
  dtd_identifier?: string;

  /** @format character varying */
  is_self_referencing?: string;

  /** @format character varying */
  is_identity?: string;

  /** @format character varying */
  identity_generation?: string;

  /** @format character varying */
  identity_start?: string;

  /** @format character varying */
  identity_increment?: string;

  /** @format character varying */
  identity_maximum?: string;

  /** @format character varying */
  identity_minimum?: string;

  /** @format character varying */
  identity_cycle?: string;

  /** @format character varying */
  is_generated?: string;

  /** @format character varying */
  generation_expression?: string;

  /** @format character varying */
  is_updatable?: string;
}

export interface DdlCommand {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format bigint
   */
  id: number;

  /** @format text */
  command_tag?: string;

  /** @format text */
  schema_name?: string;

  /** @format text */
  object_type?: string;

  /** @format text */
  object_identity?: string;

  /** @format timestamp with time zone */
  at?: string;
}

export interface ForeignKey {
  /** @format name */
  table_schema?: string;

  /** @format name */
  constraint_name?: string;

  /** @format name */
  table_name?: string;

  /** @format name */
  column_name?: string;

  /** @format name */
  foreign_table_schema?: string;

  /** @format name */
  foreign_table_name?: string;

  /** @format name */
  foreign_column_name?: string;
}

export interface PrimaryKey {
  /** @format name */
  table_schema?: string;

  /** @format name */
  table_name?: string;

  /** @format name */
  constraint_name?: string;

  /** @format integer */
  ordinal_position?: number;

  /** @format name */
  column_name?: string;
}

export interface View {
  /** @format name */
  schema_name?: string;

  /** @format name */
  view_name?: string;

  /** @format name */
  referenced_table_schema?: string;

  /** @format name */
  referenced_table_name?: string;

  /** @format character varying */
  view_definition?: string;
}
