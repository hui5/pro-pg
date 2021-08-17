/**
 *
 *  This file was generated
 *  At: Sun Jun 06 2021 20:09:41 GMT+0800 (中国标准时间)
 */

export const staticMeta = {
  /**
   *
   * activity
   */
  activity: {
    isViewTable: false,

    tableDesc: "活动",

    keys: ["id"],

    foreignKeys: [],

    cols: ["id", "title", "decs", "state", "created_at", "updated_at"],

    columns: [
      {
        name: "id",
        table: "activity",
        tableDesc: "活动",
        dataType: "integer",
        defaultValue: "nextval('activity_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "title",
        table: "activity",
        tableDesc: "活动",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
      {
        name: "decs",
        table: "activity",
        tableDesc: "活动",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
      {
        name: "state",
        table: "activity",
        tableDesc: "活动",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
      {
        name: "created_at",
        table: "activity",
        tableDesc: "活动",
        dataType: "timestamp without time zone",
        isNullable: true,
        isDate: true,
      },
      {
        name: "updated_at",
        table: "activity",
        tableDesc: "活动",
        dataType: "timestamp without time zone",
        defaultValue: "CURRENT_TIMESTAMP",
        isNullable: true,
        isDate: true,
      },
    ],

    embed: {},

    joinBy: {},

    join: {},
  },

  /**
   *
   * actor
   */
  actor: {
    isViewTable: false,

    tableDesc: null,

    keys: ["id"],

    foreignKeys: [],

    cols: ["id", "name", "email"],

    columns: [
      {
        name: "id",
        table: "actor",
        dataType: "integer",
        defaultValue: "nextval('actor_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "name",
        table: "actor",
        desc: "用户名",
        dataType: "text",
        isText: true,
        isTextType: true,
      },
      {
        name: "email",
        table: "actor",
        desc: "邮箱",
        dataType: "text",
        isText: true,
        isTextType: true,
      },
    ],

    embed: {},

    joinBy: {
      todo_actor: {
        from: { table: "actor", key: "id" },
        by: { table: "todo_actor", fromKey: "actor_id", toKey: "todo_id" },
        to: { table: "todo", key: "id" },
      },
    },

    join: {
      todo_actor__actor_id: {
        from: { table: "actor", key: "id" },
        to: { table: "todo_actor", field: "actor_id" },
      },
      todo__creator: {
        from: { table: "actor", key: "id" },
        to: { table: "todo", field: "creator" },
      },
    },
  },

  /**
   *
   * issue
   */
  issue: {
    isViewTable: false,

    tableDesc: null,

    keys: ["id"],

    foreignKeys: [],

    cols: [
      "id",
      "number",
      "title",
      "labels",
      "state",
      "locked",
      "comments",
      "created_at",
      "updated_at",
      "closed_at",
      "author_association",
      "user",
      "avatar",
    ],

    columns: [
      {
        name: "id",
        table: "issue",
        dataType: "integer",
        defaultValue: "nextval('issue_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "number",
        table: "issue",
        dataType: "integer",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "title",
        table: "issue",
        dataType: "character varying",
        isNullable: true,
        maxLength: 255,
        isVarChar: true,
        isTextType: true,
      },
      { name: "labels", table: "issue", dataType: "jsonb", isNullable: true },
      {
        name: "state",
        table: "issue",
        dataType: "character varying",
        isNullable: true,
        maxLength: 255,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "locked",
        table: "issue",
        dataType: "boolean",
        isNullable: true,
        isBoolean: true,
      },
      {
        name: "comments",
        table: "issue",
        dataType: "integer",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "created_at",
        table: "issue",
        dataType: "timestamp without time zone",
        defaultValue: "CURRENT_TIMESTAMP",
        isNullable: true,
        isDate: true,
      },
      {
        name: "updated_at",
        table: "issue",
        dataType: "timestamp without time zone",
        defaultValue: "CURRENT_TIMESTAMP",
        isNullable: true,
        isDate: true,
      },
      {
        name: "closed_at",
        table: "issue",
        dataType: "timestamp without time zone",
        isNullable: true,
        isDate: true,
      },
      {
        name: "author_association",
        table: "issue",
        dataType: "character varying",
        isNullable: true,
        maxLength: 255,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "user",
        table: "issue",
        dataType: "character varying",
        isNullable: true,
        maxLength: 255,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "avatar",
        table: "issue",
        dataType: "character varying",
        isNullable: true,
        maxLength: 255,
        isVarChar: true,
        isTextType: true,
      },
    ],

    embed: {},

    joinBy: {},

    join: {},
  },

  /**
   *
   * issue_label
   */
  issue_label: {
    isViewTable: true,

    tableDesc: null,

    keys: [],

    foreignKeys: [],

    cols: ["label"],

    columns: [
      {
        name: "label",
        table: "issue_label",
        dataType: "jsonb",
        isNullable: true,
      },
    ],

    embed: {},

    joinBy: {},

    join: {},
  },

  /**
   *
   * todo
   */
  todo: {
    isViewTable: false,

    tableDesc: "任务",

    keys: ["id"],

    foreignKeys: ["creator"],

    cols: [
      "id",
      "done",
      "task",
      "due",
      "labels",
      "state",
      "updated_at",
      "creator",
    ],

    columns: [
      {
        name: "id",
        table: "todo",
        tableDesc: "任务",
        dataType: "integer",
        defaultValue: "nextval('todos_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "done",
        table: "todo",
        desc: "是否完成",
        tableDesc: "任务",
        dataType: "boolean",
        defaultValue: "false",
        isBoolean: true,
      },
      {
        name: "task",
        table: "todo",
        desc: "任务",
        tableDesc: "任务",
        dataType: "text",
        isText: true,
        isTextType: true,
      },
      {
        name: "due",
        table: "todo",
        desc: "到期时间",
        tableDesc: "任务",
        dataType: "timestamp with time zone",
        isNullable: true,
        isDate: true,
      },
      {
        name: "labels",
        table: "todo",
        desc: "标签",
        tableDesc: "任务",
        dataType: "jsonb",
        isNullable: true,
      },
      {
        name: "state",
        table: "todo",
        desc: "状态",
        tableDesc: "任务",
        dataType: "character varying",
        isNullable: true,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "updated_at",
        table: "todo",
        tableDesc: "任务",
        dataType: "timestamp without time zone",
        defaultValue: "CURRENT_TIMESTAMP",
        isNullable: true,
        isDate: true,
      },
      {
        name: "creator",
        table: "todo",
        desc: "创建者",
        tableDesc: "任务",
        dataType: "integer",
        isNullable: true,
        isNumber: true,
        isForeignKey: true,
      },
    ],

    embed: {
      creator: {
        from: { table: "todo", field: "creator" },
        to: { table: "actor", key: "id" },
        constraint: "todo_actor_id_fk",
      },
    },

    joinBy: {
      todo_actor: {
        from: { table: "todo", key: "id" },
        by: { table: "todo_actor", fromKey: "todo_id", toKey: "actor_id" },
        to: { table: "actor", key: "id" },
      },
    },

    join: {
      todo_actor__todo_id: {
        from: { table: "todo", key: "id" },
        to: { table: "todo_actor", field: "todo_id" },
      },
    },
  },

  /**
   *
   * todo_actor
   */
  todo_actor: {
    isViewTable: false,

    tableDesc: null,

    keys: ["id"],

    foreignKeys: ["todo_id", "actor_id"],

    cols: ["todo_id", "actor_id", "id", "is_manager"],

    columns: [
      {
        name: "todo_id",
        table: "todo_actor",
        dataType: "integer",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "actor_id",
        table: "todo_actor",
        dataType: "integer",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "id",
        table: "todo_actor",
        dataType: "integer",
        defaultValue: "nextval('todo_actor_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "is_manager",
        table: "todo_actor",
        desc: "是否管理员",
        dataType: "boolean",
        defaultValue: "false",
        isNullable: true,
        isBoolean: true,
      },
    ],

    embed: {
      todo_id: {
        from: { table: "todo_actor", field: "todo_id" },
        to: { table: "todo", key: "id" },
        constraint: "todo_actor_todo_id_fk",
      },
      actor_id: {
        from: { table: "todo_actor", field: "actor_id" },
        to: { table: "actor", key: "id" },
        constraint: "todo_actor_actor_id_fk",
      },
    },

    joinBy: {},

    join: {},
  },

  /**
   *
   * user
   */
  user: {
    isViewTable: false,

    tableDesc: null,

    keys: ["id"],

    foreignKeys: [],

    cols: ["id", "name"],

    columns: [
      {
        name: "id",
        table: "user",
        dataType: "text",
        isText: true,
        isTextType: true,
        isKey: true,
      },
      {
        name: "name",
        table: "user",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
    ],

    embed: {},

    joinBy: {},

    join: {},
  },
} as const
