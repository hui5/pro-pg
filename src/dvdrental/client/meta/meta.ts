/**
 *
 *  This file was generated
 *  At: Wed Aug 18 2021 15:36:34 GMT+0800 (China Standard Time)
 */

export const staticMeta = {
  /**
   *
   * actor
   */
  actor: {
    isViewTable: false,

    tableDesc: null,

    keys: ["actor_id"],

    foreignKeys: [],

    cols: ["actor_id", "first_name", "last_name", "last_update", "fullname"],

    columns: [
      {
        name: "actor_id",
        table: "actor",
        dataType: "integer",
        defaultValue: "nextval('actor_actor_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "first_name",
        table: "actor",
        dataType: "character varying",
        maxLength: 45,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "last_name",
        table: "actor",
        dataType: "character varying",
        maxLength: 45,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "last_update",
        table: "actor",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
      {
        name: "fullname",
        table: "actor",
        dataType: "character varying",
        isNullable: true,
        maxLength: 90,
        isVarChar: true,
        isTextType: true,
        isGenerated: true,
      },
    ],

    embed: {},

    joinBy: {
      film_actor: {
        from: { table: "actor", key: "actor_id" },
        by: { table: "film_actor", fromKey: "actor_id", toKey: "film_id" },
        to: { table: "film", key: "film_id" },
      },
    },

    join: {
      film_actor__actor_id: {
        from: { table: "actor", key: "actor_id" },
        to: { table: "film_actor", field: "actor_id" },
      },
    },
  },

  /**
   *
   * actor_info
   */
  actor_info: {
    isViewTable: true,

    tableDesc: null,

    keys: [],

    foreignKeys: [],

    cols: ["actor_id", "first_name", "last_name", "film_info"],

    columns: [
      {
        name: "actor_id",
        table: "actor_info",
        dataType: "integer",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "first_name",
        table: "actor_info",
        dataType: "character varying",
        isNullable: true,
        maxLength: 45,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "last_name",
        table: "actor_info",
        dataType: "character varying",
        isNullable: true,
        maxLength: 45,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "film_info",
        table: "actor_info",
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

  /**
   *
   * address
   */
  address: {
    isViewTable: false,

    tableDesc: null,

    keys: ["address_id"],

    foreignKeys: ["city_id"],

    cols: [
      "address_id",
      "address",
      "address2",
      "district",
      "city_id",
      "postal_code",
      "phone",
      "last_update",
    ],

    columns: [
      {
        name: "address_id",
        table: "address",
        dataType: "integer",
        defaultValue: "nextval('address_address_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "address",
        table: "address",
        dataType: "character varying",
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "address2",
        table: "address",
        dataType: "character varying",
        isNullable: true,
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "district",
        table: "address",
        dataType: "character varying",
        maxLength: 20,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "city_id",
        table: "address",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "postal_code",
        table: "address",
        dataType: "character varying",
        isNullable: true,
        maxLength: 10,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "phone",
        table: "address",
        dataType: "character varying",
        maxLength: 20,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "last_update",
        table: "address",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
    ],

    embed: {
      city_id: {
        from: { table: "address", field: "city_id" },
        to: { table: "city", key: "city_id" },
        constraint: "fk_address_city",
      },
    },

    joinBy: {
      store: {
        from: { table: "address", key: "address_id" },
        by: {
          table: "store",
          fromKey: "address_id",
          toKey: "manager_staff_id",
        },
        to: { table: "staff", key: "staff_id" },
      },
    },

    join: {
      customer__address_id: {
        from: { table: "address", key: "address_id" },
        to: { table: "customer", field: "address_id" },
      },
      staff__address_id: {
        from: { table: "address", key: "address_id" },
        to: { table: "staff", field: "address_id" },
      },
      store__address_id: {
        from: { table: "address", key: "address_id" },
        to: { table: "store", field: "address_id" },
      },
    },
  },

  /**
   *
   * category
   */
  category: {
    isViewTable: false,

    tableDesc: null,

    keys: ["category_id"],

    foreignKeys: [],

    cols: ["category_id", "name", "last_update"],

    columns: [
      {
        name: "category_id",
        table: "category",
        dataType: "integer",
        defaultValue: "nextval('category_category_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "name",
        table: "category",
        dataType: "character varying",
        maxLength: 25,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "last_update",
        table: "category",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
    ],

    embed: {},

    joinBy: {
      film_category: {
        from: { table: "category", key: "category_id" },
        by: {
          table: "film_category",
          fromKey: "category_id",
          toKey: "film_id",
        },
        to: { table: "film", key: "film_id" },
      },
    },

    join: {
      film_category__category_id: {
        from: { table: "category", key: "category_id" },
        to: { table: "film_category", field: "category_id" },
      },
    },
  },

  /**
   *
   * city
   */
  city: {
    isViewTable: false,

    tableDesc: null,

    keys: ["city_id"],

    foreignKeys: ["country_id"],

    cols: ["city_id", "city", "country_id", "last_update"],

    columns: [
      {
        name: "city_id",
        table: "city",
        dataType: "integer",
        defaultValue: "nextval('city_city_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "city",
        table: "city",
        dataType: "character varying",
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "country_id",
        table: "city",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "last_update",
        table: "city",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
    ],

    embed: {
      country_id: {
        from: { table: "city", field: "country_id" },
        to: { table: "country", key: "country_id" },
        constraint: "fk_city",
      },
    },

    joinBy: {},

    join: {
      address__city_id: {
        from: { table: "city", key: "city_id" },
        to: { table: "address", field: "city_id" },
      },
    },
  },

  /**
   *
   * country
   */
  country: {
    isViewTable: false,

    tableDesc: null,

    keys: ["country_id"],

    foreignKeys: [],

    cols: ["country_id", "country", "last_update"],

    columns: [
      {
        name: "country_id",
        table: "country",
        dataType: "integer",
        defaultValue: "nextval('country_country_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "country",
        table: "country",
        dataType: "character varying",
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "last_update",
        table: "country",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
    ],

    embed: {},

    joinBy: {},

    join: {
      city__country_id: {
        from: { table: "country", key: "country_id" },
        to: { table: "city", field: "country_id" },
      },
    },
  },

  /**
   *
   * customer
   */
  customer: {
    isViewTable: false,

    tableDesc: null,

    keys: ["customer_id"],

    foreignKeys: ["address_id"],

    cols: [
      "customer_id",
      "store_id",
      "first_name",
      "last_name",
      "email",
      "address_id",
      "activebool",
      "create_date",
      "last_update",
      "active",
    ],

    columns: [
      {
        name: "customer_id",
        table: "customer",
        dataType: "integer",
        defaultValue: "nextval('customer_customer_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "store_id",
        table: "customer",
        dataType: "smallint",
        isNumber: true,
      },
      {
        name: "first_name",
        table: "customer",
        dataType: "character varying",
        maxLength: 45,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "last_name",
        table: "customer",
        dataType: "character varying",
        maxLength: 45,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "email",
        table: "customer",
        dataType: "character varying",
        isNullable: true,
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "address_id",
        table: "customer",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "activebool",
        table: "customer",
        dataType: "boolean",
        defaultValue: "true",
        isBoolean: true,
      },
      {
        name: "create_date",
        table: "customer",
        dataType: "date",
        defaultValue: "('now'::text)::date",
      },
      {
        name: "last_update",
        table: "customer",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isNullable: true,
        isDate: true,
      },
      {
        name: "active",
        table: "customer",
        dataType: "integer",
        isNullable: true,
        isNumber: true,
      },
    ],

    embed: {
      address_id: {
        from: { table: "customer", field: "address_id" },
        to: { table: "address", key: "address_id" },
        constraint: "customer_address_id_fkey",
      },
    },

    joinBy: {},

    join: {
      payment__customer_id: {
        from: { table: "customer", key: "customer_id" },
        to: { table: "payment", field: "customer_id" },
      },
      rental__customer_id: {
        from: { table: "customer", key: "customer_id" },
        to: { table: "rental", field: "customer_id" },
      },
    },
  },

  /**
   *
   * customer_list
   */
  customer_list: {
    isViewTable: true,

    tableDesc: null,

    keys: [],

    foreignKeys: [],

    cols: [
      "id",
      "name",
      "address",
      "zip code",
      "phone",
      "city",
      "country",
      "notes",
      "sid",
    ],

    columns: [
      {
        name: "id",
        table: "customer_list",
        dataType: "integer",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "name",
        table: "customer_list",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
      {
        name: "address",
        table: "customer_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "zip code",
        table: "customer_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 10,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "phone",
        table: "customer_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 20,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "city",
        table: "customer_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "country",
        table: "customer_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "notes",
        table: "customer_list",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
      {
        name: "sid",
        table: "customer_list",
        dataType: "smallint",
        isNullable: true,
        isNumber: true,
      },
    ],

    embed: {},

    joinBy: {},

    join: {},
  },

  /**
   *
   * film
   */
  film: {
    isViewTable: false,

    tableDesc: null,

    keys: ["film_id"],

    foreignKeys: ["language_id"],

    cols: [
      "film_id",
      "title",
      "description",
      "release_year",
      "language_id",
      "rental_duration",
      "rental_rate",
      "length",
      "replacement_cost",
      "rating",
      "last_update",
      "special_features",
      "fulltext",
    ],

    columns: [
      {
        name: "film_id",
        table: "film",
        dataType: "integer",
        defaultValue: "nextval('film_film_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "title",
        table: "film",
        desc: "名称",
        dataType: "character varying",
        maxLength: 255,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "description",
        table: "film",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
      {
        name: "release_year",
        table: "film",
        desc: "发布年份",
        dataType: "integer",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "language_id",
        table: "film",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "rental_duration",
        table: "film",
        dataType: "smallint",
        defaultValue: "3",
        isNumber: true,
      },
      {
        name: "rental_rate",
        table: "film",
        dataType: "numeric",
        defaultValue: "4.99",
        isNumber: true,
      },
      {
        name: "length",
        table: "film",
        dataType: "smallint",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "replacement_cost",
        table: "film",
        dataType: "numeric",
        defaultValue: "19.99",
        isNumber: true,
      },
      {
        name: "rating",
        table: "film",
        dataType: "USER-DEFINED",
        defaultValue: "'G'::mpaa_rating",
        isNullable: true,
        enums: ["G", "PG", "PG-13", "R", "NC-17"],
        isEnum: true,
      },
      {
        name: "last_update",
        table: "film",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
      {
        name: "special_features",
        table: "film",
        dataType: "ARRAY",
        isNullable: true,
        isArray: true,
      },
      {
        name: "fulltext",
        table: "film",
        dataType: "tsvector",
        isFullTextSearch: true,
      },
    ],

    embed: {
      language_id: {
        from: { table: "film", field: "language_id" },
        to: { table: "language", key: "language_id" },
        constraint: "film_language_id_fkey",
      },
    },

    joinBy: {
      film_actor: {
        from: { table: "film", key: "film_id" },
        by: { table: "film_actor", fromKey: "film_id", toKey: "actor_id" },
        to: { table: "actor", key: "actor_id" },
      },
      film_category: {
        from: { table: "film", key: "film_id" },
        by: {
          table: "film_category",
          fromKey: "film_id",
          toKey: "category_id",
        },
        to: { table: "category", key: "category_id" },
      },
      inventory: {
        from: { table: "film", key: "film_id" },
        by: { table: "inventory", fromKey: "film_id", toKey: "store_id" },
        to: { table: "store", key: "store_id" },
      },
    },

    join: {
      film_actor__film_id: {
        from: { table: "film", key: "film_id" },
        to: { table: "film_actor", field: "film_id" },
      },
      film_category__film_id: {
        from: { table: "film", key: "film_id" },
        to: { table: "film_category", field: "film_id" },
      },
      inventory__film_id: {
        from: { table: "film", key: "film_id" },
        to: { table: "inventory", field: "film_id" },
      },
    },
  },

  /**
   *
   * film_actor
   */
  film_actor: {
    isViewTable: false,

    tableDesc: null,

    keys: ["actor_id", "film_id"],

    foreignKeys: ["actor_id", "film_id"],

    cols: ["actor_id", "film_id", "last_update"],

    columns: [
      {
        name: "actor_id",
        table: "film_actor",
        dataType: "smallint",
        isNumber: true,
        isKey: true,
        isForeignKey: true,
      },
      {
        name: "film_id",
        table: "film_actor",
        dataType: "smallint",
        isNumber: true,
        isKey: true,
        isForeignKey: true,
      },
      {
        name: "last_update",
        table: "film_actor",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
    ],

    embed: {
      actor_id: {
        from: { table: "film_actor", field: "actor_id" },
        to: { table: "actor", key: "actor_id" },
        constraint: "film_actor_actor_id_fkey",
      },
      film_id: {
        from: { table: "film_actor", field: "film_id" },
        to: { table: "film", key: "film_id" },
        constraint: "film_actor_film_id_fkey",
      },
    },

    joinBy: {},

    join: {},
  },

  /**
   *
   * film_category
   */
  film_category: {
    isViewTable: false,

    tableDesc: null,

    keys: ["film_id", "category_id"],

    foreignKeys: ["category_id", "film_id"],

    cols: ["film_id", "category_id", "last_update"],

    columns: [
      {
        name: "film_id",
        table: "film_category",
        dataType: "smallint",
        isNumber: true,
        isKey: true,
        isForeignKey: true,
      },
      {
        name: "category_id",
        table: "film_category",
        dataType: "smallint",
        isNumber: true,
        isKey: true,
        isForeignKey: true,
      },
      {
        name: "last_update",
        table: "film_category",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
    ],

    embed: {
      category_id: {
        from: { table: "film_category", field: "category_id" },
        to: { table: "category", key: "category_id" },
        constraint: "film_category_category_id_fkey",
      },
      film_id: {
        from: { table: "film_category", field: "film_id" },
        to: { table: "film", key: "film_id" },
        constraint: "film_category_film_id_fkey",
      },
    },

    joinBy: {},

    join: {},
  },

  /**
   *
   * film_list
   */
  film_list: {
    isViewTable: true,

    tableDesc: null,

    keys: [],

    foreignKeys: [],

    cols: [
      "fid",
      "title",
      "description",
      "category",
      "price",
      "length",
      "rating",
      "actors",
    ],

    columns: [
      {
        name: "fid",
        table: "film_list",
        dataType: "integer",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "title",
        table: "film_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 255,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "description",
        table: "film_list",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
      {
        name: "category",
        table: "film_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 25,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "price",
        table: "film_list",
        dataType: "numeric",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "length",
        table: "film_list",
        dataType: "smallint",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "rating",
        table: "film_list",
        dataType: "USER-DEFINED",
        isNullable: true,
        enums: ["G", "PG", "PG-13", "R", "NC-17"],
        isEnum: true,
      },
      {
        name: "actors",
        table: "film_list",
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

  /**
   *
   * inventory
   */
  inventory: {
    isViewTable: false,

    tableDesc: null,

    keys: ["inventory_id"],

    foreignKeys: ["film_id", "store_id"],

    cols: ["inventory_id", "film_id", "store_id", "last_update"],

    columns: [
      {
        name: "inventory_id",
        table: "inventory",
        dataType: "integer",
        defaultValue: "nextval('inventory_inventory_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "film_id",
        table: "inventory",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "store_id",
        table: "inventory",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "last_update",
        table: "inventory",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
    ],

    embed: {
      film_id: {
        from: { table: "inventory", field: "film_id" },
        to: { table: "film", key: "film_id" },
        constraint: "inventory_film_id_fkey",
      },
      store_id: {
        from: { table: "inventory", field: "store_id" },
        to: { table: "store", key: "store_id" },
        constraint: "inventory_store_store_id_fk",
      },
    },

    joinBy: {},

    join: {
      rental__inventory_id: {
        from: { table: "inventory", key: "inventory_id" },
        to: { table: "rental", field: "inventory_id" },
      },
    },
  },

  /**
   *
   * language
   */
  language: {
    isViewTable: false,

    tableDesc: null,

    keys: ["language_id"],

    foreignKeys: [],

    cols: ["language_id", "name", "last_update"],

    columns: [
      {
        name: "language_id",
        table: "language",
        dataType: "integer",
        defaultValue: "nextval('language_language_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "name",
        table: "language",
        dataType: "character",
        maxLength: 20,
        isChar: true,
        isTextType: true,
      },
      {
        name: "last_update",
        table: "language",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
    ],

    embed: {},

    joinBy: {},

    join: {
      film__language_id: {
        from: { table: "language", key: "language_id" },
        to: { table: "film", field: "language_id" },
      },
    },
  },

  /**
   *
   * nicer_but_slower_film_list
   */
  nicer_but_slower_film_list: {
    isViewTable: true,

    tableDesc: null,

    keys: [],

    foreignKeys: [],

    cols: [
      "fid",
      "title",
      "description",
      "category",
      "price",
      "length",
      "rating",
      "actors",
    ],

    columns: [
      {
        name: "fid",
        table: "nicer_but_slower_film_list",
        dataType: "integer",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "title",
        table: "nicer_but_slower_film_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 255,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "description",
        table: "nicer_but_slower_film_list",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
      {
        name: "category",
        table: "nicer_but_slower_film_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 25,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "price",
        table: "nicer_but_slower_film_list",
        dataType: "numeric",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "length",
        table: "nicer_but_slower_film_list",
        dataType: "smallint",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "rating",
        table: "nicer_but_slower_film_list",
        dataType: "USER-DEFINED",
        isNullable: true,
        enums: ["G", "PG", "PG-13", "R", "NC-17"],
        isEnum: true,
      },
      {
        name: "actors",
        table: "nicer_but_slower_film_list",
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

  /**
   *
   * payment
   */
  payment: {
    isViewTable: false,

    tableDesc: null,

    keys: ["payment_id"],

    foreignKeys: ["customer_id", "rental_id", "staff_id"],

    cols: [
      "payment_id",
      "customer_id",
      "staff_id",
      "rental_id",
      "amount",
      "payment_date",
    ],

    columns: [
      {
        name: "payment_id",
        table: "payment",
        dataType: "integer",
        defaultValue: "nextval('payment_payment_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "customer_id",
        table: "payment",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "staff_id",
        table: "payment",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "rental_id",
        table: "payment",
        dataType: "integer",
        isNumber: true,
        isForeignKey: true,
      },
      { name: "amount", table: "payment", dataType: "numeric", isNumber: true },
      {
        name: "payment_date",
        table: "payment",
        dataType: "timestamp without time zone",
        isDate: true,
      },
    ],

    embed: {
      customer_id: {
        from: { table: "payment", field: "customer_id" },
        to: { table: "customer", key: "customer_id" },
        constraint: "payment_customer_id_fkey",
      },
      rental_id: {
        from: { table: "payment", field: "rental_id" },
        to: { table: "rental", key: "rental_id" },
        constraint: "payment_rental_id_fkey",
      },
      staff_id: {
        from: { table: "payment", field: "staff_id" },
        to: { table: "staff", key: "staff_id" },
        constraint: "payment_staff_id_fkey",
      },
    },

    joinBy: {},

    join: {},
  },

  /**
   *
   * rental
   */
  rental: {
    isViewTable: false,

    tableDesc: null,

    keys: ["rental_id"],

    foreignKeys: ["customer_id", "inventory_id", "staff_id"],

    cols: [
      "rental_id",
      "rental_date",
      "inventory_id",
      "customer_id",
      "return_date",
      "staff_id",
      "last_update",
    ],

    columns: [
      {
        name: "rental_id",
        table: "rental",
        dataType: "integer",
        defaultValue: "nextval('rental_rental_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "rental_date",
        table: "rental",
        dataType: "timestamp without time zone",
        isDate: true,
      },
      {
        name: "inventory_id",
        table: "rental",
        dataType: "integer",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "customer_id",
        table: "rental",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "return_date",
        table: "rental",
        dataType: "timestamp without time zone",
        isNullable: true,
        isDate: true,
      },
      {
        name: "staff_id",
        table: "rental",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "last_update",
        table: "rental",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
    ],

    embed: {
      customer_id: {
        from: { table: "rental", field: "customer_id" },
        to: { table: "customer", key: "customer_id" },
        constraint: "rental_customer_id_fkey",
      },
      inventory_id: {
        from: { table: "rental", field: "inventory_id" },
        to: { table: "inventory", key: "inventory_id" },
        constraint: "rental_inventory_id_fkey",
      },
      staff_id: {
        from: { table: "rental", field: "staff_id" },
        to: { table: "staff", key: "staff_id" },
        constraint: "rental_staff_id_key",
      },
    },

    joinBy: {},

    join: {
      payment__rental_id: {
        from: { table: "rental", key: "rental_id" },
        to: { table: "payment", field: "rental_id" },
      },
    },
  },

  /**
   *
   * sales_by_film_category
   */
  sales_by_film_category: {
    isViewTable: true,

    tableDesc: null,

    keys: [],

    foreignKeys: [],

    cols: ["category", "total_sales"],

    columns: [
      {
        name: "category",
        table: "sales_by_film_category",
        dataType: "character varying",
        isNullable: true,
        maxLength: 25,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "total_sales",
        table: "sales_by_film_category",
        dataType: "numeric",
        isNullable: true,
        isNumber: true,
      },
    ],

    embed: {},

    joinBy: {},

    join: {},
  },

  /**
   *
   * sales_by_store
   */
  sales_by_store: {
    isViewTable: true,

    tableDesc: null,

    keys: [],

    foreignKeys: [],

    cols: ["store", "manager", "total_sales"],

    columns: [
      {
        name: "store",
        table: "sales_by_store",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
      {
        name: "manager",
        table: "sales_by_store",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
      {
        name: "total_sales",
        table: "sales_by_store",
        dataType: "numeric",
        isNullable: true,
        isNumber: true,
      },
    ],

    embed: {},

    joinBy: {},

    join: {},
  },

  /**
   *
   * staff
   */
  staff: {
    isViewTable: false,

    tableDesc: null,

    keys: ["staff_id"],

    foreignKeys: ["address_id"],

    cols: [
      "staff_id",
      "first_name",
      "last_name",
      "address_id",
      "email",
      "store_id",
      "active",
      "username",
      "password",
      "last_update",
      "picture",
    ],

    columns: [
      {
        name: "staff_id",
        table: "staff",
        dataType: "integer",
        defaultValue: "nextval('staff_staff_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "first_name",
        table: "staff",
        dataType: "character varying",
        maxLength: 45,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "last_name",
        table: "staff",
        dataType: "character varying",
        maxLength: 45,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "address_id",
        table: "staff",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "email",
        table: "staff",
        dataType: "character varying",
        isNullable: true,
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "store_id",
        table: "staff",
        dataType: "smallint",
        isNumber: true,
      },
      {
        name: "active",
        table: "staff",
        dataType: "boolean",
        defaultValue: "true",
        isBoolean: true,
      },
      {
        name: "username",
        table: "staff",
        dataType: "character varying",
        maxLength: 16,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "password",
        table: "staff",
        dataType: "character varying",
        isNullable: true,
        maxLength: 40,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "last_update",
        table: "staff",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
      { name: "picture", table: "staff", dataType: "bytea", isNullable: true },
    ],

    embed: {
      address_id: {
        from: { table: "staff", field: "address_id" },
        to: { table: "address", key: "address_id" },
        constraint: "staff_address_id_fkey",
      },
    },

    joinBy: {
      store: {
        from: { table: "staff", key: "staff_id" },
        by: {
          table: "store",
          fromKey: "manager_staff_id",
          toKey: "address_id",
        },
        to: { table: "address", key: "address_id" },
      },
    },

    join: {
      payment__staff_id: {
        from: { table: "staff", key: "staff_id" },
        to: { table: "payment", field: "staff_id" },
      },
      rental__staff_id: {
        from: { table: "staff", key: "staff_id" },
        to: { table: "rental", field: "staff_id" },
      },
      store__manager_staff_id: {
        from: { table: "staff", key: "staff_id" },
        to: { table: "store", field: "manager_staff_id" },
      },
    },
  },

  /**
   *
   * staff_list
   */
  staff_list: {
    isViewTable: true,

    tableDesc: null,

    keys: [],

    foreignKeys: [],

    cols: [
      "id",
      "name",
      "address",
      "zip code",
      "phone",
      "city",
      "country",
      "sid",
    ],

    columns: [
      {
        name: "id",
        table: "staff_list",
        dataType: "integer",
        isNullable: true,
        isNumber: true,
      },
      {
        name: "name",
        table: "staff_list",
        dataType: "text",
        isNullable: true,
        isText: true,
        isTextType: true,
      },
      {
        name: "address",
        table: "staff_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "zip code",
        table: "staff_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 10,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "phone",
        table: "staff_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 20,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "city",
        table: "staff_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "country",
        table: "staff_list",
        dataType: "character varying",
        isNullable: true,
        maxLength: 50,
        isVarChar: true,
        isTextType: true,
      },
      {
        name: "sid",
        table: "staff_list",
        dataType: "smallint",
        isNullable: true,
        isNumber: true,
      },
    ],

    embed: {},

    joinBy: {},

    join: {},
  },

  /**
   *
   * store
   */
  store: {
    isViewTable: false,

    tableDesc: null,

    keys: ["store_id"],

    foreignKeys: ["address_id", "manager_staff_id"],

    cols: ["store_id", "manager_staff_id", "address_id", "last_update"],

    columns: [
      {
        name: "store_id",
        table: "store",
        dataType: "integer",
        defaultValue: "nextval('store_store_id_seq'::regclass)",
        isNumber: true,
        isKey: true,
      },
      {
        name: "manager_staff_id",
        table: "store",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "address_id",
        table: "store",
        dataType: "smallint",
        isNumber: true,
        isForeignKey: true,
      },
      {
        name: "last_update",
        table: "store",
        dataType: "timestamp without time zone",
        defaultValue: "now()",
        isDate: true,
      },
    ],

    embed: {
      address_id: {
        from: { table: "store", field: "address_id" },
        to: { table: "address", key: "address_id" },
        constraint: "store_address_id_fkey",
      },
      manager_staff_id: {
        from: { table: "store", field: "manager_staff_id" },
        to: { table: "staff", key: "staff_id" },
        constraint: "store_manager_staff_id_fkey",
      },
    },

    joinBy: {
      inventory: {
        from: { table: "store", key: "store_id" },
        by: { table: "inventory", fromKey: "store_id", toKey: "film_id" },
        to: { table: "film", key: "film_id" },
      },
    },

    join: {
      inventory__store_id: {
        from: { table: "store", key: "store_id" },
        to: { table: "inventory", field: "store_id" },
      },
    },
  },
} as const
