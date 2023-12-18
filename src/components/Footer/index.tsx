import React from 'react';
import { Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface Props {
  theme: string;
}
const Header: React.FC<Props> = ({ theme }: Props) => {
  return (
    <Layout.Footer
      style={{
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#000',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          fontSize: 16,
        }}
      >
        <Link href='https://github.com/lijunping365/Open-Job'>
          <GithubOutlined /> Open-Job
        </Link>
        <Link href='https://github.com/lijunping365/Open-Job-Dashboard'>
          <GithubOutlined /> Open-Job-Dashboard
        </Link>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >{`Copyright © ${new Date().getFullYear()} OpenByteCode`}</div>
    </Layout.Footer>
  );
};

export default Header;
