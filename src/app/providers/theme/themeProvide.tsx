import { FC, useState } from 'react';
import { IThemeProvider } from './themeProviderTypes';
import { ThemeContext } from '../../../shared/config/theme/themeConfig';

export const ThemeProvide: FC<IThemeProvider> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');

  const defaultValue = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};
