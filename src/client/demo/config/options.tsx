import { state } from '../../../core/column/enums';
import { OptionsConfig } from '../../../core/schema/config';
import { definitions } from '../meta/definitions';
/**
 *
 *  select options & enums config
 */
const config: OptionsConfig<definitions> = {
  todo: {
    state,
  },
};

export default config;
