import ProTable, { ActionType } from '@ant-design/pro-table';
import { filter, includes, keys } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { getSearchSchema } from '../../schema/schema';
import useSchema from '../../schema/useSchema';
import { ValueProps } from '../type';

export const StaticTable = ({
  table,
  cols,
  value = [],
  onChange,
  plain = false,
  title,
  subTitle,
}: {
  table: string;
  cols?: string[];
  plain?: boolean;
  title?: string;
  subTitle?: string;
} & ValueProps) => {
  cols = cols || keys(value[0]);
  const actionRef = useRef<ActionType>();

  const { schema, tableDesc } = useSchema(table, {}, { cols, type: 'static' });

  const search = getSearchSchema(schema, cols[0]);
  const [keyword, setKeyword] = useState('');

  const dataSource = filter(value, (item) =>
    includes(
      (item[search.dataIndex as string] as string).toString().toLowerCase(),
      keyword.toLowerCase(),
    ),
  );

  useEffect(() => {
    actionRef.current?.reloadAndRest && actionRef.current.reloadAndRest();
  }, [keyword]);

  return (
    <ProTable
      dataSource={dataSource}
      columns={schema.table}
      actionRef={actionRef}
      rowKey={schema.id}
      search={false}
      options={false}
      // @ts-ignore
      toolbar={{
        title: title || tableDesc || schema.name,
        subTitle,
        search: {
          placeholder: search?.title,
          onChange: (e) => {
            setKeyword(e.target.value);
          },
        },
      }}
      pagination={{
        pageSize: 5,
        simple: true,
        hideOnSinglePage: true,
      }}
      // bordered={true}
      // toolBarRender={() => []}
      {...(plain
        ? {
            headerTitle: null,
            size: 'small',
            toolbar: null,
          }
        : {})}
    />
  );
};
