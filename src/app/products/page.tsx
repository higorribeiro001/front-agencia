"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { product, products, productsFormat } from "../service/api/products";
import ProductAdapt from "../service/adapt/ProductAdapt";
import ProductsAdapt from "../service/adapt/ProductsAdapt";
import { AccordionProduct } from "../components/AccordionProduct";

export default function Product() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsProduct, setRowsProduct] = useState<ProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productSelected, setProductSelected] = useState<Model>(emptyOption);
    const [countProducts, setCountProducts] = useState(0);
    const [optionsProducts, setOptionsProducts] = useState<Model[]>([emptyOption]);

    const getProduct = async (id: string) => {
        const dataProduct = await product(id);
        const productAdapt = new ProductAdapt(dataProduct!);
        setRowsProduct([productAdapt.externalProductAdapt])
    }

    useEffect(() => {
        if (productSelected.value != "") {
            getProduct(productSelected.value);
        } else {
            setCurrentPage(1);
            getProducts();
        }
    }, [productSelected]);

    const getProducts = async () => {
        const dataProducts = await products(currentPage ?? 1);
        if (dataProducts?.status === 200) {
            const productsAdapt = new ProductsAdapt(dataProducts.data);
            const dataProduct = productsAdapt.externalProductsAdapt;
            setRowsProduct(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = dataProduct.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountProducts(parseInt(dataProduct.count));
        }
        setIsLoading(false);    
    }

    const getProductsFormat = async () => {
        const dataProducts: Model[] | undefined = await productsFormat();

        setOptionsProducts(dataProducts!);
    }

    useEffect(() => {
        setIsLoading(true);

        getProductsFormat();
        getProducts();
    }, [currentPage]);

    return (
        <Base
            title="Produtos"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsProducts || []}
                            className="w-4/5"
                            value={productSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setProductSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setProductSelected(emptyOption);
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
                            href="/products/register"
                            
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countProducts > 0 ? 
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsProduct.map((value, index) => (
                            <AccordionProduct key={index} id={value.id} insumo={value.insumo} tipo={value.tipo} destino={value.destino}  />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhum produto cadastrado.</p>
                    </div>
                }
                {countProducts > rowsProduct.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais produtos</span>
                    </div>
                )}
            </div>
        </Base>
    );
}