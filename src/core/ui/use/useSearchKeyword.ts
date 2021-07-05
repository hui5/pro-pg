import { ActionType } from '@ant-design/pro-table';
import { ListToolBarHeaderMenuProps } from '@ant-design/pro-table/lib/components/ListToolBar/HeaderMenu';
import { isFunction } from 'lodash';
import { useState } from 'react';
import { SearchSchema } from '../../schema/schema';

const Mode = {
  All: 'All',
  Sub: 'Sub',
};

export default ({
  searchSchema,
  actionRef,
  subMode = null,
}: {
  searchSchema: SearchSchema<any>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  subMode?: (() => object) | object | null;
}) => {
  const [keyword, setKeyword] = useState('');
  const [waitingBack, setWaitingBack] = useState(1);
  const [mode, setMode] = useState(Mode.All);

  const params = {};
  // get first search schema
  params[searchSchema.dataIndex as string] = keyword;

  if (mode === Mode.Sub) {
    Object.assign(params, isFunction(subMode) ? subMode() : subMode);
  }

  const toggleMode = () => {
    if (mode === Mode.Sub) {
      actionRef.current?.setPageInfo?.({ current: waitingBack });
      setWaitingBack(1);
      setMode(Mode.All);
    } else {
      setWaitingBack(actionRef.current?.pageInfo?.current);
      actionRef.current?.setPageInfo({ current: 1 });
      setMode(Mode.Sub);
    }
  };

  const changeMode = (to) => to !== mode && toggleMode();

  return {
    params,
    search: {
      // autoFocus: true,
      enterButton: mode === Mode.Sub,
      placeholder: searchSchema.title,
      onSearch: (value) => {
        if (keyword === value) {
          subMode && toggleMode();
        } else {
          actionRef.current?.setPageInfo?.({ current: 1 });
          setWaitingBack(1);

          setKeyword(value);
        }
      },
    },

    menu: (labelAll, labelSub) =>
      ({
        type: 'dropdown',
        activeKey: mode,
        items: [
          {
            label: labelAll,
            key: Mode.All,
          },
          {
            label: labelSub,
            key: Mode.Sub,
          },
        ],
        onChange: (mode) => changeMode(mode),
      } as ListToolBarHeaderMenuProps),
  };
};
