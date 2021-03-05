import { useEffect, useState } from 'react';

export const ThemeSelector = () => {
  const [theme, setTheme] = useState<string>("light");
  const [componentMounted, setComponentMounted] = useState(false);

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      window.localStorage.setItem('theme', 'light')
      setTheme('light')
    }    
    setComponentMounted(true);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  return [theme, toggleTheme, componentMounted]
};