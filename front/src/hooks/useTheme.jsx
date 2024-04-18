import { useState, useEffect } from 'react';

export const useTheme = (initialTheme) => {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
  }, [theme]);

  return { theme, toggleTheme };
};
