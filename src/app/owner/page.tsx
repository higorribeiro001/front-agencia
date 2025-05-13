"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { owner, owners, ownersFormat } from "../service/api/owners";
import OwnerAdapt from "../service/adapt/OwnerAdapt";
import OwnersAdapt from "../service/adapt/OwnersAdapt";
import { AccordionOwner } from "../components/AccordionOwner";

export default function Owner() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsOwner, setRowsOwner] = useState<OwnerInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ownerSelected, setOwnerSelected] = useState<Model>(emptyOption);
    const [countOwners, setCountOwners] = useState(0);
    const [optionsowners, setOptionsOwners] = useState<Model[]>([emptyOption]);

    const getOwner = async (id: string) => {
        const dataOwner = await owner(id);
        const ownerAdapt = new OwnerAdapt(dataOwner!);
        setRowsOwner([ownerAdapt.externalOwnerAdapt])
    }

    useEffect(() => {
        if (ownerSelected.value != "") {
            getOwner(ownerSelected.value);
        } else {
            setCurrentPage(1);
            getOwners();
        }
    }, [ownerSelected]);

    const getOwners = async () => {
        const dataOwners = await owners(currentPage ?? 1);
        if (dataOwners?.status === 200) {
            const ownerssAdapt = new OwnersAdapt(dataOwners.data);
            const dataOwner = ownerssAdapt.externalOwnersAdapt;
            setRowsOwner(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = dataOwner.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountOwners(parseInt(dataOwner.count));
        }
        setIsLoading(false);    
    }

    const getOwnersFormat = async () => {
        const dataOwners: Model[] | undefined = await ownersFormat();

        setOptionsOwners(dataOwners!);
    }

    useEffect(() => {
        setIsLoading(true);

        getOwnersFormat();
        getOwners();
    }, [currentPage]);

    return (
        <Base
            title="Proprietário"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsowners || []}
                            className="w-4/5"
                            value={ownerSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setOwnerSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setOwnerSelected(emptyOption);
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
                            href="/owner/register"
                            
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countOwners > 0 ?
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsOwner.map((value, index) => (
                            <AccordionOwner key={index} id={value.id} proprietario={value.proprietario} />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhuma proprietário cadastrada.</p>
                    </div>
                }
                {countOwners > rowsOwner.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais proprietários</span>
                    </div>
                )}
            </div>
        </Base>
    );
}