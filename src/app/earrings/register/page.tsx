"use client"

import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { Base } from "../../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { Loading } from "@/app/components/Loading";
import { ArrowBack } from "@mui/icons-material";
import { farmsFormat } from "@/app/service/api/farms";
import { postEarring } from "@/app/service/api/earrings";
import sexo from "@/data/sexo.json";

export default function RegisterEarring() {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const formFields = new FormBuilder()  
        .addTextField('brinco', 'Brinco *', 'text')
        .addTextField('proprietario', 'Proprietário *', 'text')
        .addTextField('fazenda', 'Fazenda *', 'select')
        .addTextField('lote', 'Lote *', 'text')
        .addTextField('sexo', 'Sexo *', 'select')
        .addTextField('raca', 'Raça *', 'text')
        .addTextField('data_entrada', 'Data de Entrada *', 'date')
        .addTextField('valor_entrada', 'Valor de Entrada *', 'text')
        .addTextField('perda_dados', 'Perda de Dados *', 'text')
        .build();

    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [optionsFarms, setOptionsFarms] = useState<Model[]>([emptyOption]);
    const initModel = [
        {
            label: '',
            name: 'brinco',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'proprietario',
            value: '',
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
            name: 'lote',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'sexo',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'raca',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'data_entrada',
            value: '2001-12-31',
            error: '',
        },
        {
            label: '',
            name: 'valor_entrada',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'perda_dados',
            value: '',
            error: '',
        },
    ];

    const getFarmFormat = async () => {
        const dataChocos: Model[] | undefined = await farmsFormat();

        setOptionsFarms(dataChocos!);
    }

    useEffect(() => {
        getFarmFormat();
    }, []);

    const [model, setModel] = useState(initModel);

    const cleanFields = () => {
      setModel(initModel);
    }

    const changeValues = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        e.preventDefault()
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
        if(index < 14) {
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
    
        registerEarring();
    
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const registerEarring = async () => {
        try {
          const response = await postEarring(
            { 
              brinco: model[0].value, 
              proprietario: model[1].value, 
              fazenda: model[2].value,
              lote: model[3].value,
              sexo: model[4].value,
              raca: model[5].value,
              data_entrada: model[6].value,
              valor_entrada: parseFloat(model[7].value.replace(',', '.')),
              perda_dados: model[8].value
            });
    
          if (response.status === 201) {
            setOpenAlert(true);
            setMessageAlert('Registrado com sucesso!');
            setIsSuccess(true);
            cleanFields();
            closeAlert();
          }
        } catch (e: unknown) {
          const error = e as StatusResponse;
          if (error.response.status === 422) {
            setOpenAlert(true);
            setMessageAlert('Preencha todos os campos obrigatórios.');
            setIsSuccess(false);
    
            closeAlert();
          } else {
            setOpenAlert(true);
            setMessageAlert('Erro inesperado, por favor aguardo e tente novamente mais tarde.');
            setIsSuccess(false);
    
            closeAlert();
          }
        } finally {
          setIsLoading(false);
        }
    }

    return (
        <Base 
          title="Cadastro de Brinco"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
          <div className="flex flex-col gap-6 w-full h-full z-10 relative animate-fade-up">
              <Loading 
                isOpen={isLoading}
              />
              <div className="flex flex-row w-full justify-between z-10 relative">
                  <IconButton href="/earrings" className="text-[var(--black2)]">
                    <ArrowBack />
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
              <span className="font-semibold text-[var(--black2)]">
                  * Campos obrigatórios.
              </span>
              <form 
                  className="flex flex-col gap-10 w-full" 
                  onSubmit={submitForm}
              >
                  <div className="w-full flex flex-wrap justify-between gap-5 mb-10">
                    {formFields
                        .map((value, index) => ( 
                          value.type === 'select' ? (
                            <Autocomplete
                                key={index}
                                disablePortal
                                options={value.name === 'fazenda' ? optionsFarms : sexo}
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
                        className="bg-white border-[1px] border-solid border-gray-600 z-[1] text-gray-600 font-semibold w-[200px] h-[56px]"
                        variant="contained"
                        type="button"
                        href="/earrings"
                        style={{background: "white", color: "#4B5563", border: "1px solid #4B5563"}}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        className="bg-primary font-semibold w-[200px] h-[56px] z-[1]"
                        variant="contained"
                        type="submit"
                        style={{background: "#031B17", color: "#FFFFFF"}}
                    >
                        Enviar
                    </Button>
                  </div>
              </form>
          </div>
        </Base>
    );
}