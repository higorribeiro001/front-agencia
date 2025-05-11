"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { AccordionApplicationPhase } from "../components/AccordionApplicationPhase";
import PackagingAdapt from "../service/adapt/PackagingAdapt";
import { packaging, packagings, packagingsFormat } from "../service/api/packagings";
import PackagingsAdapt from "../service/adapt/PackagingsAdapt";

export default function Packaging() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsPackaging, setRowsPackaging] = useState<PackagingInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [packagingSelected, setPackagingSelected] = useState<Model>(emptyOption);
    const [countPackaging, setCountPackaging] = useState(0);
    const [optionsPackaging, setOptionsPackaging] = useState<Model[]>([emptyOption]);

    const getPackaging = async (id: string) => {
        const dataPackaging = await packaging(id);
        const packagingAdapt = new PackagingAdapt(dataPackaging!);
        setRowsPackaging([packagingAdapt.externalPackagingAdapt])
    }

    useEffect(() => {
        if (packagingSelected.value != "") {
            getPackaging(packagingSelected.value);
        } else {
            setCurrentPage(1);
            getPackagings();
        }
    }, [packagingSelected]);

    const getPackagings = async () => {
        const dataPackagings = await packagings(currentPage ?? 1);
        if (dataPackagings?.status === 200) {
            const packagingAdapt = new PackagingsAdapt(dataPackagings.data);
            const packagingsData = packagingAdapt.externalPackagingsAdapt;
            setRowsPackaging(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = packagingsData.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountPackaging(parseInt(packagingsData.count));
        }
        setIsLoading(false);    
    }

    const getPackagingsFormat = async () => {
        const dataPackagings: Model[] | undefined = await packagingsFormat();

        setOptionsPackaging(dataPackagings!);
    }

    useEffect(() => {
        setIsLoading(true);

        getPackagingsFormat();
        getPackagings();
    }, [currentPage]);

    return (
        <Base
            title="Embalagem"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsPackaging || []}
                            className="w-4/5"
                            value={packagingSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setPackagingSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setPackagingSelected(emptyOption);
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
                            sx={{ bgcolor: 'var(--primary)', color: '#FFFFFF' }}
                            href="/packaging/register"
                            
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countPackaging > 0 ?
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsPackaging.map((value, index) => (
                            <AccordionApplicationPhase key={index} id={value.id} fase_aplicacao={value.un} link="packaging" />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhuma embalagem cadastrada.</p>
                    </div>
                }
                {countPackaging > rowsPackaging.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais embalagens</span>
                    </div>
                )}
            </div>
        </Base>
    );
}