"use client"

import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { Base } from "../../components/Base/layout";
import React, { ChangeEvent, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { Loading } from "@/app/components/Loading";
import { ArrowBack } from "@mui/icons-material";
import { postUser } from "@/app/service/api/user";
import profiles from "../../../data/profiles.json";
import { IMaskInput } from 'react-imask';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(00) 00000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
        className="w-full p-4 rounded-md focus:outline-none focus:border-blue-500"
      />
    );
  }
);

export default function RegisterUser() {

    const formFields = new FormBuilder()
      .addTextField('name', '* Nome', 'text')
      .addTextField('email', '* E-mail', 'text')
      .addTextField('phone', '* Telefone', 'text')
      .addTextField('role', '* Papel', 'select')
      .addTextField('password', '* Senha', 'text')
      .addTextField('confirm_password', '* Confirmar Senha', 'text')
      .build();

    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const initModel = [
        {
            label: '',
            name: 'name',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'email',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'phone',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'role',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'password',
            value: '',
            error: '',
        }
        ,
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
        setModel((prevModel) => {
          const updateModel = [...prevModel];
          updateModel[index].error = message;
          return updateModel;
        });
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
    
        registerUser();
    
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const registerUser = async () => {
        try {
          const response = await postUser(
            { 
              name: model[0].value, 
              email: model[1].value, 
              phone: model[2].value, 
              role: model[3].value,  
              password: model[4].value
            }
          );
    
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
          title="Cadastro de usuário"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
              <div className="flex flex-col gap-6 w-full h-full z-10 relative animate-fade-up">
                <Loading 
                  isOpen={isLoading}
                />
                <div className="flex flex-row w-full justify-between z-10 relative">
                    <IconButton href="/users">
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
                            value.type === 'select' ? (
                              <Autocomplete
                                  key={index}
                                  disablePortal
                                  disabled={value.name === 'unidade_id'}
                                  options={profiles}
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
                                    />
                                  }
                                />
                                ) : value.name === 'phone' ? (
                                  <TextField
                                    key={index}
                                    className="w-full lg:w-[49%]"
                                    label={value.label}
                                    variant="outlined"
                                    type="text"
                                    error={model[index].error !== '' ? true : false}
                                    helperText={model[index].error}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeValues(e, index)}
                                    value={model[index].value}
                                    InputProps={{
                                      inputComponent: TextMaskCustom as any,
                                    }}
                                  />
                                ) : (
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
                                />
                            )
                        ))}
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <Button 
                            className="bg-white border-[1px] border-solid border-gray-600 z-[1] text-gray-600 font-semibold w-[200px] h-[56px]"
                            variant="contained"
                            type="button"
                            href="/users"
                            style={{background: "white", color: "#4B5563", border: "1px solid #4B5563"}}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            className="bg-primary font-semibold w-[200px] h-[56px] z-[1]"
                            variant="contained"
                            type="submit"
                            style={{background: "#FB3A04"}}
                        >
                            Enviar
                        </Button>
                    </div>
                </form>
            </div>
        </Base>
    );
}