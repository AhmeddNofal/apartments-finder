"use client";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import appTheme from '@/theme';

export default function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={appTheme}>
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
