"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { weighing, weighings, weighingsFormat } from "../service/api/weighings";
import WeighingAdapt from "../service/adapt/WeighingAdapt";
import WeighingsAdapt from "../service/adapt/WeighingsAdapt";
import { AccordionWeighing } from "../components/AccordionWeighing";

export default function Weighings() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsWeighing, setRowsWeighing] = useState<WeighingInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [weighingSelected, setWeighingSelected] = useState<Model>(emptyOption);
    const [countWeighings, setCountWeighings] = useState(0);
    const [optionsWeighing, setOptionsWeighings] = useState<Model[]>([emptyOption]);

    const getWeighing = async (id: string) => {
        const dataWeighing = await weighing(id);
        const weighingAdapt = new WeighingAdapt(dataWeighing!);
        setRowsWeighing([weighingAdapt.externalWeighingAdapt])
    }

    useEffect(() => {
        if (weighingSelected.value != "") {
            getWeighing(weighingSelected.value);
        } else {
            setCurrentPage(1);
            getWeighings();
        }
    }, [weighingSelected]);

    const getWeighings = async () => {
        const dataWeighings = await weighings(currentPage ?? 1);
        if (dataWeighings?.status === 200) {
            const weighingsAdapt = new WeighingsAdapt(dataWeighings.data);
            const dataWeighing = weighingsAdapt.externalWeighingsAdapt;
            setRowsWeighing(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = dataWeighing.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountWeighings(parseInt(dataWeighing.count));
        }
        setIsLoading(false);    
    }

    const getWeighingsFormat = async () => {
        const dataWeighings: Model[] | undefined = await weighingsFormat();

        setOptionsWeighings(dataWeighings!);
    }

    useEffect(() => {
        setIsLoading(true);

        getWeighingsFormat();
        getWeighings();
    }, [currentPage]);

    return (
        <Base
            title="pesagem"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsWeighing || []}
                            className="w-4/5"
                            value={weighingSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setWeighingSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setWeighingSelected(emptyOption);
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
                            href="/weighings/register"
                            
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countWeighings > 0 ? 
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsWeighing.map((value, index) => (
                            <AccordionWeighing key={index} id={value.id} data_pesagem={value.data_pesagem} fazenda={value.fazenda} total_kg={value.total_kg} qtd_bois={value.qtd_bois} valor={value.valor} />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhuma pesagem cadastrada.</p>
                    </div>
                }
                {countWeighings > rowsWeighing.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais pesagens</span>
                    </div>
                )}
            </div>
        </Base>
    );
}