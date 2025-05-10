"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { AccordionApplicationPhase } from "../components/AccordionApplicationPhase";
import { supplier, suppliers, suppliersFormat } from "../service/api/suppliers";
import SupplierAdapt from "../service/adapt/SupplierAdapt";
import SuppliersAdapt from "../service/adapt/SuppliersAdapt";

export default function Supplier() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsSupplier, setRowsSupplier] = useState<SupplierInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [supplierSelected, setSupplierSelected] = useState<Model>(emptyOption);
    const [countSupplier, setCountSupplier] = useState(0);
    const [optionsSupplier, setOptionsSupplier] = useState<Model[]>([emptyOption]);

    const getSupplier = async (id: string) => {
        const dataSupplier = await supplier(id);
        const supplierAdapt = new SupplierAdapt(dataSupplier!);
        setRowsSupplier([supplierAdapt.externalSupplierAdapt])
    }

    useEffect(() => {
        if (supplierSelected.value != "") {
            getSupplier(supplierSelected.value);
        } else {
            setCurrentPage(1);
            getSuppliers();
        }
    }, [supplierSelected]);

    const getSuppliers = async () => {
        const dataSuppliers = await suppliers(currentPage ?? 1);
        if (dataSuppliers?.status === 200) {
            const suppliersAdapt = new SuppliersAdapt(dataSuppliers.data);
            const suppliersData = suppliersAdapt.externalSuppliersAdapt;
            setRowsSupplier(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = suppliersData.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountSupplier(parseInt(suppliersData.count));
        }
        setIsLoading(false);    
    }

    const getSuppliersFormat = async () => {
        const dataSuppliers: Model[] | undefined = await suppliersFormat();

        setOptionsSupplier(dataSuppliers!);
    }

    useEffect(() => {
        setIsLoading(true);

        getSuppliersFormat();
        getSuppliers();
    }, [currentPage]);

    return (
        <Base
            title="Fornecedor"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsSupplier || []}
                            className="w-4/5"
                            value={supplierSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setSupplierSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setSupplierSelected(emptyOption);
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
                            href="/supplier/register"
                            style={{background: "#031B17", color: "#FFFFFF"}}
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countSupplier > 0 ?
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsSupplier.map((value, index) => (
                            <AccordionApplicationPhase key={index} id={value.id} fase_aplicacao={value.fornecedor} link="supplier" />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhum fornecedor de aplicação cadastrada.</p>
                    </div>
                }
                {countSupplier > rowsSupplier.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais fornecedores</span>
                    </div>
                )}
            </div>
        </Base>
    );
}