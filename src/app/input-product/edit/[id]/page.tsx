"use client"

import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { Base } from "../../../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { Loading } from "@/app/components/Loading";
import { ArrowBack } from "@mui/icons-material";
import { suppliersFormat } from "@/app/service/api/suppliers";
import { productsFormat } from "@/app/service/api/products";
import { inputProduct, putInputProduct } from "@/app/service/api/inputProducts";
import InputProductAdapt from "@/app/service/adapt/InputProductAdapt";

export default function EditInputProduct({ params }: { params: Promise<{ id: string }> }) {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const resolvedParams = React.use(params);

    const formFields = new FormBuilder()
        .addTextField('fornecedor', 'Fornecedor *', 'select')
        .addTextField('n_nf', 'N° NF *', 'text')
        .addTextField('produto', 'Produto *', 'select')
        .addTextField('lote', 'Lote *', 'text')
        .addTextField('un', 'UN *', 'text')
        .addTextField('qtd', 'Qtd. *', 'text')
        .addTextField('total', 'Total *', 'text')
        .addTextField('valor_unitario', 'Valor Unitário *', 'text')
        .addTextField('data_vencimento', 'Data de Vencimento *', 'date')
        .build();
  
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [optionsSuppliers, setOptionsSuppliers] = useState<Model[]>([emptyOption]);
    const [optionsProducts, setOptionsProducts] = useState<Model[]>([emptyOption]);

    useEffect(() => {
      setIsLoading(true);
      
      const getInputProduct = async () => {
        const dataInputProduct: InputProductInterface | undefined = await inputProduct(resolvedParams.id);
        const inputProductAdapt = new InputProductAdapt(dataInputProduct!);

        const inputProductData = inputProductAdapt.externalInputProductAdapt;

        setModel((prevModel) => {
          const updateModel = [...prevModel];

          updateModel[0].value = inputProductData?.fornecedor.id ?? '';
          updateModel[0].label = inputProductData?.fornecedor.fornecedor;
          updateModel[1].value = inputProductData?.n_nf.toString();
          updateModel[2].value = inputProductData?.produto.id ?? '';
          updateModel[2].label = inputProductData?.produto.insumo;
          updateModel[3].value = inputProductData?.lote;
          updateModel[4].value = inputProductData?.un;
          updateModel[5].value = inputProductData?.qtd.toString();
          updateModel[6].value = inputProductData?.total.toString().replace('.', ',');
          updateModel[7].value = String(inputProductData?.valor_unitario).replace('.', ',');
          updateModel[8].value = inputProductData?.data_vencimento;

          return updateModel;
        });

        setIsLoading(false);
      }

      getInputProduct();
    }, [params]);

    const getSupplierFormat = async () => {
        const dataSuppliers: Model[] | undefined = await suppliersFormat();

        setOptionsSuppliers(dataSuppliers!);
    }

    const getProductFormat = async () => {
      const dataProducts: Model[] | undefined = await productsFormat();

      setOptionsProducts(dataProducts!);
    }

    useEffect(() => {
        getSupplierFormat();
        getProductFormat();
    }, []);

    const initModel = [
        {
            label: '',
            name: 'fornecedor',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'n_nf',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'produto',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'lote',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'un',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'qtd',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'total',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'valor_unitario',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'data_vencimento',
            value: '2001-12-31',
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
    
        EditInputProduct();
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const EditInputProduct = async () => {
        try {
          const response = await putInputProduct(
            { 
              id: resolvedParams.id,
              fornecedor: model[0].value, 
              n_nf: parseInt(model[1].value), 
              produto: model[2].value,
              lote: model[3].value,
              un: model[4].value,
              qtd: parseInt(model[5].value),
              total: parseFloat(model[6].value.replace(',', '.')),
              valor_unitario: parseFloat(model[7].value.replace(',', '.')),
              data_vencimento: model[8].value
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
          title="Edição de entrada de produto"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
              <div className="flex flex-col gap-6 w-full h-full z-10 relative animate-fade-up">
                  <Loading 
                    isOpen={isLoading}
                  />
                  <div className="flex flex-row w-full justify-between z-10 relative">
                      <IconButton href="/input-product">
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
                                options={value.name === 'fornecedor' ? optionsSuppliers : optionsProducts}
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
                    <div className="flex flex-row justify-between">
                          <Button 
                            className="bg-white border-[1px] border-solid border-gray-600 z-[1] text-gray-600 font-semibold w-[200px] h-[56px]"
                            variant="contained"
                            type="button"
                            href="/input-product"
                            style={{background: "white", color: "#4B5563", border: "1px solid #4B5563"}}
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
