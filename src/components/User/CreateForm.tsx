import React from 'react';
import { Form, Button, Input, Modal } from 'antd';
import { API } from '@/types/typings';

export interface CreateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.User>) => void;
  onSubmit: (values: Partial<API.User>) => void;
  modalVisible: boolean;
  values?: Partial<API.User>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = ({
  onCancel,
  onSubmit,
  modalVisible,
  values,
}: CreateFormProps) => {
  const [form] = Form.useForm();

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({ ...values, ...fieldsValue });
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => onCancel()}>取消</Button>
        <Button
          type='primary'
          onClick={() => handleNext()}
        >
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      style={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title='用户编辑'
      open={modalVisible}
      footer={renderFooter()}
      onCancel={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={values}
      >
        <FormItem
          name='username'
          label='用户名称'
          rules={[{ required: true, message: '请输入用户名称！' }]}
        >
          <Input placeholder='请输入用户名称' />
        </FormItem>

        <FormItem
          name='phone'
          label='手机号'
          rules={[{ required: true, message: '请输入手机号！' }]}
        >
          <Input placeholder='请输入手机号' />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
