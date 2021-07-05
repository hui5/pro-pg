import { find, mapValues, pickBy, union } from 'lodash';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useClient } from '../client/ClientContext';
import { fetchMeta } from './fetchMeta';

export const QUERY_KEY_DB_META = 'db-meta';

export type DBMeta = {
  [key: string]: TableMeta;
};

export type TableMeta = {
  isViewTable: boolean;
  tableDesc: string;

  keys: readonly any[];
  foreignKeys: readonly string[];

  cols: readonly string[];
  columns: readonly ColumnMeta[];

  embed: { [col: string]: EmbedMeta };
  joinBy: { [joinTable: string]: JoinByMeta };
  join: { [table: string]: JoinMeta };
};

export type ColumnMeta = {
  name: string;
  table: string;
  desc?: string;
  tableDesc?: string;

  dataType: string;
  defaultValue?: any;
  isNullable?: boolean;
  maxLength?: number;
  enums?: readonly any[];

  isEnum?: boolean;
  isText?: boolean;
  isTextType?: boolean;
  isDate?: boolean;
  isBoolean?: boolean;
  isNumber?: boolean;
  isFullTextSearch?: boolean;
  isArray?: boolean;
  isGenerated?: boolean;

  isKey?: boolean;
  isForeignKey?: boolean;
};

export type EmbedMeta = {
  from: {
    table: string;
    field: string;
  };
  to: {
    table: string;
    key: string;
  };
  constraint: string;
};

export type JoinMeta = {
  from: {
    table: string;
    key: string;
  };
  to: {
    table: string;
    field: string;
  };
};

export type JoinByMeta = {
  from: {
    table: string;
    key: string;
  };
  by: {
    table: string;
    fromKey: string;
    toKey: string;
  };
  to: {
    table: string;
    key: string;
  };
};

const tableMeta = (meta: TableMeta) => {
  const getColumn = (col: string) => find(meta.columns, ['name', col]);
  return {
    ...meta,

    getColumn,

    colDesc: (col: string) => getColumn(col)?.desc,
    firstTextCol: () => find(meta.columns, (column) => column.isTextType)?.name,

    /** remove fields not in DB,   and remove generated column */
    pickColumns: (row: object) =>
      pickBy(row, (val, name) => meta.cols.includes(name) && !getColumn(name)?.isGenerated),

    /** add keys  to cols */
    addKeys: (cols: any[]) => union(meta.keys, cols),
  };
};

export const useTableMeta = (name) => useMeta()[name];

export const useMeta = () => {
  const { pg_base, queryClient, staticMeta } = useClient();
  const { data: dbMeta } = useQuery<DBMeta>(QUERY_KEY_DB_META, () => fetchMeta(pg_base), {
    staleTime: Infinity,
    initialData: staticMeta as any,
  });
  if ((dbMeta as any) === staticMeta) queryClient.invalidateQueries(QUERY_KEY_DB_META);
  return useMemo(() => mapValues(dbMeta, tableMeta), [dbMeta]);
};
