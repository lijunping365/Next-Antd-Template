import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from "react";

const { confirm } = Modal;

export const confirmModal = (title: string = 'Do you want to delete this item?') => {
  return new Promise((resolve) => {
    confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        resolve(true)
      },
      onCancel() {
        resolve(false)
      },
    });
  });
};
