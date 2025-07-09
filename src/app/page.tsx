'use client';

import React from 'react';
import { createTheme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import Maps from './components/Maps';
import Home from './components/Home';

const NAVIGATION: Navigation = [
  {
    segment: '',
    title: 'Viagem',
    icon: <MapIcon />
  },
  {
    segment: 'gerencia',
    title: 'Gerenciamento',
    icon: <SettingsIcon />,
    children: [
      {
        segment: 'cadastrar',
        title: 'Cadastrar viagem',
      },
      {
        segment: 'editar',
        title: 'Editar viagem',
      }
    ]
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#008080',
      light: '#63a4ff',
      dark: '#008080',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#d05ce3',
      dark: '#6a0080',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5', 
      paper: '#F5F5DC',   
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#f57c00',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#388e3c',
    },
  },
});

export default function DashboardLayoutFullScreen() {
  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{
        logo: '',
        title: 'Vaiali', 
      }}
    >
      <DashboardLayout>
        {/* <Maps /> */}
        <Home />
      </DashboardLayout>
    </AppProvider>
  );
}
