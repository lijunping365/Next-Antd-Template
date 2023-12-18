import React from 'react';
import { ThemeContext } from '@/components/Provider/ThemeContext';
import { ConfigProvider, theme } from 'antd';
import useTheme from '@/hooks/useTheme';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const [value, toggleTheme] = useTheme();

  return (
    <ThemeContext.Provider value={{ theme: value, toggleTheme }}>
      <ConfigProvider
        locale={locale}
        theme={{
          algorithm:
            value === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        {props.children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
