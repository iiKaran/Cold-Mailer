import React, { createContext, useContext, ReactNode } from 'react';

// This context can be expanded to include theme settings, color modes, etc.
interface ThemeContextType {
  // Add theme settings as needed
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // We can expand this with theme state and functions as needed
  const value = {};
  
  return (
    <ThemeContext.Provider value={value as ThemeContextType}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;