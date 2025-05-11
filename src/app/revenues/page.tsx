"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { revenue, revenues, revenuesFormat } from "../service/api/revenues";
import RevenueAdapt from "../service/adapt/RevenueAdapt";
import RevenuesAdapt from "../service/adapt/RevenuesAdapt";
import { AccordionRevenue } from "../components/AccordionRevenue";

export default function Revenues() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsRevenue, setRowsRevenue] = useState<RevenueInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [revenueSelected, setRevenueSelected] = useState<Model>(emptyOption);
    const [countRevenues, setCountRevenues] = useState(0);
    const [optionsRevenues, setOptionsRevenues] = useState<Model[]>([emptyOption]);

    const getRevenues = async (id: string) => {
        const dataRevenue = await revenue(id);
        const revenueAdapt = new RevenueAdapt(dataRevenue!);
        setRowsRevenue([revenueAdapt.externalRevenueAdapt])
    }

    useEffect(() => {
        if (revenueSelected.value != "") {
            getRevenues(revenueSelected.value);
        } else {
            setCurrentPage(1);
            getRevenuess();
        }
    }, [revenueSelected]);

    const getRevenuess = async () => {
        const dataRevenues = await revenues(currentPage ?? 1);
        if (dataRevenues?.status === 200) {
            const revenuessAdapt = new RevenuesAdapt(dataRevenues.data);
            const revenuesData = revenuessAdapt.externalRevenuesAdapt;
            setRowsRevenue(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = revenuesData.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountRevenues(parseInt(revenuesData.count));
        }
        setIsLoading(false);    
    }

    const getRevenuessFormat = async () => {
        const dataRevenues: Model[] | undefined = await revenuesFormat();

        setOptionsRevenues(dataRevenues!);
    }

    useEffect(() => {
        setIsLoading(true);

        getRevenuessFormat();
        getRevenuess();
    }, [currentPage]);

    return (
        <Base
            title="Receitas"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsRevenues || []}
                            className="w-4/5"
                            value={revenueSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setRevenueSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setRevenueSelected(emptyOption);
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
                            href="/revenues/register"
                            
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countRevenues > 0 ? 
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsRevenue.map((value, index) => (
                            <AccordionRevenue key={index} id={value.id} data_vencimento={value.data_vencimento} data_pagamento={value.data_pagamento} data_registro={value.data_registro} conta={value.conta} id_pc={value.id_pc} descricao={value.descricao} fazenda={value.fazenda} grupo={value.grupo} nota_fiscal={value.nota_fiscal} numero_boleto={value.numero_boleto} valor_recebido={value.valor_recebido} valor_total={value.valor_total} />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhuma receita cadastrada.</p>
                    </div>
                }
                {countRevenues > rowsRevenue.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais receitas</span>
                    </div>
                )}
            </div>
        </Base>
    );
}