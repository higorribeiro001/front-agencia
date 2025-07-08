'use client';

import React, { useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Autocomplete, IconButton, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

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
    const map = L.map('map').setView([-0.5947849, -47.3178818], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const customIcon = L.divIcon({
      html: `
        <div class="bg-white rounded-lg shadow-md h-full hover:scale-110 transition-transform duration-500">
          <div class="card-marker-content">
            <img 
              style="width: 300px; height: 150px; object-fit: cover; border-radius: 4px 4px 0 0;" 
              src="https://agencia-api-rest.onrender.com/images/1751835542930_10746.jpg" 
              alt="Local"
            />
            <div class="p-1">
              <div class="flex flex-row justify-between items-center p-1">
                <button class="text-primary text-[16px] font-semibold">&lt;</button>
                <span class="text-black rounded px-2">1/1</span>
                <button class="text-primary text-[16px] font-semibold">&gt;</button>
              </div>
              <div class="flex flex-col gap-1 p-1">
                <h3 class="text-primary text-[16px] font-bold w-[284px] truncate">Salinópolis</h3>
                <p class="text-primary text-[12px] text-justify font-normal h-[54px] line-clamp-3">Viagem para a praia de Salinas, hospedagem em hotel 5 estrelas (Hotel Concha do Mar), com direito a 2 cafés da manhã.</p>
                <span>⭐⭐⭐⭐⭐</span>
                <div class="flex flex-row!important gap-1 justify-between mt-1">
                  <div class="bg-green-300 shadow-md rounded p-1 text-green-700 text-center font-semibold w-1/2">
                    01/08/2025
                  </div>
                  <div class="bg-green-300 shadow-md rounded p-1 text-green-700 text-center font-semibold w-1/2">
                    50 vagas
                  </div>
                </div>
                <span class="my-2 text-[22px] text-black">R$ 600,00</span>
                <button class="rounded border-[0.5px] border-primary border-solid bg-white text-primary font-medium p-2 hover:bg-primary hover:text-white transition-all duration-500">
                  SABER MAIS
                </button>
              </div>
            </div>
          </div>
        </div>
      `,
      className: 'custom-html-marker',
      iconSize: [300, 430]
    });

    L.marker([-0.5947849, -47.3178818], { icon: customIcon }).addTo(map);
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
    >
      <DashboardLayout>
        <div className="flex justify-center w-[80%] absolute z-50 p-3 mx-8 px-14">
          <Autocomplete
            disablePortal
            options={[]}
            className="w-full"
            value={{label: '', value: ''}}
            onChange={(event, newValue) => {
                if (newValue) {
                }
            }}
            onInputChange={(event, inputValue, reason) => {
                if (reason === 'clear' || inputValue === '') {
                }
            }}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
            getOptionLabel={(option) => option?.label || ''}
            renderInput={(params) => (
                <TextField
                {...params}
                placeholder="pesquise..."
                sx={{
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'var(--black2)' },
                    '&:hover fieldset': { borderColor: 'var(--black2)' },
                    '&.Mui-focused fieldset': { borderColor: 'var(--black2)' },
                    },
                    '& .MuiOutlinedInput-input': {
                    color: 'var(--black2)',
                    '&::placeholder': {
                        color: 'var(--black2)',
                        opacity: 1,
                    },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'var(--black2)',
                      '&.Mui-focused': {
                          color: 'var(--black2)',
                      },
                    },
                }}
                InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                    <InputAdornment position="start">
                        <IconButton>
                            <Search className="text-black2" />
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                />
              )}
          />
        </div>
        <div id="map" className='w-full h-full z-40' />
      </DashboardLayout>
    </AppProvider>
  );
}
