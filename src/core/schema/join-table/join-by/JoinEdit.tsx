import ProCard from '@ant-design/pro-card';
import { Alert, Button, Space, Typography } from 'antd';
import React from 'react';
import { Dialog } from '../../../ui/components/Dialog';
import { StaticTable } from '../../../ui/table/StaticTable';
import { ValueProps } from '../../../ui/type';
import { JoinTable } from './JoinTable';
import SelectChildren from './SelectChildren';
import SelectChildrenSimple from './SelectChildrenSimple';
import { JoinProps } from './type';

/**
 *
 *  edit join table
 *
 */
export const JoinEdit = ({
  manageable,
  ...props
}: JoinProps &
  ValueProps & {
    manageable: boolean;
  }) => {
  return (
    <ProCard ghost>
      <ProCard colSpan={8}>
        <Space style={{ width: '100%' }} size="large" direction="vertical">
          <Dialog trigger={<Button>选取</Button>}>
            <SelectChildren {...props} />
          </Dialog>

          {manageable && (
            <Dialog trigger="设置">
              <JoinTable editable {...props} />
            </Dialog>
          )}

          {props.value &&
            (props.value.length > 5 ? (
              <Typography.Text type="secondary">超过 5 项， 请使用选取功能</Typography.Text>
            ) : (
              <SelectChildrenSimple {...props} />
            ))}
          <Alert type="info" showIcon={true} message="此处操作会直接修改数据库" />
        </Space>
      </ProCard>

      <ProCard ghost>
        <StaticTable
          table={props.meta.to.table}
          value={props.value}
          cols={props.cols}
          plain
        ></StaticTable>
      </ProCard>
    </ProCard>
  );
};
