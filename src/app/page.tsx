'use client';

import React, { useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaArrowLeft } from 'react-icons/fa'

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
  useEffect(() => {
    var map = L.map('map').setView([-0.5947849, -47.3178818], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const customIcon = L.divIcon({
      html: `
        <div class="bg-white rounded-lg shadow-md h-full">
          <div class="card-marker-content">
            <img 
              style="width: 250px; height: 150px; object-fit: cover; border-radius: 4px 4px 0 0;" 
              src="https://agencia-api-rest.onrender.com/images/1751835542930_10746.jpg" 
              alt="Local"
            />
            <div class="p-1">
              <div class="flex flex-row justify-between items-center p-1">
                <button class="text-primary text-[16px] font-semibold">&lt;</button>
                <span class="text-black rounded px-2">1/1</span>
                <button class="text-primary text-[16px] font-semibold">&gt;</button>
              </div>
              <div class="flex flex-col gap-1] p-1">
                <h3 class="text-primary text-[16px] font-bold">Salinópolis</h3>
                <p class="text-primary text-[12px] text-justify font-normal">Viagem para a praia de Salinas, hospedagem em hotel 5 estrelas (Hotel Concha do Mar), com direito a 2 cafés da manhã.</p>
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>
        </div>
      `,
      className: 'custom-html-marker',
      iconSize: [250, 350]
    });

    L.marker([-0.5947849, -47.3178818], { icon: customIcon }).addTo(map);
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
    >
      <DashboardLayout>
        <div id="map" className='w-full h-full' />
      </DashboardLayout>
    </AppProvider>
  );
}
