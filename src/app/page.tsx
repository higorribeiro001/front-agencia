'use client';

import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

const NAVIGATION: Navigation = [
  {
    segment: '',
    title: 'Map',
    icon: <MapIcon />,
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
});

export default function DashboardLayoutFullScreen() {
  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
    >
      <DashboardLayout>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=40.697670,-74.259875&z=15&output=embed"
          style={{ flex: 1, border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </DashboardLayout>
    </AppProvider>
  );
}
