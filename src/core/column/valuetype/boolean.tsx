import { CheckCircleTwoTone } from '@ant-design/icons';
import React from 'react';
import { Template } from '..';

const boolean: Template = ({ defaultValue }) => {
  return {
    valueType: 'switch',
    render: (dom, entity, index, action, schema) =>
      entity[schema.dataIndex as string] ? (
        <CheckCircleTwoTone style={{ fontSize: '18px' }} twoToneColor="#52c41a" />
      ) : (
        // <CloseCircleTwoTone style={{ fontSize: '18px' }} twoToneColor="#ff8787" />
        ''
      ),

    _search: {
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
    },
    _form: {
      initialValue: defaultValue === 'true' ? true : false,
    },
  };
};

export default boolean;
