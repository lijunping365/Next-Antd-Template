import React, { useState, FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, message } from 'antd';
import { HourglassOutlined, UserOutlined } from '@ant-design/icons';
import { getFakeSmsCaptcha } from '@/services/api';
import { useAuthContext } from '@/components/Provider/AuthContext';
import { generateUUID } from '@/lib/utils';

interface WxLoginProps {
  redirect: string;
}

const deviceId = generateUUID();

const MobileLogin: FC<WxLoginProps> = ({ redirect }) => {
  const router = useRouter();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const onGetSmsCaptcha = async () => {
    message.warning('暂不支持！');
    // getFakeSmsCaptcha({ mobile: phone, deviceId }).then((result: any) => {
    //   if (result && result.success) {
    //     message.success('短信验证码已发送！请注意查收');
    //   }
    // });
  };

  const onFinish = async (values: any) => {
    message.warning('暂不支持！');
  };

  return (
    <Form
      name='normal_login'
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name='mobile'
        rules={[
          { required: true, message: '请输入手机号!' },
          {
            pattern: /^1\d{10}$/,
            message: '手机号格式错误！',
          },
        ]}
      >
        <Input
          size={'large'}
          placeholder='手机号'
          prefix={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item
        name='captcha'
        rules={[{ required: true, message: '请输入验证码!' }]}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Input
            size={'large'}
            placeholder='验证码'
            prefix={<HourglassOutlined />}
            style={{ marginRight: '8px' }}
          />

          <Button
            size={'large'}
            onClick={onGetSmsCaptcha}
            style={{ fontSize: '14px' }}
          >
            发送验证码
          </Button>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          size={'large'}
          htmlType='submit'
          style={{ width: '100%' }}
          loading={loading}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MobileLogin;
