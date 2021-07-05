import { notification } from 'antd';

export const processResult = ({ data, error, count }) => {
  if (error) {
    notification.error({ message: `${error.code}：${error.message}`, description: error.hint });
    throw Error(error.message);
  }

  return {
    data,
    error,
    count,
    // add for pro components
    success: !error,
    total: count,
    errorCode: error?.code,
    errorMessage: error?.message,
  };
};
