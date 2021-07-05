import {
  defaults,
  each,
  endsWith,
  forIn,
  includes,
  isArray,
  isNil,
  isUndefined,
  mapValues,
} from 'lodash';
import { getSearchSchema, Schema } from '../../schema/schema';
import { useClient } from '../client/ClientContext';
import { useTableMeta } from '../meta/useTableMeta';

export const USE_LOCAL_DATA = 'useLocalData';
export const USE_EMPTY_DATA = 'useEmptyData_jinjivqlajiafiwiisw';

const Request = (schema: Schema) => {
  const { pg } = useClient();

  const ID = schema.id;
  const client = pg;

  const meta = useTableMeta(schema.name);

  // when select(), will change client.from() 's  instance
  // so need a new instance for every call
  const entity = () => client.from(schema.name);

  /**
   *
   *
   *
   *   list
   *
   */
  const list = async (params, sort = {}, filter = {}) => {
    const { pageSize, current = 1, [USE_LOCAL_DATA]: useLocalData, ...search } = params;
    // key = [USE_LOCAL_DATA] :   return user data
    if (useLocalData)
      return {
        data: useLocalData,
        success: true,
      };
    // value = [USE_EMPTY_DATA] :  return []
    if (includes(search, USE_EMPTY_DATA)) {
      return {
        data: [],
        success: true,
      };
    }

    let query = entity().select(schema.select || '*', { count: 'exact' });

    const transformArr = [];

    forIn(search, async (val, field) => {
      if (val === '' || (isArray(val) && val.length === 0)) {
        return;
      }

      const { _transform, _operator, valueType } = getSearchSchema(schema, field) || {};
      const column = meta.getColumn(field);

      //  user define
      if (_transform) {
        // Object.prototype.toString.call(_transform) === '[object Promise]';
        transformArr.push(_transform(field, val, query));
      }
      // provide filter operator
      else if (_operator) {
        query.filter(field, _operator, val);
      }

      /**
       *  default operate
       */

      // date range
      else if (endsWith(valueType as string, 'Range')) {
        query.gte(field, val[0]);
        query.lte(field, val[1]);
      }

      // db field is enum
      else if (column.isEnum) {
        query.gte(field, val);
      }

      // val is array
      else if (isArray(val)) {
        query.in(field, val);
      }

      // db field is number...
      else if (column.isNumber && !column.isKey && !column.isForeignKey) {
        query.gte(field, val);
      }

      // db field is text...
      else if (column.isTextType) {
        query.ilike(field, `%${val}%`);
      } else {
        query.eq(field, val);
      }
    });

    each(filter, (v, k) => {
      // BUG
      //query.filter(k, 'in', v);
      if (v) query.in(k, v);
    });

    await Promise.all(transformArr);

    each(defaults(sort, schema.sort), (v, k) => {
      const arr = k.split('.');
      if (arr.length > 1) {
        query = query.order(arr[1], { ascending: v === 'ascend', foreignTable: arr[0] });
      } else {
        query = query.order(arr[0], { ascending: v === 'ascend' });
      }
    });

    if (pageSize) {
      const from = (current - 1) * pageSize;
      const to = current * pageSize - 1;
      query = query.range(from, to);
    }

    return query as any;
  };

  /**
   *
   *
   *
   * upsert
   *
   */
  const upsert = async (row: any) => {
    // remove added columns ;
    // remove generated columns;
    // convert undefined to null
    const data = meta.pickColumns(mapValues(row, (val) => (isUndefined(val) ? null : val)));
    let query = entity().update(data);
    for (const key of meta.keys) {
      const val = data[key];
      if (!isNil(val)) {
        query.eq(key, val);
      } else {
        query = entity().insert(data);
        break;
      }
    }

    return (await query)?.data?.[0];
  };

  const del = (row) => entity().delete().eq(ID, row[ID]);

  const batchDel = (ids) => entity().delete().in(ID, ids);
  const batchUpdate = (ids, set) => entity().update(set).in(ID, ids);

  return {
    list,
    upsert,
    delete: del,
    batchDel,
    batchUpdate,
  };
};

export default Request;
