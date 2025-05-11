"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { earringDrop, earringDrops, earringDropsFormat } from "../service/api/earringDrop";
import EarringDropsAdapt from "../service/adapt/EarringDropsAdapt";
import EarringDropAdapt from "../service/adapt/EarringDropAdapt";
import { AccordionEarringDrop } from "../components/AccordionEarringDrop";

export default function Earrings() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsEarring, setRowsEarring] = useState<EarringDropInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [earringSelected, setEarringSelected] = useState<Model>(emptyOption);
    const [countEarrings, setCountEarrings] = useState(0);
    const [optionsEarring, setOptionsEarrings] = useState<Model[]>([emptyOption]);

    const getEarring = async (id: string) => {
        const dataEarring = await earringDrop(id);
        const earringAdapt = new EarringDropAdapt(dataEarring!);
        setRowsEarring([earringAdapt.externalEarringDropAdapt])
    }

    useEffect(() => {
        if (earringSelected.value != "") {
            getEarring(earringSelected.value);
        } else {
            setCurrentPage(1);
            getEarrings();
        }
    }, [earringSelected]);

    const getEarrings = async () => {
        const dataEarrings = await earringDrops(currentPage ?? 1);
        if (dataEarrings?.status === 200) {
            const earringsAdapt = new EarringDropsAdapt(dataEarrings.data);
            const dataEarring = earringsAdapt.externalEarringDropsAdapt;
            setRowsEarring(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = dataEarring.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountEarrings(parseInt(dataEarring.count));
        }
        setIsLoading(false);    
    }

    const getEarringsFormat = async () => {
        const dataEearrings: Model[] | undefined = await earringDropsFormat();

        setOptionsEarrings(dataEearrings!);
    }

    useEffect(() => {
        setIsLoading(true);

        getEarringsFormat();
        getEarrings();
    }, [currentPage]);

    return (
        <Base
            title="baixa de brinco"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsEarring || []}
                            className="w-4/5"
                            value={earringSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setEarringSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setEarringSelected(emptyOption);
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
                            href="/earring-drop/register"
                            
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countEarrings > 0 ? 
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsEarring.map((value, index) => (
                            <AccordionEarringDrop key={index} id={value.id} brinco={value.brinco} fazenda={value.fazenda} proprietario={value.proprietario} lote={value.lote} data={value.data} motivo_baixa={value.motivo_baixa} descricao={value.descricao} valor_entrada={value.valor_entrada} kg_saida={value.kg_saida} valor_saida={value.valor_saida} />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhuma baixa de brinco cadastrado.</p>
                    </div>
                }
                {countEarrings > rowsEarring.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais baixas de brincos</span>
                    </div>
                )}
            </div>
        </Base>
    );
}