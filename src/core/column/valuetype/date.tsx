import { Item } from '../../schema/schema';

const date: Item = {
  valueType: 'date',
  sorter: true,
  _search: {
    valueType: 'dateRange',
  },
};

export default date;
