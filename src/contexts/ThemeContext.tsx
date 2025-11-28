import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  landingTheme: 'light' | 'dark';
  toggleLandingTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [landingTheme, setLandingTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('landing_theme') as 'light' | 'dark' | null;
    if (stored) {
      setLandingTheme(stored);
    }
  }, []);

  // Apply theme to document root
  useEffect(() => {
    if (landingTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [landingTheme]);

  const toggleLandingTheme = () => {
    const newTheme = landingTheme === 'light' ? 'dark' : 'light';
    setLandingTheme(newTheme);
    localStorage.setItem('landing_theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ landingTheme, toggleLandingTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
