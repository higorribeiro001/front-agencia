"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { farm, farms, farmsFormat } from "../service/api/farms";
import FarmsAdapt from "../service/adapt/FarmsAdapt";
import FarmAdapt from "../service/adapt/FarmAdapt";
import ReplayIcon from '@mui/icons-material/Replay';
import { AccordionFarm } from "../components/AccordionFarm";
import { Loading } from "../components/Loading";

export default function Farm() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsFarm, setRowsFarm] = useState<FarmInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [farmSelected, setFarmSelected] = useState<Model>(emptyOption);
    const [countFarms, setCountFarms] = useState(0);
    const [optionsFarms, setOptionsFarms] = useState<Model[]>([emptyOption]);

    const getFarm = async (id: string) => {
        const dataFarm = await farm(id);
        const farmAdapt = new FarmAdapt(dataFarm!);
        setRowsFarm([farmAdapt.externalFarmAdapt])
    }

    useEffect(() => {
        if (farmSelected.value != "") {
            getFarm(farmSelected.value);
        } else {
            setCurrentPage(1);
            getFarms();
        }
    }, [farmSelected]);

    const getFarms = async () => {
        const dataFarms = await farms(currentPage ?? 1);
        if (dataFarms?.status === 200) {
            const farmssAdapt = new FarmsAdapt(dataFarms.data);
            const dataFarm = farmssAdapt.externalFarmsAdapt;
            setRowsFarm(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = dataFarm.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountFarms(parseInt(dataFarm.count));
        }
        setIsLoading(false);    
    }

    const getFarmsFormat = async () => {
        const dataFarms: Model[] | undefined = await farmsFormat();

        setOptionsFarms(dataFarms!);
    }

    useEffect(() => {
        setIsLoading(true);

        getFarmsFormat();
        getFarms();
    }, [currentPage]);

    return (
        <Base
            title="fazenda"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsFarms || []}
                            className="w-4/5"
                            value={farmSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setFarmSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setFarmSelected(emptyOption);
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
                            href="/farm/register"
                            
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countFarms > 0 ?
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsFarm.map((value, index) => (
                            <AccordionFarm key={index} id={value.id} fazenda={value.fazenda} area_ha={value.area_ha} qtd_animais={value.qtd_animais}  />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhuma fazenda cadastrada.</p>
                    </div>
                }
                {countFarms > rowsFarm.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais fazendas</span>
                    </div>
                )}
            </div>
        </Base>
    );
}