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

/**
 * 活动
 */
export interface Activity {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  id: number;

  /** @format text */
  title?: string;

  /** @format text */
  decs?: string;

  /** @format text */
  state?: string;

  /** @format timestamp without time zone */
  created_at?: string;

  /** @format timestamp without time zone */
  updated_at?: string;
}

export interface Actor {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  id: number;

  /**
   * 用户名
   * @format text
   */
  name: string;

  /**
   * 邮箱
   * @format text
   */
  email: string;
}

export interface Issue {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  id: number;

  /** @format integer */
  number?: number;

  /** @format character varying */
  title?: string;

  /** @format jsonb */
  labels?: string;

  /** @format character varying */
  state?: string;

  /** @format boolean */
  locked?: boolean;

  /** @format integer */
  comments?: number;

  /** @format timestamp without time zone */
  created_at?: string;

  /** @format timestamp without time zone */
  updated_at?: string;

  /** @format timestamp without time zone */
  closed_at?: string;

  /** @format character varying */
  author_association?: string;

  /** @format character varying */
  user?: string;

  /** @format character varying */
  avatar?: string;
}

export interface IssueLabel {
  /** @format jsonb */
  label?: string;
}

export interface PgStatStatements {
  /** @format oid */
  userid?: string;

  /** @format oid */
  dbid?: string;

  /** @format bigint */
  queryid?: number;

  /** @format text */
  query?: string;

  /** @format bigint */
  calls?: number;

  /** @format double precision */
  total_time?: number;

  /** @format double precision */
  min_time?: number;

  /** @format double precision */
  max_time?: number;

  /** @format double precision */
  mean_time?: number;

  /** @format double precision */
  stddev_time?: number;

  /** @format bigint */
  rows?: number;

  /** @format bigint */
  shared_blks_hit?: number;

  /** @format bigint */
  shared_blks_read?: number;

  /** @format bigint */
  shared_blks_dirtied?: number;

  /** @format bigint */
  shared_blks_written?: number;

  /** @format bigint */
  local_blks_hit?: number;

  /** @format bigint */
  local_blks_read?: number;

  /** @format bigint */
  local_blks_dirtied?: number;

  /** @format bigint */
  local_blks_written?: number;

  /** @format bigint */
  temp_blks_read?: number;

  /** @format bigint */
  temp_blks_written?: number;

  /** @format double precision */
  blk_read_time?: number;

  /** @format double precision */
  blk_write_time?: number;
}

/**
 * 任务
 */
export interface Todo {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  id: number;

  /**
   * 是否完成
   * @format boolean
   */
  done: boolean;

  /**
   * 任务
   * @format text
   */
  task: string;

  /**
   * 到期时间
   * @format timestamp with time zone
   */
  due?: string;

  /**
   * 标签
   * @format jsonb
   */
  labels?: string;

  /**
   * 状态
   * @format character varying
   */
  state?: "success" | "error" | "processing" | "warning" | "default";

  /** @format timestamp without time zone */
  updated_at?: string;

  /**
   * 创建者
   *
   * Note:
   * This is a Foreign Key to `actor.id`.<fk table='actor' column='id'/>
   * @format integer
   */
  creator?: number;
}

export interface TodoActor {
  /**
   * Note:
   * This is a Foreign Key to `todo.id`.<fk table='todo' column='id'/>
   * @format integer
   */
  todo_id: number;

  /**
   * Note:
   * This is a Foreign Key to `actor.id`.<fk table='actor' column='id'/>
   * @format integer
   */
  actor_id: number;

  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  id: number;

  /**
   * 是否管理员
   * @format boolean
   */
  is_manager?: boolean;
}

export interface User {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format text
   */
  id: string;

  /** @format text */
  name?: string;
}
