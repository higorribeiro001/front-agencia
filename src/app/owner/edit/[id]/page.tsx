"use client"

import { Button, IconButton, TextField } from "@mui/material";
import { Base } from "../../../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { Loading } from "@/app/components/Loading";
import { ArrowBack } from "@mui/icons-material";
import OwnerAdapt from "@/app/service/adapt/OwnerAdapt";
import { owner, putOwner } from "@/app/service/api/owners";

export default function EditOwner({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    
    const formFields = new FormBuilder()
        .addTextField('proprietario', 'Proprietário *', 'text')
        .build();
  
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    useEffect(() => {
      setIsLoading(true);
      
      const getOwner = async () => {
        const dataOwner: OwnerInterface | undefined = await owner(resolvedParams.id);
        const ownerAdapt = new OwnerAdapt(dataOwner!);

        const ownerData = ownerAdapt.externalOwnerAdapt;

        setModel((prevModel) => {
          const updateModel = [...prevModel];

          updateModel[0].value = ownerData?.proprietario;

          return updateModel;
        });

        setIsLoading(false);
      }

      getOwner();
    }, [params]);

    const initModel = [
        {
            label: '',
            name: 'proprietario',
            value: '',
            error: '',
        }
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
    
        EditOwner();
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const EditOwner = async () => {
        try {
          const response = await putOwner(
            { 
              id: resolvedParams.id,
              proprietario: model[0].value,  
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
          title="Edição de Proprietário"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
              <div className="flex flex-col gap-6 w-full h-full z-10 relative animate-fade-up">
                  <Loading 
                    isOpen={isLoading}
                  />
                  <div className="flex flex-row w-full justify-between z-10 relative">
                      <IconButton href="/owner">
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
                                  '& fieldset': {
                                    borderColor: model[index].error ? 'black2' : '#d1d5db', 
                                  },
                                  '&:hover fieldset': {
                                    borderColor: model[index].error ? 'black2' : '#9ca3af', 
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: model[index].error ? 'black2' : '#3b82f6', 
                                  },
                                },
                                '& .MuiOutlinedInput-input': {
                                  color: model[index].error ? '#b91c1c' : 'var(--black2)',
                                  '&::placeholder': {
                                    color: model[index].error ? '#fca5a5' : 'var(--black2)',
                                    opacity: 1, 
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: model[index].error ? '#ef4444' : 'var(--black2)',
                                  '&.Mui-focused': {
                                    color: model[index].error ? '#ef4444' : 'var(--black2)',
                                  },
                                },
                            }}
                          />
                      ))}
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                          <Button 
                            className="border-[1px] border-solid font-semibold w-[200px] h-[56px]"
                            variant="contained"
                            type="button"
                            sx={{ bgcolor: 'var(--background)', color: 'var(--black2)', border: 'var(--black2) 1px solid' }}
                            href="/owner"
                            
                          >
                              Cancelar
                          </Button>
                          <Button 
                              className="bg-primary font-semibold w-[200px] h-[56px] z-[1]"
                              variant="contained"
                              type="submit"
                              sx={{bgcolor: "var(--primary)", color: '#FFFFFF'}}
                          >
                              Enviar
                          </Button>
                    </div>
                </form>
            </div>
        </Base>
    );
}