import { createMuiTheme, Theme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    themeName?: string;
  }
}

type ThemeType = 'light' | 'dark';

const createTheme = (type: ThemeType): Theme => {
  const palette = {
    type,
    primary: { main: type === 'light' ? '#009688' : '#00695c' },
    secondary: { main: type === 'light' ? '#ffa726' : '#cb8926' },
  };

  return createMuiTheme({
    palette,
  });
};

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');
