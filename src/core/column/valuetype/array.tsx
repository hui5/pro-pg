import { Tag } from 'antd';
import React from 'react';
import { Item } from '../../schema/schema';

const array = {
  render: (val: any[]) => val?.map((v, i) => <Tag key={i}>{v}</Tag>),

  editable: false,

  _search: false,

  _form: {
    valueType: 'formList',
    columns: [{ dataIndex: [], width: 'md' }],
  },
} as Item;

export default array;
