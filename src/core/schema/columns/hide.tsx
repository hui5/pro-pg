import { ColumnsState } from '@ant-design/pro-table';
import { assign, chain, forEach, isString, isUndefined } from 'lodash';
import { useState } from 'react';
import { EMBED_PREFIX } from '../join-table/constant';
import { getSearchSchema, Schema } from '../schema';
/**
 *
 *
 *
 *
 * columns state
 *
 *  hide, show
 *
 *  */

export const hideColumns = (schema: Schema, { hide, show }: { hide: any[]; show?: any[] }) => {
  // first set key,  otherwise columns state map not work, it use this key
  chain(schema?.table)
    .groupBy('dataIndex')
    .forEach((arr, dataIndex) => {
      if (isString(dataIndex)) {
        // 第一个为列表显示项， 只需修改这个。若修改后面增加的查询项， 查询时会用这个key做为 params 的key，request 时会出问题。
        if (isUndefined(arr[0]['key'])) arr[0]['key'] = dataIndex;
      }
    })
    .value();
  // forEach(schema?.table, (item) => console.log(item['dataIndex'], item['key']));

  const stateMap = assign(
    {},
    ...(
      (show &&
        chain(schema.table)
          .map('dataIndex')
          .compact()
          .uniq()
          .difference((show as string[]) || [])
          .value()) ||
      hide ||
      []
    ).map((item) => ({ [item]: { show: false } })),
  );
  // console.log(stateMap);

  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>(stateMap);

  // sync search with table
  forEach(columnsStateMap, (item, key) => {
    const searchSchema = getSearchSchema(schema, key.split(',')[0].replace(EMBED_PREFIX, '')); // surport embed table search
    if (searchSchema) {
      if (item.show === false) searchSchema.hideInSearch = true;
      if (item.fixed === 'left') searchSchema.order = 1;
      if (item.fixed === 'right') searchSchema.order = -1;
    }
  });

  return {
    columnsStateMap,
    onColumnsStateChange: setColumnsStateMap,
  };
};
