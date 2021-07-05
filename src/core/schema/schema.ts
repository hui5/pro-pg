import type { ProFormColumnsType } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { SortOrder } from 'antd/lib/table/interface';
import { castArray, defaultsDeep, each, find, mapValues, unset } from 'lodash';

export type Schema<T = any> = DB & {
  table: ProColumns<T>[];
  form: ProFormColumnsType<T>[];
  custom?: Record<string, ProFormColumnsType<T>[]>;
};

export type DB = {
  db?: 'mongo' | 'pg';
  /** table name */
  name: string;
  id: string;
  select?: string;
  sort?: Record<string, SortOrder>;
  isView?: boolean;
};

export type SearchSchema<T> = ProColumns<T> & {
  _transform?: (field: any, val: any, query: PostgrestFilterBuilder<any>) => void;
  _operator?:
    | 'eq'
    | 'neq'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'like'
    | 'ilike'
    | 'is'
    | 'in'
    | 'cs'
    | 'cd';
};

export type Item<T = any> = ProColumns<T> & {
  _search?: false | SearchSchema<T>;

  _table?: ProColumns<T> | false;
  _form?: ProFormColumnsType<T> | ProFormColumnsType<T>[] | false;
};

export const toSchema = <T = any, C = any>({
  columns,
  custom,
  db,
  name,
  id,
  select,
  sort,
  isView,
}: DB & { columns: Item<T>[]; custom?: { [key in keyof C]: Item<T>[] } }): DB & {
  table: ProColumns<T>[];
  form: ProFormColumnsType<T>[];
  customForms?: { [key in keyof C]: ProFormColumnsType<T>[] };
} => {
  const table: ProColumns<T>[] = [];
  const form: ProFormColumnsType<T>[] = [];

  columns.forEach(({ _form, _search, _table, ...base }) => {
    if (_table !== false) {
      table.push(defaultsDeep({ hideInSearch: true }, _table, base));

      if (!base.hideInSearch && _search !== false) {
        const search = defaultsDeep(
          { hideInSearch: false, hideInTable: true, hideInDescriptions: true },
          _search,
          _table,
          base,
        ) as ProColumns<T>;
        unset(search, 'formItemProps.rules');
        table.push(search);
      }
    } else {
      table.push(defaultsDeep({ hideInSearch: true, hideInTable: true }, base));
    }

    if (_form !== false) {
      castArray(_form || {}).map((item) => form.push(defaultsDeep({}, item, base)));
    }
  });

  const customForms = mapValues(custom, (columns) => {
    const form: ProFormColumnsType[] = [];
    columns.forEach(({ _form, _search, _table, ...base }) =>
      castArray(_form || {}).map((item) => form.push(defaultsDeep({}, item, base))),
    );
    return form;
  });

  if (isView) {
    each(table, (column) => (column.editable = false));
    each(form, (column) => (column.readonly = true));
  }

  return {
    table,
    form,
    customForms,
    db,
    name,
    id: id, // || (db === 'mongo' ? '_id' : 'id'),   is may be empty ,  like view
    select,
    sort,
    isView,
  };
};

/**
 *
 *
 * if field is null,  return first */
export const getSearchSchema = (schema: Schema, field?: string) =>
  find(
    schema.table,
    ({ dataIndex, search, hideInSearch }) =>
      (field ? dataIndex === field : true) && search !== false && hideInSearch !== true,
  ) as SearchSchema<any>;
