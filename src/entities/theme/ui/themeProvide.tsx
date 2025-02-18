import { FC, useMemo, useState } from 'react';
import { IThemeProvider } from '../model/themeProviderTypes';
import { ThemeContext } from '../config/themeConfig';

export const ThemeProvide: FC<IThemeProvider> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');

  const defaultValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};
