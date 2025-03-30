"use client"

import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Base } from "../../../components/Base/layout";
import React, { ChangeEvent, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { Loading } from "@/app/components/Loading";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { patchResetPassword } from "@/app/service/api/user";

export default function ResetPassword({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    
    const formFields = new FormBuilder()
      .addTextField('password', '* Senha', 'text')
      .addTextField('confirm_password', '* Confirmar Senha', 'text')
      .build();
  
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const initModel = [
        {
            label: '',
            name: 'password',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'confirm_password',
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
          if (updateModel[index].value === '' && !isSuccess) {
            updateModel[index].error = `Campo ${model[index].label} obrigatório.`;
          } else if (updateModel[index].name === 'confirm_password' && updateModel[index].value !== updateModel[index-1].value) { 
            updateModel[index].error = 'As senhas não correspondem.';
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
          } else if (model[i].name === 'confirm_password' && model[i].value !== model[i-1].value) { 
            model[i].error = 'As senhas não correspondem.';
          } else {
            validator('', i);
          }
    
          if (model[i].error !== '') {
            return;
          }
        }
    
        setIsLoading(true);
    
        editUser();
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const editUser = async () => {
        try {
          const response = await patchResetPassword(
            { 
              id: resolvedParams.id,
              password: model[0].value
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
          title="Edição de Usuário"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
            <div className="flex flex-col gap-6 w-full h-full z-10 relative animate-fade-up">
                  <Loading 
                    isOpen={isLoading}
                  />
                  <div className="flex flex-row w-full justify-between z-10 relative">
                      <IconButton href="/profile">
                        <ArrowBack color="inherit" />
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
                  <span className="font-semibold">
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
                                type={value.type === 'password' ? showPassword ? "text" : "password" : value.type}
                                InputProps={value.type === 'password' ? {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                } : {}}
                                error={model[index].error !== '' ? true : false}
                                helperText={model[index].error}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => changeValues(e, index)}
                                value={model[index].value}
                            />
                        ))}
                      </div>
                      <div className="flex flex-row justify-between">
                            <Button 
                              className="bg-white border-[1px] border-solid border-gray-600 z-[1] text-gray-600 font-semibold w-[200px] h-[56px]"
                              variant="contained"
                              type="button"
                              href="/profile"
                              style={{background: "white", color: "#4B5563", border: "1px solid #4B5563"}}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                className="bg-primary font-semibold w-[200px] h-[56px] z-[1]"
                                variant="contained"
                                type="submit"
                                sx={{bgcolor: "#FB3A04"}}
                            >
                                Enviar
                            </Button>
                      </div>
                  </form>
            </div>
        </Base>
    );
}