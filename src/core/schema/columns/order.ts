import { ColumnsState } from '@ant-design/pro-table';
import {
  castArray,
  chain,
  each,
  filter,
  findIndex,
  has,
  isUndefined,
  partition,
  union,
} from 'lodash';
import { EMBED_PREFIX } from '../join-table/constant';
import { Item, Schema } from '../schema';

/**
 *
 *
 *
 *  order columns
 *
 *  _order:  1: first, ... -1 : last
 *
 *
 *  */

export const orderColumns = (schema: Schema, columnsStateMap: Record<string, ColumnsState>) => {
  const hideInState = (item: Item) =>
    columnsStateMap[castArray(item.dataIndex).join(',')]?.show === false;

  const hideInTable = (item: Item) =>
    item._table === false || item.hideInTable === true || hideInState(item);

  const tableColsLength = filter(schema.table, (item) => !hideInTable(item)).length;

  schema.table = orderTableColumns(schema.table, tableColsLength, hideInTable);

  // order form , search columns
  const [searchColumns, tableColumns] = partition(schema.table, hideInTable);
  chain(tableColumns)
    .reverse()
    .forEach((column, index) => {
      chain(union(schema.form, searchColumns))
        .filter((item) => isSameCol(item.dataIndex, column.dataIndex))
        .forEach((item) => {
          if (isUndefined(item.order)) item.order = index + 1;
        })
        .value();
    })
    .value();
};

const orderTableColumns = (columns: any[], tableColsLength, hideInTable) => {
  const [hideColumns, showColumns] = partition(columns, hideInTable);

  const [hasOrderColumns, noOrderColumns] = partition(showColumns, (item) => has(item, '_order'));

  const target = new Array(columns.length);

  // first loop ,  find location,
  each(hasOrderColumns, (column) => {
    // order:  1: first, ... -1 : last
    const order: number = column['_order'];
    const fromIndex = order < 0 ? tableColsLength + order : order - 1;
    const location = findIndex(target, isUndefined, fromIndex);
    target[location] = column;
  });

  each(
    union(noOrderColumns, hideColumns),
    (column) => (target[findIndex(target, isUndefined)] = column),
  );

  return target;
};

const isSameCol = (a, b) => {
  const originalCol = (dataIndex) => (castArray(dataIndex)[0] as string).replace(EMBED_PREFIX, '');
  return originalCol(a) === originalCol(b);
};
