"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { inputProduct, inputProducts, inputProductsFormat } from "../service/api/inputProducts";
import InputProductAdapt from "../service/adapt/InputProductAdapt";
import InputProductsAdapt from "../service/adapt/InputProductsAdapt";
import { AccordionInputProduct } from "../components/AccordionInputProduct";

export default function InputProducts() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsInputProduct, setRowsInputProduct] = useState<InputProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputProductSelected, setInputProductSelected] = useState<Model>(emptyOption);
    const [countInputProducts, setCountInputProducts] = useState(0);
    const [optionsInputProduct, setOptionsInputProducts] = useState<Model[]>([emptyOption]);

    const getInputProduct = async (id: string) => {
        const dataInputProduct = await inputProduct(id);
        const inputProductAdapt = new InputProductAdapt(dataInputProduct!);
        setRowsInputProduct([inputProductAdapt.externalInputProductAdapt])
    }

    useEffect(() => {
        if (inputProductSelected.value != "") {
            getInputProduct(inputProductSelected.value);
        } else {
            setCurrentPage(1);
            getInputProducts();
        }
    }, [inputProductSelected]);

    const getInputProducts = async () => {
        const dataInputProducts = await inputProducts(currentPage ?? 1);
        if (dataInputProducts?.status === 200) {
            const inputProductsAdapt = new InputProductsAdapt(dataInputProducts.data);
            const dataInputProduct = inputProductsAdapt.externalInputProductsAdapt;
            setRowsInputProduct(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = dataInputProduct.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountInputProducts(parseInt(dataInputProduct.count));
        }
        setIsLoading(false);    
    }

    const getInputProductsFormat = async () => {
        const dataInputProducts: Model[] | undefined = await inputProductsFormat();

        setOptionsInputProducts(dataInputProducts!);
    }

    useEffect(() => {
        setIsLoading(true);

        getInputProductsFormat();
        getInputProducts();
    }, [currentPage]);

    return (
        <Base
            title="entrada de produto"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsInputProduct || []}
                            className="w-4/5"
                            value={inputProductSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setInputProductSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setInputProductSelected(emptyOption);
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
                            href="/input-product/register"
                            
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countInputProducts > 0 ? 
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsInputProduct.map((value, index) => (
                            <AccordionInputProduct key={index} id={value.id} fornecedor={value.fornecedor} n_nf={value.n_nf} produto={value.produto} lote={value.lote} un={value.un} qtd={value.qtd} total={value.total} valor_unitario={value.valor_unitario} data_vencimento={value.data_vencimento} />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhuma entrada de produto cadastrado.</p>
                    </div>
                }
                {countInputProducts > rowsInputProduct.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais entradas de produtos</span>
                    </div>
                )}
            </div>
        </Base>
    );
}