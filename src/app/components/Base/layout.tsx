"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import AlertApp from '../AlertApp';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { ptBR } from '@mui/material/locale';
import Users from '@/app/users/page';

const NAVIGATION: Navigation = [
  {
    segment: 'farm',
    title: 'Fazenda',
    icon: <AgricultureIcon />,
  },
  {
    segment: 'product',
    title: 'Produto',
    icon: <AgricultureIcon />,
    children: [
      {
        segment: 'products',
        title: 'Produtos',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'packaging',
        title: 'Embalgem',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'input-products',
        title: 'Entrada de Produtos',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'output-products',
        title: 'Saída de Produtos',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'type-product',
        title: 'Tipo de Produto',
        icon: <DescriptionIcon />,
      },
    ]
  },
  {
    segment: 'earring',
    title: 'Brinco',
    icon: <AgricultureIcon />,
    children: [
      {
        segment: 'earrings',
        title: 'Brincos',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'drop-earring',
        title: 'Baixa de Brinco',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'cocho',
    title: 'Cocho',
    icon: <AgricultureIcon />,
    children: [
      {
        segment: 'cochos',
        title: 'Cochos',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'inspection-cocho',
        title: 'Inspeção de Cocho',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'finance',
    title: 'Financeiro',
    icon: <AgricultureIcon />,
    children: [
      {
        segment: 'revenues',
        title: 'Receitas',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'expenses',
        title: 'Despesas',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'account-plan',
        title: 'Plano de Contas',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'application-phase',
    title: 'Fase de Aplicação',
    icon: <AgricultureIcon />,
  },
  {
    segment: 'supplier',
    title: 'Fornecedor',
    icon: <AgricultureIcon />,
  },
  {
    segment: 'weighings',
    title: 'Pesagens',
    icon: <AgricultureIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'users',
    title: 'Usuários',
    icon: <PeopleIcon />,
  },
  {
    segment: 'logout',
    title: 'Sair',
    icon: <ExitToAppIcon />,
  },
];

const screens: {
  [key: string]: {
    screen: () => React.JSX.Element;
  };
} = {
  users: {
    screen: () => <Users />
  },
};

const demoTheme = createTheme({
  palette: {
    primary: {
      main: '#031B17',  
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
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

export const Base: React.FC<BaseProps> = (props) => {
  const { window, children, openAlert, isSuccess, messageAlert, title, uploadFile, handleUpload } = props;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useDemoRouter('/users');
  
  if (!mounted) {
    return null; 
  }
  
  function DemoPageContent({ pathname }: { pathname: string }) {
    const validPathname = pathname.replace('/', '');

    return (
        <div className="px-10 py-5 overflow-auto flex flex-col justify-between w-full h-full z-[1] gap-3">
          <div className="flex-grow">
            { screens[validPathname]?.screen() }
          </div>
          <footer className="flex justify-center mt-12 w-full">
            <span className="text-copy text-center text-[14px]">© fazenda sao jose | 2025</span>
          </footer>
        </div>
    );
  }

  const demoWindow = window !== undefined ? window() : undefined;
    
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src="/assets/logo.png" alt="FAZENDA" />,
        title: 'FAZENDA SÃO JOSÉ',
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

