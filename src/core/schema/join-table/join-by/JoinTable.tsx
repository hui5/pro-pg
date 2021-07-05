import React from 'react';
import { USE_EMPTY_DATA } from '../../../db/action/request';
import LightTable from '../../../ui/table/LightTable';
import useSchema from '../../useSchema';
import { Editable, JoinProps } from './type';

/**
 *
 * show and  edit join table
 *
 */
export const JoinTable = ({
  meta,
  fromRecord,
  title,
  cols,
  editable = false,
  ...other
}: JoinProps & Editable) => {
  const { from, by } = meta;

  return (
    <LightTable
      headerTitle={title}
      {...useSchema(
        by.table,
        { [by.fromKey]: false },
        {
          /**  embed use it  to filter foreign table ,  meanwhile pass to table */
          params: {
            [by.fromKey]: fromRecord[from.key] || USE_EMPTY_DATA,
          },
        },
      )}
      {...(editable
        ? {
            operates: ['inline_edit'],
          }
        : {})}
      {...other}
    />
  );
};
