"use client"

import { Button, TextField } from "@mui/material";
import { Base } from "../../components/Base/layout";
import { Breadcrumb } from "../../components/Breadcrumb";
import React, { ChangeEvent, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { StatusResponse } from "@/data/types";
import { postMdfDoorLeaveFindName } from "@/app/service/api/mdfDoorLeaves";
import { Loading } from "@/app/components/Loading";


export default function RegisterProduct() {
    const breadcrumbOptions = [
        {
            page: 'Kit de Porta',
            current: false,
            href: '/products'
        },
        {
            page: 'Cadastro',
            current: true,
            href: '/products/register-door-leave'
        }
    ];

    const formFields = new FormBuilder()
        .addTextField('nome', '* Nome', 'text')
        .addTextField('largura', '* Largura', 'text')
        .addTextField('altura', '* Altura', 'text')
        .addTextField('sarrafo', '* Sarrafo', 'text')
        .build();

    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const initModel = [
      {
          name: 'nome',
          value: '',
          error: '',
      },
      {
          name: 'largura',
          value: '',
          error: '',
      },
      {
          name: 'altura',
          value: '',
          error: '',
      },
      {
          name: 'sarrafo',
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
            updateModel[index].error = `Campo ${model[index].name} obrigatório.`;
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
            validator(`Campo ${model[i].name} obrigatório.`, i);
          } else {
            validator('', i);
          }
    
          if (model[i].error !== '') {
            return;
          }
        }
    
        setIsLoading(true);
    
        registerMdfDoorLeave();
    
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const registerMdfDoorLeave = async () => {
        try {
          const response = await postMdfDoorLeaveFindName(model[0].value, parseFloat(model[1].value.replace(',', '.')), parseFloat(model[2].value.replace(',', '.')), parseFloat(model[3].value.replace(',', '.')));
    
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
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
            <div className="flex flex-col gap-6 w-[85%] h-full z-10 relative">
                <Loading 
                  isOpen={isLoading}
                />
                <div className="flex flex-row justify-between z-10 relative">
                    <Breadcrumb 
                        options={breadcrumbOptions}
                    />
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
                    <div className="w-full flex flex-wrap gap-5 mb-10">
                        {formFields.map((value, index: number) => (
                            <TextField
                                key={index}
                                className="w-[49%]"
                                label={value.label} 
                                variant="outlined"
                                type={value.type}
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
                            href="/products"
                        >
                            Cancelar
                        </Button>
                        <Button 
                            className="bg-primary font-semibold w-[200px] h-[56px] z-[1]"
                            variant="contained"
                            type="submit"
                        >
                            Enviar
                        </Button>
                    </div>
                </form>
            </div>
        </Base>
    );
}