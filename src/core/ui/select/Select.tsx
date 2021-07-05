import { Select } from 'antd';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

export const SelectBase = ({ request, initOptions = [], ...props }) => {
  const [searchOptions, setSearchOptions] = useState<any[]>();
  const [loading, setLoading] = useState(false);

  const search = (value: string) => {
    setLoading(true);
    setSearchOptions([]);
    request(value).then((data) => {
      setSearchOptions(data);
      setLoading(false);
    });
  };

  return (
    <Select
      options={searchOptions || initOptions}
      showSearch={true}
      allowClear={true}
      onSearch={search}
      onFocus={() => isEmpty(searchOptions) && search('')}
      onClear={() => search('')}
      loading={loading}
      {...props}
    ></Select>
  );
};
