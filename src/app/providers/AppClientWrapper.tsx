'use client';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';
import { type Navigation } from "@toolpad/core/AppProvider";
import { Home } from '@mui/icons-material';
import { demoTheme } from '../utils';

const NAVIGATION: Navigation = [
    {
        segment: 'home',
        title: 'Início',
        icon: <Home />
    },
    {
        segment: 'maps',
        title: 'Mapa',
        icon: <MapIcon />
    },
    {
        segment: 'manager',
        title: 'Gerenciamento',
        icon: <SettingsIcon />,
        children: [
            {
                segment: 'trip',
                title: 'Viagens',
            },
            {
                segment: 'register',
                title: 'Cadastrar viagem',
            }
        ]
    },
];

export function AppClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider
            theme={demoTheme}
            navigation={NAVIGATION}
            branding={{ title: 'Vaiali', logo: '' }}
        >
            <DashboardLayout>{children}</DashboardLayout>
        </AppProvider>
    );
}
