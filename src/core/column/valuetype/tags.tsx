import { Space, Tag } from 'antd';
import { map } from 'lodash';
import React from 'react';
import { Item } from '../../schema/schema';
import { state } from '../enums';

const Tags = ({ val }) => (
  <Space>
    {map(val, (tag, index) => (
      <Tag color={tag?.color} key={index}>
        {tag?.name}
      </Tag>
    ))}
  </Space>
);

const tags: Item = {
  title: '标签',
  dataIndex: 'labels',
  render: (val) => <Tags val={val} />,
  editable: false,
  hideInSearch: true,
  _form: [
    {
      width: 'sm',
      valueType: 'formList',
      columns: [
        {
          valueType: 'group',
          columns: [
            {
              title: '名称',
              dataIndex: 'name',
            },

            {
              title: '颜色',
              dataIndex: 'color',
              valueType: 'select',
              valueEnum: state,
            },
            {
              title: ' ',
              dataIndex: 'color',
              valueType: 'color',
            },
          ],
        },
      ],
    },
    {
      title: '',
      readonly: true,
    },
  ],
};

export default tags;
