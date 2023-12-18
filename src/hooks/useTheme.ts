import { useEffect, useState } from 'react';

const useTheme = (): [string, () => void] => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storeTheme = window.localStorage.getItem('theme');
    if (storeTheme) setTheme(storeTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const value = prevTheme === 'light' ? 'dark' : 'light';
      window.localStorage.setItem('theme', value);
      return value;
    });
  };

  return [theme, toggleTheme];
};

export default useTheme;
