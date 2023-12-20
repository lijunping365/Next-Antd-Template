import { message, Divider, Card, Form } from 'antd';
import React, { useState } from 'react';
import { fetchUserPage, updateUser, removeUser, addUser } from '@/services/api';
import { confirmModal } from '@/components/ConfirmModel';
import { ColumnsType } from 'antd/es/table';
import BaseLayout from '@/components/Layout';
import usePaginationRequest from '@/hooks/usePagination';
import SearchForm from '@/components/User/SearchForm';
import ProTable from '@/components/ProTable';
import CreateForm from '@/components/User/CreateForm';
import { API } from '@/types/typings';

const TableList: React.FC = () => {
  const [form] = Form.useForm();
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});

  const request = async (params: API.PageParams) => {
    const values = form.getFieldsValue();
    return await fetchUserPage({
      ...values,
      current: params.current,
      pageSize: params.pageSize,
    });
  };

  const [tableData, loading, tableParams, onTableChange, fetchData] =
    usePaginationRequest<API.User>((params) => request(params));

  const handleUpdate = async (fields: Partial<API.User>) => {
    const hide = message.loading('正在修改');
    try {
      await updateUser(fields);
      hide();
      message.success('修改成功');
      setUpdateModalVisible(false);
      setUpdateFormValues({});
      fetchData().then();
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
    }
  };

  const handleCreate = async (fields: Partial<API.User>) => {
    const hide = message.loading('正在添加');
    try {
      await addUser(fields);
      hide();
      message.success('添加成功');
      setCreateModalVisible(false);
      fetchData().then();
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  const handleRemove = async (selectedRows: any[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return;
    try {
      await removeUser({ ids: selectedRows });
      hide();
      message.success('删除成功，即将刷新');
      fetchData().then();
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
    }
  };

  const columns: ColumnsType<API.User> = [
    {
      title: '用户id',
      dataIndex: 'id',
    },
    {
      title: '用户名称',
      dataIndex: 'username',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => (
        <span>{record.status === 1 ? '禁用' : '启用'}</span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setUpdateModalVisible(true);
              setUpdateFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type='vertical' />
          <a
            onClick={async () => {
              const confirm = await confirmModal();
              if (confirm) {
                await handleRemove([record.id]);
                fetchData().then();
              }
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <BaseLayout>
      <Card bordered={false}>
        <div className='search-form-wrapper'>
          <SearchForm
            form={form}
            fetchData={fetchData}
          />
        </div>

        <ProTable<API.User>
          columns={columns}
          tableData={tableData}
          loading={loading}
          tableParams={tableParams}
          onTableChange={onTableChange}
          onBatchDelete={(rows) => handleRemove(rows.map((e) => e.id))}
        />
      </Card>

      <CreateForm
        onSubmit={(values) => handleCreate(values)}
        onCancel={() => setCreateModalVisible(false)}
        modalVisible={createModalVisible}
      />

      {updateFormValues && Object.keys(updateFormValues).length ? (
        <CreateForm
          onSubmit={(values) => handleUpdate(values)}
          onCancel={() => {
            setUpdateModalVisible(false);
            setUpdateFormValues({});
          }}
          modalVisible={updateModalVisible}
          values={updateFormValues}
        />
      ) : null}
    </BaseLayout>
  );
};

export default TableList;
