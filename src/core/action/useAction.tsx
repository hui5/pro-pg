import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { BetaSchemaForm, ProFormColumnsType } from '@ant-design/pro-form';
import { ParamsType } from '@ant-design/pro-provider';
import type { ActionType, ProColumns, ProTableProps } from '@ant-design/pro-table';
import { Button, ButtonProps, Space, Table } from 'antd';
import { every, isNumber, matches, omit, random } from 'lodash';
import { default as React } from 'react';
import { useQueryRequest } from '../db/action/useQuery';
import { Schema } from '../schema/schema';
import { ActionButton, Link, LinkMenu } from './Button';
import { groupOperates, Operate } from './operate';
import { SchemaForm } from './SchemaForm';

/**
 *
 *
 *   use action
 *
 */
type ActionProps<T> = {
  schema: Schema;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  operates?: Operate<T>[];
};

export const useAction = <T extends object>({
  schema,
  actionRef,
  operates = [],
}: ActionProps<T>) => {
  const request = useQueryRequest(schema, actionRef);

  const ID = schema.id;

  // submit and reload
  const sumbit = async (formData) => {
    await request.upsert(formData);
    actionRef.current?.reload();
    return true;
  };

  // add clear and reload effect
  const Action = ({ action, children, ...props }: { action: () => void } & ButtonProps) => (
    <ActionButton
      action={async () => {
        await action();
        // actionRef.current.clearSelected();
        actionRef.current?.reload();
      }}
      {...props}
    >
      {children}
    </ActionButton>
  );

  const Create = ({ initialValues = {}, ...props }) => (
    <BetaSchemaForm
      title="新建"
      layoutType="ModalForm"
      onFinish={sumbit}
      columns={schema.form}
      initialValues={initialValues}
      trigger={
        <Button icon={<PlusOutlined />} type="primary">
          新建
        </Button>
      }
      {...props}
    />
  );

  /**
   *
   *  inline edit
   *
   */
  // for editable table new line
  const tempId = () => random(0, 1, true);
  const omitTempId = (row) =>
    (isNumber(row[ID]) && row[ID] < 1) || !row[ID] ? omit(row, ID) : row;

  const editable = {
    onSave: async (key, row) => {
      // EditableProTable will auto add row index, so remove
      let newData = omit(row, 'index');
      newData = omitTempId(newData);
      if (newData[ID]) {
        request.update(newData);
      } else {
        const result = await request.upsert(newData);
        row[ID] = result?.[ID];
      }
    },
    onDelete: async (key, row) => request.delete(row),
  };

  /**
   *
   *  operates
   *
   */
  const { defaultOpers, userOpers, operOption } = groupOperates(operates, schema);

  const actionOpers = (records: T[], ids?: (string | number)[]) => {
    const singleRecord = records.length > 1 ? null : records[0];

    return userOpers
      .filter(({ hide, show, fun, funs }) => {
        if ((hide && every(records, hide)) || (show && every(records, (record) => !show(record)))) {
          return false;
        }
        if (!singleRecord && fun && !funs) return false;
        return true;
      })
      .map(({ name, set, form, fun, funs, relaod, hide, show, ...other }) => {
        const action = async (data?: object) => {
          if (set || form) {
            await (singleRecord
              ? request.upsert({ ...singleRecord, ...(data || set) })
              : request.batchUpdate(ids, data || set));
          } else {
            if (fun && singleRecord) {
              await fun(singleRecord);
            }

            if (funs) {
              await funs(records);
            }
          }

          relaod !== false && actionRef.current?.reload();
          actionRef.current?.clearSelected && actionRef.current.clearSelected();
          return true;
        };
        return {
          key: name,
          name,
          action,
          form,
          disabled: set && every(records, matches(set)),
          ...other,
        };
      });
  };

  /**
   *
   * row operate column
   *
   */
  const renderOperates: ProColumns<any>['render'] = (text, record, index, action) => {
    const LINKS_NUM = operOption.maxInRow ?? 2;

    let opers = actionOpers([record], [record[ID]]).filter(
      ({ form, showInRow }) => !form || showInRow,
    );
    const menu = opers.splice(LINKS_NUM);

    return [
      ...defaultOpers.map((item) =>
        item === 'inline_edit' ? (
          <a
            key="inline_edit"
            onClick={() => {
              action?.startEditable?.(record[ID]);
            }}
          >
            <EditOutlined />
          </a>
        ) : item === 'edit' ? (
          <SchemaForm
            {...{
              key: 'edit',
              name: '编辑',
              columns: schema.form,
              onFinish: sumbit,
              record,
            }}
          ></SchemaForm>
        ) : null,
      ),

      ...opers.map(({ form, button, ...props }) =>
        form ? (
          <BetaSchemaForm
            layoutType="ModalForm"
            onFinish={props.action}
            columns={form as ProFormColumnsType[]}
            trigger={<a>{props.name}</a>}
          />
        ) : (
          <Link {...button} {...props}></Link>
        ),
      ),
      menu.length > 0 && <LinkMenu key="menu" menu={menu} />,
    ];
  };

  /**
   *
   * select and  batch operate
   *
   */
  const batch = {
    rowSelection: {
      selections: [Table.SELECTION_INVERT],
    },
    tableAlertRender: ({ selectedRowKeys, selectedRows, onCleanSelected }) => {
      let opers = actionOpers(selectedRows, selectedRowKeys);
      return (
        <Space size={24}>
          <Space size={16}>
            <a onClick={onCleanSelected}>取消选择</a>
            <span>已选 {selectedRowKeys.length} 项</span>
          </Space>
          <Space size={16}>
            {/* 批量操作： */}
            {opers.map(({ form, button, ...props }, index) =>
              form ? (
                <BetaSchemaForm
                  key={index}
                  layoutType="ModalForm"
                  onFinish={props.action}
                  columns={form as ProFormColumnsType[]}
                  trigger={<a>{props.name}</a>}
                />
              ) : (
                <ActionButton
                  type={index === 0 ? 'primary' : 'ghost'}
                  {...button}
                  {...props}
                ></ActionButton>
              ),
            )}
          </Space>
        </Space>
      );
    },

    tableAlertOptionRender: ({ selectedRowKeys }) =>
      operOption.batchDelete !== false && (
        <Action
          danger
          type="primary"
          action={async () => {
            await request.batchDel(selectedRowKeys);
            actionRef.current?.clearSelected && actionRef.current?.clearSelected;
          }}
        >
          删除
        </Action>
      ),
  };

  const testOnly = {
    expandedRowRender: (record, index) => (
      <SchemaForm
        {...{
          key: 'edit',
          name: '编辑',
          columns: schema.form,
          onFinish: sumbit,
          record,
          layoutType: 'Form',
        }}
      ></SchemaForm>
    ),
  } as ProTableProps<any, ParamsType>;

  /**
   *
   *  result
   *
   */

  // can't drrect use schema.table,  this will call multi times
  const columns = [...schema.table];
  operates.length > 0 &&
    columns.push({
      title: '操作',
      valueType: 'option',
      render: renderOperates,
    });

  return {
    request,
    Action,
    Create,
    editable,
    columns,
    batch,
    tempId,
    ID,
    testOnly,
  };
};
