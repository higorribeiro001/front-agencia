"use client"

import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { Base } from "../../../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { Loading } from "@/app/components/Loading";
import { ArrowBack } from "@mui/icons-material";
import { farmsFormat } from "@/app/service/api/farms";
import { earring, putEarring } from "@/app/service/api/earrings";
import EarringAdapt from "@/app/service/adapt/EarringAdapt";
import sexo from "@/data/sexo.json";

export default function EditEarring({ params }: { params: Promise<{ id: string }> }) {
    const emptyOption = {"label": "", "value": "", "error": "", "name": ""};
    const resolvedParams = React.use(params);

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

    useEffect(() => {
      setIsLoading(true);
      
      const getEarring = async () => {
        const dataEarring: EarringInterface | undefined = await earring(resolvedParams.id);
        const earringAdapt = new EarringAdapt(dataEarring!);

        const cochoData = earringAdapt.externalEarringAdapt;

        setModel((prevModel) => {
          const updateModel = [...prevModel];

          updateModel[0].value = cochoData?.brinco;
          updateModel[1].value = cochoData?.proprietario;
          updateModel[2].value = cochoData?.fazenda.id ?? '';
          updateModel[2].label = cochoData?.fazenda.fazenda;
          updateModel[3].value = cochoData?.lote;
          updateModel[4].value = cochoData?.sexo;
          updateModel[4].label = cochoData?.sexo;
          updateModel[5].value = cochoData?.raca;
          updateModel[6].value = cochoData?.data_entrada;
          updateModel[7].value = String(cochoData?.valor_entrada).replace('.', ',');
          updateModel[8].value = cochoData?.perda_dados;

          return updateModel;
        });

        setIsLoading(false);
      }

      getEarring();
    }, [params]);

    const getFarmFormat = async () => {
        const dataChocos: Model[] | undefined = await farmsFormat();

        setOptionsFarms(dataChocos!);
    }

    useEffect(() => {
        getFarmFormat();
    }, []);

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
    
        EditEarring();
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const EditEarring = async () => {
        try {
          const response = await putEarring(
            { 
              id: resolvedParams.id,
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
          title="Edição de Brinco"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
              <div className="flex flex-col gap-6 w-full h-full z-10 relative animate-fade-up">
                  <Loading 
                    isOpen={isLoading}
                  />
                  <div className="flex flex-row w-full justify-between z-10 relative">
                      <IconButton href="/earrings">
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
                    <div className="flex flex-row justify-between">
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
