"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import CochoAdapt from "../service/adapt/CochoAdapt";
import { cocho, cochos, cochosFormat } from "../service/api/cochos";
import CochosAdapt from "../service/adapt/CochosAdapt";
import { AccordionCocho } from "../components/AccordionCocho";

export default function Cocho() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsCocho, setRowsCocho] = useState<CochoInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cochoSelected, setCochoSelected] = useState<Model>(emptyOption);
    const [countCochos, setCountCochos] = useState(0);
    const [optionsCochos, setOptionsCochos] = useState<Model[]>([emptyOption]);

    const getCocho = async (id: string) => {
        const dataCocho = await cocho(id);
        const cochoAdapt = new CochoAdapt(dataCocho!);
        setRowsCocho([cochoAdapt.externalCochoAdapt])
    }

    useEffect(() => {
        if (cochoSelected.value != "") {
            getCocho(cochoSelected.value);
        } else {
            setCurrentPage(1);
            getCochos();
        }
    }, [cochoSelected]);

    const getCochos = async () => {
        const dataCochos = await cochos(currentPage ?? 1);
        if (dataCochos?.status === 200) {
            const cochosAdapt = new CochosAdapt(dataCochos.data);
            const dataCocho = cochosAdapt.externalCochosAdapt;
            setRowsCocho(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = dataCocho.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountCochos(parseInt(dataCocho.count));
        }
        setIsLoading(false);    
    }

    const getCochosFormat = async () => {
        const dataCochos: Model[] | undefined = await cochosFormat();

        setOptionsCochos(dataCochos!);
    }

    useEffect(() => {
        setIsLoading(true);

        getCochosFormat();
        getCochos();
    }, [currentPage]);

    return (
        <Base
            title="cocho"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsCochos || []}
                            className="w-4/5"
                            value={cochoSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setCochoSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setCochoSelected(emptyOption);
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
                            href="/cocho/register"
                            
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countCochos > 0 ? 
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsCocho.map((value, index) => (
                            <AccordionCocho key={index} id={value.id} cocho={value.cocho} fazenda={value.fazenda}  />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhum cocho cadastrado.</p>
                    </div>
                }
                {countCochos > rowsCocho.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais cochos</span>
                    </div>
                )}
            </div>
        </Base>
    );
}