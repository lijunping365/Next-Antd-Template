import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { currentUser, login } from '@/services/api';
import { getFakeImageCaptcha } from '@/services/api';
import { Button, Form, Image, Input, message } from 'antd';
import {
  HourglassOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { generateUUID } from '@/lib/utils';
import { useAuthContext } from '@/components/Provider/AuthContext';
import { setAccessToken } from '@/lib/cache';

interface FormLoginProps {
  redirect: string;
}

const deviceId = generateUUID();
const AccountLogin: React.FC<FormLoginProps> = ({ redirect }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const { setUser } = useAuthContext();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response: any = await login({
        ...values,
        deviceId,
        type: 'account',
      });
      message.success('登录成功！');
      setAccessToken(response.accessToken);
      const user = await currentUser();
      if (user) {
        setUser(user);
        router.replace(redirect);
      }
    } catch (error) {
      message.error(`登录失败: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const onGetImageCaptcha = useCallback(async () => {
    getFakeImageCaptcha({ deviceId: deviceId })
      .then((result: any) => {
        if (result && result.success)
          setImageUrl(`data:image/jpeg;base64,${result.imageCode}`);
      })
      .catch((error) => {
        message.error(`获取验证码失败:${error}`);
      });
  }, []);

  useEffect(() => {
    const getImageCaptcha = () => {
      onGetImageCaptcha().then();
    };
    getImageCaptcha();
  }, []);

  return (
    <>
      <Form
        name='normal_login'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input
            size={'large'}
            placeholder='用户名'
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            size={'large'}
            placeholder='密码'
            prefix={<LockOutlined />}
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
              style={{ padding: 0 }}
            >
              <div style={{ padding: '4px' }}>
                <Image
                  alt='captcha'
                  preview={false}
                  src={imageUrl}
                  onClick={onGetImageCaptcha}
                />
              </div>
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
    </>
  );
};

export default AccountLogin;
