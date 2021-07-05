import Modal from 'antd/lib/modal';
import React, { useState } from 'react';

export const Dialog = ({ trigger, children, width = '700px' }) => {
  const [visible, setVisible] = useState(false);
  const hide = () => setVisible(false);
  const show = () => setVisible(true);

  return (
    <span
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <a onClick={show}>{trigger}</a>
      <Modal
        footer={null}
        visible={visible}
        width={width}
        onOk={hide}
        onCancel={hide}
        closable={true}
        destroyOnClose={true}
        // maskClosable={false}

        // bodyStyle={{
        //   padding: '0px',
        // }}
      >
        {children}
      </Modal>
    </span>
  );
};
