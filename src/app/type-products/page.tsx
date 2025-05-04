"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { AccordionApplicationPhase } from "../components/AccordionApplicationPhase";
import { typeProduct, typeProducts, typeProductsFormat } from "../service/api/typeProducts";
import TypeProductAdapt from "../service/adapt/TypeProductAdapt";
import TypeProductsAdapt from "../service/adapt/TypeProductsAdapt";

export default function TypeProducts() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsTypeProducts, setRowsTypeProducts] = useState<TypeProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [typeProductsSelected, setTypeProducts] = useState<Model>(emptyOption);
    const [countTypeProduct, setCountTypeProduct] = useState(0);
    const [optionsTypeProduct, setOptionsTypeProduct] = useState<Model[]>([emptyOption]);

    const TypeProduct = async (id: string) => {
        const dataTypeProduct = await typeProduct(id);
        const typeProductAdapt = new TypeProductAdapt(dataTypeProduct!);
        setRowsTypeProducts([typeProductAdapt.externalTypeProductAdapt])
    }

    useEffect(() => {
        if (typeProductsSelected.value != "") {
            TypeProduct(typeProductsSelected.value);
        } else {
            setCurrentPage(1);
            TypeProducts();
        }
    }, [typeProductsSelected]);

    const TypeProducts = async () => {
        const dataTypeProducts = await typeProducts(currentPage ?? 1);
        if (dataTypeProducts?.status === 200) {
            const typeProductAdapt = new TypeProductsAdapt(dataTypeProducts.data);
            const typeProductsData = typeProductAdapt.externalTypeProductsAdapt;
            setRowsTypeProducts(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = typeProductsData.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountTypeProduct(parseInt(typeProductsData.count));
        }
        setIsLoading(false);    
    }

    const TypeProductsFormat = async () => {
        const dataTypeProduct: Model[] | undefined = await typeProductsFormat();

        setOptionsTypeProduct(dataTypeProduct!);
    }

    useEffect(() => {
        setIsLoading(true);

        TypeProductsFormat();
        TypeProducts();
    }, [currentPage]);

    return (
        <Base
            openAlert={openAlert}
            isSuccess={isSuccess}
            messageAlert={messageAlert}
            title="Tipo de Produtos"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsTypeProduct || []}
                            className="w-4/5"
                            value={typeProductsSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setTypeProducts(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setTypeProducts(emptyOption);
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
                            href="/type-products/register"
                            style={{background: "#031B17", color: "#FFFFFF"}}
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countTypeProduct > 0 ?
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsTypeProducts.map((value, index) => (
                            <AccordionApplicationPhase key={index} id={value.id} fase_aplicacao={value.tipo} link="type-products" />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhum tipo de produto cadastrado.</p>
                    </div>
                }
                {countTypeProduct > rowsTypeProducts.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais embalagens</span>
                    </div>
                )}
            </div>
        </Base>
    );
}