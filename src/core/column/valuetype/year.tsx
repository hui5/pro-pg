import { InputNumber } from 'antd';
import React from 'react';
import { Template } from '..';
import { selectColumn } from './search-select';

const year: Template = (column) => ({
  valueType: 'select',
  renderFormItem: () => <InputNumber min={1900} max={2030}></InputNumber>,
  _search: selectColumn(column),
});

export default year;
