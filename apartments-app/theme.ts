import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
 interface Palette {
    indigo: {
      50: string;
      100: string;
      500: string;
      600: string;
      700: string;
    };
  }
  
  interface PaletteOptions {
    indigo?: {
      50?: string;
      100?: string;
      500?: string;
      600?: string;
      700?: string;
    };
  }
}

const appTheme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    // Add indigo as a separate palette key
    indigo: {
      50: '#eef2ff',
      100: '#e0e7ff',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
    },

    primary: {
      main: '#4f46e5', // Use indigo-600
      light: '#6366f1', // indigo-500
      dark: '#4338ca', // indigo-700
    },

    background: {
      default: '#f9fafb', // grey-50
    },

    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      400: '#9ca3af',
      600: '#4b5563',
      800: '#1f2937',
      900: '#111827',
    },

    success: {
      main: '#10b981',
    },
  },
});

export default appTheme;
