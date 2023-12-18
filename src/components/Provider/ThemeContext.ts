import React, { useContext } from 'react';

export interface ThemeContextValue {
  theme: string;
  toggleTheme?: () => void;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: 'light',
});

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
