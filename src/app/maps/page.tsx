"use client"

export const dynamic = "force-dynamic"; 

import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, IconButton, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { trip, trips } from '../service/api/trip';
import TripsAdapt from '../service/adapt/TripsAdapt';
import TripAdapt from '../service/adapt/TripAdapt';
import { useSearchParams } from 'next/navigation';

export default function Maps() {
    const searchParams = useSearchParams();

    const latParam = searchParams.get('lat') ?? '-0.5947849';
    const lngParam = searchParams.get('lng') ?? '-47.3178818';

    const [optionsTrip, setOptionsTrip] = useState<Model[]>([]);
    const [selectedTrip, setSelectedTrip] = useState<Model | null>(null);
    const [lat, setLat] = useState<number>(parseFloat(latParam));
    const [lng, setLng] = useState<number>(parseFloat(lngParam));
    const mapRef = useRef<L.Map | null>(null);
    const zoom = 14;

    const convertDate = (isoDate: string) => {
        isoDate = isoDate.split('T')[0];
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    const initMap = (tripData: Trip[]) => {
        if (mapRef.current) return;
        const map = L.map('map').setView([lat, lng], zoom);
        mapRef.current = map;

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        for (const trip of tripData) {
            if (!trip.latitude || !trip.longitude) continue;
            
            const customIcon = generateMarker(trip);

            L.marker([trip.latitude, trip.longitude], { icon: customIcon }).addTo(map);
        }
    }

    const getTrips = async () => {
        const response = await trips();
        const tripAdapt = new TripsAdapt(response?.data ?? []);
    
        const tripData = tripAdapt.externalTripsAdapt;

        const listTrip = tripData.map(t => ({
            label: t.titulo,
            value: String(t.id),
            name: '',
            error: '',
        }));

        setOptionsTrip(listTrip);

        initMap(tripData);
    }
    
    const generateMarker = ({ id, titulo, descricao, valor, avaliacao, data, vagas, FotoViagems }: Trip) => {
        const starsHtml = Array.from({ length: avaliacao }, () => '⭐').join('');
        const photoUrl = FotoViagems?.[0]?.url ?? '';

        return L.divIcon({
            html: `
                <div class="bg-white rounded-lg shadow-md h-full hover:scale-110 transition-transform duration-500">
                    <div class="card-marker-content">
                        <img 
                        style="width: 300px; height: 150px; object-fit: cover; border-radius: 4px 4px 0 0;" 
                        src="${photoUrl}" 
                        alt="Local"
                        />
                        <div class="p-1">
                        <div class="flex flex-col gap-1 p-1">
                                <h3 class="text-primary text-[16px] font-bold w-[284px] truncate">${titulo}</h3>
                                <p class="text-primary text-[12px] text-justify font-normal h-[54px] line-clamp-3">${descricao}</p>
                                <span>${starsHtml}</span>
                                <div class="flex flex-row!important gap-1 justify-between mt-1">
                                    <div class="bg-green-300 shadow-md rounded p-1 text-green-700 text-center font-semibold w-1/2">
                                    ${convertDate(data)}
                                    </div>
                                    <div class="bg-green-300 shadow-md rounded p-1 text-green-700 text-center font-semibold w-1/2">
                                    ${vagas} vagas
                                    </div>
                                    </div>
                                <span class="my-2 text-[22px] text-black">R$ ${String(valor).replace('.', ',')}</span>
                                <button class="rounded border-[0.5px] border-primary border-solid bg-white text-primary font-medium p-2 hover:bg-primary hover:text-white transition-all duration-500" data-id="${id}">
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
    }
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            getTrips();
        }
    }, []);

    useEffect(() => {
        if (selectedTrip) {
            trip(selectedTrip.value).then((response) => {
                const tripAdapt = new TripAdapt(response!);
                const tripData = tripAdapt.externalTripAdapt;

                setLat(tripData.latitude); 
                setLng(tripData.longitude);

                if (mapRef.current) {
                    mapRef.current.flyTo([tripData.latitude, tripData.longitude], zoom);
                }
            });
        }
    }, [selectedTrip]);

    return (
        <div>
            <div className="flex justify-center w-[80%] absolute z-50 p-3 mx-8 px-14">
                <Autocomplete
                    disablePortal
                    options={optionsTrip}
                    className="w-full"
                    value={selectedTrip}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setSelectedTrip(newValue); 
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
            <div id="map" className="w-full h-screen z-40" />
        </div>
    )
}