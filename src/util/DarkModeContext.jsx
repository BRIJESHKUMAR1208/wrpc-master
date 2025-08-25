import React, { createContext, useState, useContext, useEffect } from 'react';

const DarkModeContext = createContext();

const THEME_HREF = {
  dark: `${process.env.PUBLIC_URL}/assets/css/dark11111.css`,
  color: `${process.env.PUBLIC_URL}/assets/css/color111111.css`,
};

function ensureThemeLink() {
  let link = document.getElementById('theme-link');
  if (!link) {
    link = document.createElement('link');
    link.id = 'theme-link';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  return link;
}

function DarkModeProvider({ children }) {
  // Persisted theme (default to "color")
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'color');

  // Apply theme file whenever theme changes
  useEffect(() => {
    const link = ensureThemeLink();
    link.href = THEME_HREF[theme] || THEME_HREF.color;
  }, [theme]);

  // On first mount, make sure link exists & correct href is set (handles hard refresh)
  useEffect(() => {
    const link = ensureThemeLink();
    link.href = THEME_HREF[theme] || THEME_HREF.color;
  }, []); // run once

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
}

const useDarkMode = () => useContext(DarkModeContext);

export { DarkModeContext, DarkModeProvider, useDarkMode };
