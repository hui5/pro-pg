import { EllipsisOutlined } from '@ant-design/icons';
import { BetaSchemaForm, ProFormColumnsType } from '@ant-design/pro-form';
import { Button, ButtonProps, Dropdown, Menu } from 'antd';
import { find } from 'lodash';
import { default as React, useEffect, useState } from 'react';
import { usePromise } from 'react-use';

/**
 *
 *   ActionButton  :   auto add loading
 *
 */
export const ActionButton = ({
  children,
  action,
  name,
  ...props
}: { action: () => Promise<any> } & ButtonProps) => {
  const [loading, setLoading] = useState(false);
  const mounted = usePromise();
  const onClick = async () => {
    setLoading(true);
    await mounted(action());
    setLoading(false);
  };

  return (
    <Button loading={loading} onClick={onClick} {...props}>
      {children || name}
    </Button>
  );
};

/**
 *
 *  Link
 */
export const Link = ({ action, ...props }: { action: () => Promise<any> } & ButtonProps) => (
  <ActionButton action={action} type="link" size="small" style={{ padding: '0 0' }} {...props} />
);

/**
 *
 *  Menu
 */
export const LinkMenu = ({ menu }) => {
  const [loading, setLoading] = useState(false);
  const onClick = async ({ key }) => {
    setLoading(true);
    const item = find(menu, { name: key });
    !item.form && (await item.action());
    setLoading(false);
  };
  return (
    <Dropdown
      overlay={
        <Menu onClick={onClick}>
          {menu.map(({ name, disabled, form, action }) => (
            <Menu.Item key={name} disabled={disabled}>
              {form ? (
                <BetaSchemaForm
                  layoutType="ModalForm"
                  onFinish={action}
                  columns={form as ProFormColumnsType[]}
                  trigger={<a>{name}</a>}
                />
              ) : (
                name
              )}
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <Button loading={loading} shape="round" type="dashed" size="small">
        <EllipsisOutlined />
      </Button>
    </Dropdown>
  );
};
