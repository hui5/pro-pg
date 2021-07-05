import { castArray } from 'lodash';
import { useClient } from '../db/client/ClientContext';
import { useMeta } from '../db/meta/useTableMeta';

export const useGetDefaultCols = () => {
  const dbMeta = useMeta();
  const { config } = useClient();

  return (table: string) => {
    if (!dbMeta[table]) throw Error(table + " 's meta not exist.");
    return (config.cols?.[table] ||
      castArray(dbMeta[table].firstTextCol() || dbMeta[table].cols[0])) as string[];
  };
};
