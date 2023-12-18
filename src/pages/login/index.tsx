import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import Link from 'next/link';
import { IconLogo } from '@/components/Icon/IconLogo';
import AccountLogin from '@/components/Login/AccountLogin';
import MobileLogin from '@/components/Login/MobileLogin';
import { useLoginRedirect } from '@/hooks/useLoginRedirect';
import { useThemeContext } from '@/components/Provider/ThemeContext';

const items: TabsProps['items'] = [
  {
    key: 'account',
    label: '账户密码登录',
  },
  {
    key: 'mobile',
    label: '手机号登录',
  },
];
const Login: React.FC = () => {
  const redirect = useLoginRedirect();
  const { theme } = useThemeContext();
  const [type, setType] = useState<string>('account');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'auto',
        backgroundColor: theme === 'light' ? '#fff' : '#000',
        backgroundImage:
          theme === 'light'
            ? `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
            : `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(51 65 85 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div style={{ flex: 1, padding: '32px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>
            <Link
              href='/'
              style={{
                height: '64px',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              <IconLogo style={{ width: 48, height: 48, color: '#149eca' }} />
              <span
                style={{
                  marginLeft: 10,
                  color: theme === 'light' ? '#080e29' : '#c5c5c5',
                }}
              >
                Next-Antd
              </span>
            </Link>

            <div
              style={{
                marginTop: '12px',
                color: theme === 'light' ? '#5e637a' : '#9b9a9a',
                fontSize: '16px',
              }}
            >
              Template with Next and Antd
            </div>
          </h1>
        </div>
        <div style={{ width: '328px', margin: '0 auto' }}>
          <Tabs
            defaultActiveKey='account'
            items={items}
            onChange={setType}
            centered
          />
          {type === 'account' && <AccountLogin redirect={redirect} />}
          {type === 'mobile' && <MobileLogin redirect={redirect} />}
        </div>
      </div>
    </div>
  );
};

export default Login;
