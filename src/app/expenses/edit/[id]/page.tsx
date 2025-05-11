"use client"

import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { Base } from "../../../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { Loading } from "@/app/components/Loading";
import { ArrowBack } from "@mui/icons-material";
import { farmsFormat } from "@/app/service/api/farms";
import { applicationPhasesFormat } from "@/app/service/api/applicationPhase";
import { productsFormat } from "@/app/service/api/products";
import { expense, putExpense } from "@/app/service/api/expenses";
import ExpenseAdapt from "@/app/service/adapt/ExpenseAdapt";

export default function EditExpense({ params }: { params: Promise<{ id: string }> }) {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const resolvedParams = React.use(params);

    const formFields = new FormBuilder()  
        .addTextField('data_registro', 'Data do Registro *', 'date')
        .addTextField('fazenda', 'Fazenda *', 'select')
        .addTextField('grupo', 'Grupo *', 'text')
        .addTextField('conta', 'Conta *', 'select')
        .addTextField('id_pc', 'ID PC *', 'select')
        .addTextField('nota_fiscal', 'Nota Fiscal *', 'text')
        .addTextField('descricao', 'Descrição *', 'text')
        .addTextField('observacao', 'Observação *', 'text')
        .addTextField('numero_boleto', 'N° Boleto *', 'text')
        .addTextField('data_vencimento', 'Data de Vencimento *', 'date')
        .addTextField('data_pagamento', 'Data de Pagamento *', 'date')
        .addTextField('valor_total', 'R$ Valor Total *', 'text')
        .addTextField('valor_pago', 'R$ Valor Pago *', 'text')
        .build();
  
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [optionsFarms, setOptionsFarms] = useState<Model[]>([emptyOption]);
    const [optionsProducts, setOptionsProducts] = useState<Model[]>([emptyOption]);
    const [optionsApplicationPhase, setOptionsApplicationPhase] = useState<Model[]>([emptyOption]);

    useEffect(() => {
      setIsLoading(true);
      
      const getExpense = async () => {
        const dataExpense: ExpenseInterface | undefined = await expense(resolvedParams.id);
        const expenseAdapt = new ExpenseAdapt(dataExpense!);

        const expenseData= expenseAdapt.externalExpenseAdapt;

        setModel((prevModel) => {
          const updateModel = [...prevModel];

          updateModel[0].value = expenseData.data_registro;
          updateModel[1].value = expenseData.fazenda.id ?? '';
          updateModel[1].label = expenseData.fazenda.fazenda;
          updateModel[2].value = expenseData.grupo;
          updateModel[3].value = expenseData.conta.id ?? '';
          updateModel[3].label = expenseData.conta.descricao;
          updateModel[4].value = expenseData.id_pc;
          updateModel[5].value = expenseData.nota_fiscal;
          updateModel[6].value = expenseData.descricao;
          updateModel[7].value = expenseData.observacao;
          updateModel[8].value = expenseData.numero_boleto;
          updateModel[9].value = expenseData.data_vencimento;
          updateModel[10].value = expenseData.data_pagamento;
          updateModel[11].value = expenseData.valor_total.toString().replace('.', ',');
          updateModel[12].value = expenseData.valor_pago.toString().replace('.', ',');

          return updateModel;
        });

        setIsLoading(false);
      }

      getExpense();
    }, [params]);

    const getFarmFormat = async () => {
        const dataFarms: Model[] | undefined = await farmsFormat();

        setOptionsFarms(dataFarms!);
    }

    const getProductFormat = async () => {
      const dataProducts: Model[] | undefined = await productsFormat();

      setOptionsProducts(dataProducts!);
    }

    const getAplicationPhaseFormat = async () => {
      const dataAplicationPhases: Model[] | undefined = await applicationPhasesFormat();

      setOptionsApplicationPhase(dataAplicationPhases!);
    }

    useEffect(() => {
        getFarmFormat();
        getProductFormat();
        getAplicationPhaseFormat();
    }, []);

    const initModel = [
        {
            label: '',
            name: 'data_registro',
            value: '2001-12-31',
            error: '',
        },
        {
            label: '',
            name: 'fazenda',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'grupo',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'conta',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'id_pc',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'nota_fiscal',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'descricao',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'observacao',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'numero_boleto',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'data_vencimento',
            value: '2001-12-31',
            error: '',
        },
        {
            label: '',
            name: 'data_pagamento',
            value: '2001-12-31',
            error: '',
        },
        {
            label: '',
            name: 'valor_total',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'valor_pago',
            value: '',
            error: '',
        },
    ];

    const [model, setModel] = useState(initModel);

    const cleanFields = () => {
      setModel(initModel);
    }

    const changeValues = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setModel((prevModel) => {
          const updateModel = [...prevModel];
          updateModel[index].value = e.target.value;
          if (updateModel[index].value === '') {
            updateModel[index].error = `Campo ${model[index].label} obrigatório.`;
          } else {
            updateModel[index].error = '';
          }
          return updateModel;
        });
    }

    const validator = (message: string, index: number) => {
      if(index < 13) {
        setModel((prevModel) => {
          const updateModel = [...prevModel];
          updateModel[index].error = message;
          return updateModel;
        });
      }
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        for (let i=0; i < model.length; i++) {
          if (model[i].value === '') {
            validator(`Campo ${model[i].label} obrigatório.`, i);
          } else {
            validator('', i);
          }
    
          if (model[i].error !== '') {
            return;
          }
        }
    
        setIsLoading(true);
    
        EditExpense();
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const EditExpense = async () => {
        try {
          const response = await putExpense(
            { 
              id: resolvedParams.id,
              data_registro: model[0].value, 
              fazenda: model[1].value, 
              grupo: model[2].value,
              conta: model[3].value,
              id_pc: model[4].value,
              nota_fiscal: model[5].value,
              descricao: model[6].value,
              observacao: model[7].value,
              numero_boleto: model[8].value,
              data_vencimento: model[9].value,
              data_pagamento: model[10].value,
              valor_total: parseFloat(model[11].value.replace(',', '.')),
              valor_pago: parseFloat(model[12].value.replace(',', '.')),
          });
    
          if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Editado com sucesso!');
            setIsSuccess(true);
            closeAlert();
          }
        } catch (e: unknown) {
          const error = e as StatusResponse;
          if (error.response && error.response.status === 422) {
            setOpenAlert(true);
            setMessageAlert('Preencha todos os campos obrigatórios.');
            setIsSuccess(false);
    
            closeAlert();
          } else {
            setOpenAlert(true);
            setMessageAlert('Erro inesperado, por favor aguardo e tente novamente mais tarde.');
            setIsSuccess(false);
            console.log(e)
    
            closeAlert();
          }
        } finally {
          setIsLoading(false);
        }
    }

    return (
        <Base 
          title="Edição de receita"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
              <div className="flex flex-col gap-6 w-full h-full z-10 relative animate-fade-up">
                  <Loading 
                    isOpen={isLoading}
                  />
                  <div className="flex flex-row w-full justify-between z-10 relative">
                      <IconButton href="/expenses">
                        <ArrowBack className="text-black2" />
                      </IconButton>
                      <Button 
                          className="font-semibold w-[200px] h-[56px] z-10 relative"
                          variant="contained"
                          type="button"
                          color="error"
                          onClick={cleanFields}
                      >
                          Limpar campos
                      </Button>
                  </div>
                  <span className="font-semibold text-black2">
                      * Campos obrigatórios.
                  </span>
                  <form 
                      className="flex flex-col gap-10 w-full" 
                      onSubmit={submitForm}
                  >
                    <div className="w-full flex flex-wrap justify-between gap-5 mb-10">
                      {formFields.map((value, index: number) => (
                          value.type === 'select' ? (
                            <Autocomplete
                                key={index}
                                disablePortal
                                disabled={value.name === 'unidade_id'}
                                options={value.name === 'fazenda' ? optionsFarms : value.name === 'produto' ? optionsProducts : optionsApplicationPhase}
                                className="w-full lg:w-[49%]"
                                value={model[index]} 
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    setModel((prevModel) => {
                                      const updateModel = [...prevModel];
                                      updateModel[index] = { 
                                        label: newValue.label,
                                        name: updateModel[index].name,
                                        value: newValue.value, 
                                        error: ''
                                      };
                                      return updateModel;
                                    });
                                  }
                                }}
                                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                renderInput={(params) => 
                                  <TextField 
                                    {...params} 
                                    label={value.label} 
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeValues(e, index)} 
                                    value={model[index].value}
                                    error={model[index].error !== '' ? true : false}
                                    helperText={model[index].error}
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
                                  />
                                }
                              />) : (
                                <TextField
                                  key={index}
                                  className="w-full lg:w-[49%]"
                                  label={value.label} 
                                  variant="outlined"
                                  type={value.type}
                                  error={model[index].error !== '' ? true : false}
                                  helperText={model[index].error}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => changeValues(e, index)}
                                  value={model[index].value}
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
                                />
                              )
                      ))}
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                          <Button 
                            className="border-[1px] border-solid font-semibold w-[200px] h-[56px]"
                            variant="contained"
                            type="button"
                            sx={{ bgcolor: 'var(--background)', color: 'var(--black2)', borderColor: 'var(--black2)' }}
                            href="/expenses"
                            
                          >
                              Cancelar
                          </Button>
                          <Button 
                              className="bg-primary font-semibold w-[200px] h-[56px] z-[1]"
                              variant="contained"
                              type="submit"
                              sx={{bgcolor: "#031B17", color: '#FFFFFF'}}
                          >
                              Enviar
                          </Button>
                    </div>
                </form>
            </div>
        </Base>
    );
}
