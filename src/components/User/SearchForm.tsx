import { Button, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';

const FormItem = Form.Item;

interface Props {
  form: any;
  fetchData: () => void;
}

const SearchForm = ({ form, fetchData }: Props) => {
  return (
    <Form
      layout='inline'
      form={form}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <FormItem name='name'>
          <Input
            allowClear
            placeholder='输入用户名称'
            prefix={<SearchOutlined />}
          />
        </FormItem>

        <Button
          type='primary'
          icon={<SearchOutlined />}
          onClick={fetchData}
        >
          查询
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
