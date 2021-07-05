export interface IValueEnum {
  [key: string]: {
    text: string;
    status?: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
    color?: string;
    disabled?: boolean;
  };
}

export const state: IValueEnum = {
  success: {
    text: '成功',
    status: 'Success',
  },
  error: {
    text: '错误',
    status: 'Error',
  },
  processing: {
    text: '进行中',
    status: 'Processing',
  },
  warning: {
    text: '警告',
    status: 'Warning',
  },
  default: {
    text: '默认',
    status: 'Default',
  },
};
