import { Drawer, Popover } from 'antd';
import React, { useState } from 'react';
import { MiniDesc } from './MiniDesc';
import { Desc } from './Desc';

export const DrawerDesc = ({ table, id, children = null, entity = null }) => {
  const [visible, setVisible] = useState(false);
  const hide = () => setVisible(false);
  const show = () => setVisible(true);

  return (
    <span>
      <Popover
        content={() => <MiniDesc table={table} id={id} entity={entity} />}
        mouseEnterDelay={0.5}
      >
        <a onClick={show}>{children || id}</a>
      </Popover>
      <Drawer
        width={700}
        closable={true}
        onClose={hide}
        visible={visible}
        destroyOnClose={true}
        push={false}
      >
        <Desc
          table={table}
          id={id}
          column={1}
          bordered={true}
          size="default"
          labelStyle={{ width: '200px' }}
        />
      </Drawer>
    </span>
  );
};
