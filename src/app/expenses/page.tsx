"use client"

import { Autocomplete, Button,IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import ReplayIcon from '@mui/icons-material/Replay';
import { Loading } from "../components/Loading";
import { expense, expenses, expensesFormat } from "../service/api/expenses";
import ExpenseAdapt from "../service/adapt/ExpenseAdapt";
import ExpensesAdapt from "../service/adapt/ExpensesAdapt";
import { AccordionExpense } from "../components/AccordionExpense";

export default function Expenses() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const [rowsExpense, setRowsExpense] = useState<ExpenseInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [expenseSelected, setExpenseSelected] = useState<Model>(emptyOption);
    const [countExpenses, setCountExpenses] = useState(0);
    const [optionsExpenses, setOptionsExpenses] = useState<Model[]>([emptyOption]);

    const getExpense = async (id: string) => {
        const dataExpense = await expense(id);
        const expenseAdapt = new ExpenseAdapt(dataExpense!);
        setRowsExpense([expenseAdapt.externalExpenseAdapt])
    }

    useEffect(() => {
        if (expenseSelected.value != "") {
            getExpense(expenseSelected.value);
        } else {
            setCurrentPage(1);
            getExpenses();
        }
    }, [expenseSelected]);

    const getExpenses = async () => {
        const dataExpenses = await expenses(currentPage ?? 1);
        if (dataExpenses?.status === 200) {
            const expensessAdapt = new ExpensesAdapt(dataExpenses.data);
            const expensesData = expensessAdapt.externalExpensesAdapt;
            setRowsExpense(prev => {
                const newIds = new Set(prev.map(item => item.id));
                const filtered = expensesData.results.filter(item => !newIds.has(item.id));
                return [...prev, ...filtered];
            });
            setCountExpenses(parseInt(expensesData.count));
        }
        setIsLoading(false);    
    }

    const getExpensesFormat = async () => {
        const dataExpenses: Model[] | undefined = await expensesFormat();

        setOptionsExpenses(dataExpenses!);
    }

    useEffect(() => {
        setIsLoading(true);

        getExpensesFormat();
        getExpenses();
    }, [currentPage]);

    return (
        <Base
            title="Despesas"
        >
            <div className="animate-fade-left">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col">
                    <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mt-7 mb-8">
                        <Autocomplete
                            disablePortal
                            options={optionsExpenses || []}
                            className="w-4/5"
                            value={expenseSelected}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setExpenseSelected(newValue);
                                }
                            }}
                            onInputChange={(event, inputValue, reason) => {
                                if (reason === 'clear' || inputValue === '') {
                                    setExpenseSelected(emptyOption);
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
                            href="/expenses/register"
                            style={{background: "#031B17", color: "#FFFFFF"}}
                        >
                            Novo
                        </Button>
                    </div>
                </div>
                {countExpenses > 0 ? 
                    <div className="flex flex-wrap gap-3 w-full h-full">
                        {rowsExpense.map((value, index) => (
                            <AccordionExpense key={index} id={value.id} data_vencimento={value.data_vencimento} data_pagamento={value.data_pagamento} data_registro={value.data_registro} conta={value.conta} id_pc={value.id_pc} descricao={value.descricao} observacao={value.observacao} fazenda={value.fazenda} grupo={value.grupo} nota_fiscal={value.nota_fiscal} numero_boleto={value.numero_boleto} valor_pago={value.valor_pago} valor_total={value.valor_total} />
                        ))}
                    </div>
                    : <div className="flex w-full h-full justify-center items-center mt-16 text-black2">
                        <p>Nenhuma despesa cadastrada.</p>
                    </div>
                }
                {countExpenses > rowsExpense.length && (
                    <div className="flex flex-col w-full justify-content items-center mt-5">
                        <IconButton onClick={() => setCurrentPage(currentPage+1)}>
                            <ReplayIcon className="text-black2" />
                        </IconButton>
                        <span className="text-black2">Carregar mais despesas</span>
                    </div>
                )}
            </div>
        </Base>
    );
}