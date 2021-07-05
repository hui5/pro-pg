import { useClient } from '../client/ClientContext';
import { JoinByMeta } from '../meta/useTableMeta';

/**
 *
 *  adds & dels many-to-many relations through joinTable
 */
export const useJoinTableAction = (meta: JoinByMeta, fromRecord: object) => {
  const { pg } = useClient();

  const { from, to, by: join } = meta;

  const adds = async (records) =>
    (
      await pg.from(join.table).upsert(
        records.map((record) => ({
          [join.fromKey]: fromRecord[from.key],
          [join.toKey]: record[to.key],
        })),
        { onConflict: [join.fromKey, join.toKey].join(',') },
      )
    ).data;

  const dels = async (records) =>
    (
      await pg
        .from(join.table)
        .delete()
        .eq(join.fromKey, fromRecord[from.key])
        .in(
          join.toKey,
          records.map((record) => record[to.key]),
        )
    ).data;

  const add = async (record) => (await adds([record]))[0];
  const del = async (record) => (await dels([record]))[0];

  return {
    adds,
    dels,
    add,
    del,
  };
};
