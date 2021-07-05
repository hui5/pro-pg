import { PostgrestClient } from '@supabase/postgrest-js';
import { chain, find, map, some } from 'lodash';
import { JOIN_KEY_SPLITER } from '../../../core/schema/join-table/constant';
import { Column, ForeignKey, PrimaryKey, View } from './types-base';
import type { ColumnMeta, JoinByMeta, TableMeta } from './useTableMeta';

export const fetchMeta = async (pg_base: PostgrestClient) => {
  const _primary_keys = (await pg_base.from<PrimaryKey>('primary_key').select()).data;
  const _foreign_keys = (await pg_base.from<ForeignKey>('foreign_key').select()).data;
  const _columns = (await pg_base.from<Column>('column').select()).data;
  const _views = (await pg_base.from<View>('view').select()).data;

  const meta = chain(_columns)
    .groupBy('table_name')
    .mapValues((__columns, name) => {
      const keys = chain(_primary_keys).filter(['table_name', name]).map('column_name').value();

      const foreignMap = chain(_foreign_keys)
        .filter(['table_name', name])
        .keyBy('column_name')
        .mapValues((item, col) => ({
          from: {
            table: name,
            field: col,
          },
          to: {
            table: item.foreign_table_name,
            key: item.foreign_column_name,
          },
          constraint: item.constraint_name,
        }))
        .value();

      const isViewTable = !!find(_views, (view) => view.view_name === name);

      const columns: ColumnMeta[] = map(__columns, (column) => {
        const dataType = column.data_type as string;
        const name = column.column_name as string;
        const enums = column.enums as any;

        const isText = 'text' === dataType;
        const isVarChar = 'character varying' === dataType;
        const isChar = 'character' === dataType;
        return {
          name,
          table: column.table_name as string,
          desc: column.description,
          tableDesc: column.table_description,

          dataType,
          defaultValue: column.column_default,
          isNullable: column.is_nullable === 'YES',
          maxLength: column.character_maximum_length,
          enums,

          isText,
          isVarChar,
          isChar,
          isTextType: isText || isVarChar || isChar,
          isNumber: ['smallint', 'integer', 'numeric'].includes(dataType),
          isEnum: enums.length > 0,
          isArray: 'ARRAY' === dataType,
          isDate: dataType.startsWith('timestamp'),
          isBoolean: 'boolean' === dataType,
          isFullTextSearch: 'tsvector' === dataType,
          isGenerated: 'ALWAYS' === column.is_generated,

          isKey: keys.includes(name),
          isForeignKey: !!foreignMap[name],
        };
      });

      const cols = map(columns, 'name') as string[];

      const tableMeta: TableMeta = {
        isViewTable,
        tableDesc: columns[0]?.tableDesc,
        keys,
        foreignKeys: Object.keys(foreignMap),
        cols,
        columns,

        embed: foreignMap,

        joinBy: chain(_foreign_keys)
          .groupBy('table_name')
          .pickBy(
            (group) =>
              group.length === 2 && some(group, (item) => item.foreign_table_name === name),
          )
          .mapValues(([from, to], joinTable) => {
            if (to.foreign_table_name === name) [from, to] = [to, from];
            return {
              from: {
                table: name,
                key: from.foreign_column_name,
              },
              by: {
                table: joinTable,
                fromKey: from.column_name,
                toKey: to.column_name,
              },
              to: {
                table: to.foreign_table_name,
                key: to.foreign_column_name,
              },
            } as JoinByMeta;
          })
          .value(),

        join: chain(_foreign_keys)
          .filter({ foreign_table_name: name })
          .keyBy((item) => `${item.table_name}${JOIN_KEY_SPLITER}${item.column_name}`)
          .mapValues((item) => ({
            from: {
              table: name,
              key: item.foreign_column_name,
            },
            to: {
              table: item.table_name,
              field: item.column_name,
            },
          }))
          .value(),
      };

      return tableMeta;
    })
    .value();

  return meta;
};
