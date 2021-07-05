import { Badge } from 'antd';
import React from 'react';

export const BadgeNumber = ({ num }) => (
  <Badge
    count={num}
    size="default"
    style={{
      fontSize: '15px',
      marginTop: -2,
      marginLeft: 4,
      color: num > 10 ? '#1890FF' : '#999',
      backgroundColor: num > 5 ? '#E6F7FF' : '#eee',
    }}
  />
);
