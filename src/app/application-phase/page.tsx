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
import ApplicationPhaseAdapt from "../service/adapt/ApplicationPhaseAdapt";
import { applicationPhase, applicationPhases, applicationPhasesFormat } from "../service/api/applicationPhase";
import ApplicationPhasesAdapt from "../service/adapt/ApplicationPhasesAdapt";
import { AccordionApplicationPhase } from "../components/AccordionApplicationPhase";

export default function ApplicationPhase() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsApplicationPhase, setRowsApplicationPhase] = useState<ApplicationPhaseInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [applicationPhaseSelected, setApplicationPhaseSelected] = useState<Model>(emptyOption);
    const [countApplicationPhase, setCountApplicationPhase] = useState(0);
    const [optionsApplicationPhase, setOptionsApplicationPhase] = useState<Model[]>([emptyOption]);

    const getApplicationPhase = async (id: string) => {
        const dataApplicationPhase = await applicationPhase(id);
        const applicationPhaseAdapt = new ApplicationPhaseAdapt(dataApplicationPhase!);
        setRowsApplicationPhase([applicationPhaseAdapt.externalApplicationPhaseAdapt])
    }

    useEffect(() => {
        if (applicationPhaseSelected.value != "") {
            getApplicationPhase(applicationPhaseSelected.value);
        } else {
            setCurrentPage(1);
            getApplicationPhases();
        }
    }, [applicationPhaseSelected]);

    const getApplicationPhases = async () => {
        const dataApplicationPhases = await applicationPhases(currentPage ?? 1);
        if (dataApplicationPhases?.status === 200) {
            const applicationPhasesAdapt = new ApplicationPhasesAdapt(dataApplicationPhases.data);
            const dataApplicationPhase = applicationPhasesAdapt.externalApplicationPhasesAdapt;
            setRowsApplicationPhase(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = dataApplicationPhase.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountApplicationPhase(parseInt(dataApplicationPhase.count));
        }
        setIsLoading(false);    
    }

    const getApplicationPhasesFormat = async () => {
        const dataApplicationPhases: Model[] | undefined = await applicationPhasesFormat();

        setOptionsApplicationPhase(dataApplicationPhases!);
    }

    useEffect(() => {
        setIsLoading(true);

        getApplicationPhasesFormat();
        getApplicationPhases();
    }, [currentPage]);

    return (
        <Base
            openAlert={openAlert}
            isSuccess={isSuccess}
            messageAlert={messageAlert}
            title="fase de aplicação"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsApplicationPhase || []}
                            className="w-4/5"
                            value={applicationPhaseSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setApplicationPhaseSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setApplicationPhaseSelected(emptyOption);
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
                            href="/application-phase/register"
                            style={{background: "#031B17", color: "#FFFFFF"}}
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countApplicationPhase > 0 ?
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsApplicationPhase.map((value, index) => (
                            <AccordionApplicationPhase key={index} id={value.id} fase_aplicacao={value.fase_aplicacao} link="application-phase" />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhuma fase de aplicação cadastrada.</p>
                    </div>
                }
                {countApplicationPhase > rowsApplicationPhase.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais fases</span>
                    </div>
                )}
            </div>
        </Base>
    );
}