import { endsWith, filter } from 'lodash';
import { useClient } from '../client/ClientContext';
import { paths } from '../meta/definitions-base';

type NameReturn = {
  select_foreign: { value: any; label: string };
  select: { value: any };
};

export const useRPC = () => {
  const { pg_base, queryClient } = useClient();

  return async <
    N extends keyof NameReturn,
    P extends `/rpc/${N}` & keyof paths,
    R extends NameReturn[N],
  >(
    name: N,
    params: paths[P]['post']['parameters']['body']['args'],
  ) => {
    // console.log('rpc: ', name);
    const relatedTables = filter(params, (val, key) => endsWith(key, 'table'));

    return queryClient.fetchQuery([relatedTables, name, params], async () => {
      return (await pg_base.rpc<R>(name, params)).data || [];
    });
  };
};
