'use client';

import React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import Maps from './components/Maps';
import Home from './components/Home';
import { demoTheme, NAVIGATION } from './utils';

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
