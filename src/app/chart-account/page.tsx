"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { chartAccount, chartAccounts, chartAccountsFormat } from "../service/api/chartAccount";
import ChartAccountAdapt from "../service/adapt/ChartAccountAdapt";
import ChartAccountsAdapt from "../service/adapt/ChartAccountsAdapt";
import { AccordionChartAccount } from "../components/AccordionChartAccount";

export default function ChartAccount() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsChartAccount, setRowsChartAccount] = useState<ChartAccountInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [chartAccountSelected, setChartAccountSelected] = useState<Model>(emptyOption);
    const [countChartAccounts, setCountChartAccounts] = useState(0);
    const [optionsChartAccounts, setOptionsChartAccounts] = useState<Model[]>([emptyOption]);

    const getChartAccount = async (id: string) => {
        const dataChartAccount = await chartAccount(id);
        const chartAccountAdapt = new ChartAccountAdapt(dataChartAccount!);
        setRowsChartAccount([chartAccountAdapt.externalChartAccountAdapt])
    }

    useEffect(() => {
        if (chartAccountSelected.value != "") {
            getChartAccount(chartAccountSelected.value);
        } else {
            setCurrentPage(1);
            getChartAccounts();
        }
    }, [chartAccountSelected]);

    const getChartAccounts = async () => {
        const dataChartAccounts = await chartAccounts(currentPage ?? 1);
        if (dataChartAccounts?.status === 200) {
            const chartAccountsAdapt = new ChartAccountsAdapt(dataChartAccounts.data);
            const dataChartAccount = chartAccountsAdapt.externalChartAccountsAdapt;
            setRowsChartAccount(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = dataChartAccount.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountChartAccounts(parseInt(dataChartAccount.count));
        }
        setIsLoading(false);    
    }

    const getChartAccountsFormat = async () => {
        const dataChartAccounts: Model[] | undefined = await chartAccountsFormat('');

        setOptionsChartAccounts(dataChartAccounts!);
    }

    useEffect(() => {
        setIsLoading(true);

        getChartAccountsFormat();
        getChartAccounts();
    }, [currentPage]);

    return (
        <Base
            title="Plano de Contas"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsChartAccounts || []}
                            className="w-4/5"
                            value={chartAccountSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setChartAccountSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setChartAccountSelected(emptyOption);
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
                            href="/chart-account/register"
                            
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countChartAccounts > 0 ?
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsChartAccount.map((value, index) => (
                            <AccordionChartAccount key={index} id={value.id} id_contas={value.id_contas} tipo={value.tipo} grupo={value.grupo} descricao={value.descricao}  />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhum plano de contas cadastrado.</p>
                    </div>
                }
                {countChartAccounts > rowsChartAccount.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais planos de contas</span>
                    </div>
                )}
            </div>
        </Base>
    );
}