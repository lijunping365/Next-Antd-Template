import { Alert, Button, Divider, Table, TablePaginationConfig } from 'antd';
import React, { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { API } from '@/types/typings';

interface Props<T> {
  columns: ColumnsType<any>;
  tableData: T[];
  loading: boolean;
  tableParams: API.TableParams;
  onTableChange: (pagination: TablePaginationConfig) => void;
  onBatchDelete: (rows: any[]) => Promise<void>;
}
const ProTable = <T,>({
  columns,
  tableData,
  loading,
  tableParams,
  onTableChange,
  onBatchDelete,
}: Props<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handlerBatchDelete = async () => {
    if (!selectedRowKeys) return;
    await onBatchDelete(selectedRowKeys);
    setSelectedRowKeys([]);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      {hasSelected && (
        <Alert
          type='info'
          style={{ marginBottom: 16 }}
          showIcon
          message={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>{' '}
              项&nbsp;&nbsp;
            </div>
          }
          action={
            <>
              <a onClick={() => setSelectedRowKeys([])}>取消选择</a>
              <Divider type='vertical' />
              <a onClick={() => handlerBatchDelete()}>批量删除</a>
            </>
          }
        />
      )}

      <Table
        loading={loading}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={tableData}
        pagination={tableParams.pagination}
        onChange={(pagination) => onTableChange(pagination)}
        rowSelection={rowSelection}
      />
    </>
  );
};

export default ProTable;
