"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { destination, destinations, destinationsFormat } from "../service/api/destinations";
import DestinationAdapt from "../service/adapt/DestinationAdapt";
import DestinationsAdapt from "../service/adapt/DestinationsAdapt";
import { AccordionApplicationPhase } from "../components/AccordionApplicationPhase";

export default function Destination() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsDestination, setRowsDestination] = useState<DestinationInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [destinationSelected, setDestinationSelected] = useState<Model>(emptyOption);
    const [countDestinations, setCountDestinations] = useState(0);
    const [optionsDestinations, setOptionsDestinations] = useState<Model[]>([emptyOption]);

    const getDestination = async (id: string) => {
        const dataDestination = await destination(id);
        const destinationAdapt = new DestinationAdapt(dataDestination!);
        setRowsDestination([destinationAdapt.externalDestinationAdapt])
    }

    useEffect(() => {
        if (destinationSelected.value != "") {
            getDestination(destinationSelected.value);
        } else {
            setCurrentPage(1);
            getDestinations();
        }
    }, [destinationSelected]);

    const getDestinations = async () => {
        const dataDestinations = await destinations(currentPage ?? 1);
        if (dataDestinations?.status === 200) {
            const destinationsAdapt = new DestinationsAdapt(dataDestinations.data);
            const dataDestination = destinationsAdapt.externalDestinationsAdapt;
            setRowsDestination(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = dataDestination.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountDestinations(parseInt(dataDestination.count));
        }
        setIsLoading(false);    
    }

    const getDestinationsFormat = async () => {
        const dataDestinations: Model[] | undefined = await destinationsFormat();

        setOptionsDestinations(dataDestinations!);
    }

    useEffect(() => {
        setIsLoading(true);

        getDestinationsFormat();
        getDestinations();
    }, [currentPage]);

    return (
        <Base
            title="destino"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsDestinations || []}
                            className="w-4/5"
                            value={destinationSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setDestinationSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setDestinationSelected(emptyOption);
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
                        <Button 
                            className="bg-primary text-white font-semibold w-1/5 h-[56px]"
                            variant="contained"
                            type="button"
                            sx={{ bgcolor: 'var(--primary)', color: 'var(--foreground)' }}
                            href="/destination/register"
                            
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countDestinations > 0 ?
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsDestination.map((value, index) => (
                            <AccordionApplicationPhase key={index} id={value.id} fase_aplicacao={value.destino} link="destination" />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhum destino cadastrado.</p>
                    </div>
                }
                {countDestinations > rowsDestination.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais destinos</span>
                    </div>
                )}
            </div>
        </Base>
    );
}