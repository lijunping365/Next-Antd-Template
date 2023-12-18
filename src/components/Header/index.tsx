import React from 'react';
import { useAuthContext } from '@/components/Provider/AuthContext';
import { Avatar, Button, Dropdown, Layout, MenuProps, Space } from 'antd';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { IconDark } from '@/components/Icon/IconDark';
import { IconLight } from '@/components/Icon/IconLight';
import { useThemeContext } from '@/components/Provider/ThemeContext';

const items: MenuProps['items'] = [
  {
    key: '2',
    label: '退出登录',
    icon: <LogoutOutlined />,
  },
];

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: React.FC<Props> = ({ collapsed, setCollapsed }: Props) => {
  const { user } = useAuthContext();
  const { theme, toggleTheme } = useThemeContext();
  return (
    <Layout.Header
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px 0 16px',
        justifyContent: 'space-between',
        background: theme === 'light' ? '#fff' : '#141414',
        borderBottom:
          theme !== 'light' ? '1px solid #343A46' : '1px solid #EBECF0',
      }}
    >
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          width: 36,
          height: 36,
        }}
      />

      <Space size='middle'>
        <Button
          type='text'
          icon={
            theme === 'dark' ? (
              <IconDark style={{ height: 20, width: 20 }} />
            ) : (
              <IconLight style={{ height: 24, width: 24 }} />
            )
          }
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => toggleTheme && toggleTheme()}
        />

        <Dropdown menu={{ items }}>
          <Avatar
            src={user?.avatar || 'logo.png'}
            alt='avatar'
          />
        </Dropdown>
      </Space>
    </Layout.Header>
  );
};

export default Header;
