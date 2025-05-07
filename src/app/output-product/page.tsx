"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { outputProduct, outputProducts, outputProductsFormat } from "../service/api/outputProducts";
import OutputProductAdapt from "../service/adapt/OutputProductAdapt";
import OutputProductsAdapt from "../service/adapt/OutputProductsAdapt";
import { AccordionOutputProduct } from "../components/AccordionOutputProduct";

export default function OutputProducts() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsOutputProduct, setRowsOutputProduct] = useState<OutputProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [outputProductSelected, setOutputProductSelected] = useState<Model>(emptyOption);
    const [countOutputProducts, setCountOutputProducts] = useState(0);
    const [optionsOutputProduct, setOptionsOutputProducts] = useState<Model[]>([emptyOption]);

    const getOutputProduct = async (id: string) => {
        const dataOutputProduct = await outputProduct(id);
        const outputProductAdapt = new OutputProductAdapt(dataOutputProduct!);
        setRowsOutputProduct([outputProductAdapt.externalOutputProductAdapt])
    }

    useEffect(() => {
        if (outputProductSelected.value != "") {
            getOutputProduct(outputProductSelected.value);
        } else {
            setCurrentPage(1);
            getOutputProducts();
        }
    }, [outputProductSelected]);

    const getOutputProducts = async () => {
        const dataOutputProducts = await outputProducts(currentPage ?? 1);
        if (dataOutputProducts?.status === 200) {
            const outputProductsAdapt = new OutputProductsAdapt(dataOutputProducts.data);
            const dataOutputProduct = outputProductsAdapt.externalOutputProductsAdapt;
            setRowsOutputProduct(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = dataOutputProduct.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountOutputProducts(parseInt(dataOutputProduct.count));
        }
        setIsLoading(false);    
    }

    const getOutputProductsFormat = async () => {
        const dataOutputProducts: Model[] | undefined = await outputProductsFormat();

        setOptionsOutputProducts(dataOutputProducts!);
    }

    useEffect(() => {
        setIsLoading(true);

        getOutputProductsFormat();
        getOutputProducts();
    }, [currentPage]);

    return (
        <Base
            openAlert={openAlert}
            isSuccess={isSuccess}
            messageAlert={messageAlert}
            title="saída de produto"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsOutputProduct || []}
                            className="w-4/5"
                            value={outputProductSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setOutputProductSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setOutputProductSelected(emptyOption);
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
                            href="/output-product/register"
                            style={{background: "#031B17", color: "#FFFFFF"}}
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countOutputProducts > 0 ? 
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsOutputProduct.map((value, index) => (
                            <AccordionOutputProduct key={index} id={value.id} data_movimentacao={value.data_movimentacao} fazenda={value.fazenda} produto={value.produto} fase_aplicacao={value.fase_aplicacao} hectares={value.hectares} lote={value.lote} total_aplicacao={value.total_aplicacao} />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhuma saída de produto cadastrado.</p>
                    </div>
                }
                {countOutputProducts > rowsOutputProduct.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais saídas de produtos</span>
                    </div>
                )}
            </div>
        </Base>
    );
}