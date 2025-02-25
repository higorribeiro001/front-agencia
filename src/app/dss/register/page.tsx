"use client"

import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { Base } from "../../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { EmployeeLabelInterface, StatusResponse } from "@/data/types";
import { postDss } from "@/app/service/api/orders";
import { Loading } from "@/app/components/Loading";
import { ArrowBack } from "@mui/icons-material";
import sim_nao from "@/data/sim_nao.json";
import { employeesLabel } from "@/app/service/api/employees";
import EmployeesLabelAdapt from "@/app/service/adapt/EmployeesLabelAdapt";

export default function RegisterDss() {

    const formFields = new FormBuilder()
        .addTextField('matricula', '* Matrícula', 'number')
        .addTextField('funcionario_id', '* Funcionário', 'select')
        .addTextField('presenca', '* Presença', 'select')
        .addTextField('data_realizacao', '* Data de Realização', 'date')
        .build();

    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [employeesData, setEmployeesData] = useState<EmployeeLabelInterface[]>();

    const initModel = [
        {
            label: 'matricula',
            value: '',
            error: '',
        },
        {
            label: 'funcionario_id',
            value: '',
            error: '',
        },
        {
            label: 'presenca',
            value: '',
            error: '',
        },
        {
            label: 'data_realizacao',
            value: '2025-01-01',
            error: '',
        }
    ];

    const [model, setModel] = useState(initModel);

    useEffect(() => {
      const getEmployee = async () => {
        const dataEmployee = await employeesLabel();
        const employeeAdapt = new EmployeesLabelAdapt(dataEmployee!);
        setEmployeesData(employeeAdapt.externalEmployeesLabelAdapt);
      }

      getEmployee();
    }, []);

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
    
        registerDss();
    
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const registerDss = async () => {
        try {
          const response = await postDss(parseInt(model[0].value), model[1].value, Boolean(model[2].value), model[3].value);
    
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
          title="Cadastro de DSS"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
            <div className="flex flex-col gap-6 w-[85%] h-full z-10 relative animate-fade-up">
                <Loading 
                  isOpen={isLoading}
                />
                <div className="flex flex-row justify-between z-10 relative">
                    <IconButton href="/dss">
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
                    <div className="w-full flex flex-wrap gap-5 mb-10">
                        {formFields.map((value, index: number) => (
                            value.type === 'select' ? (
                              <Autocomplete
                                  key={index}
                                  disablePortal
                                  options={value.name === 'funcionario_id' && employeesData ? employeesData! : sim_nao}
                                  sx={{ width: 300 }}
                                  className="w-[49%]"
                                  value={model[index].value !== '' ? model[index].label : model[index].value} 
                                  onChange={(event, newValue) => {
                                    if (newValue) {
                                      setModel((prevModel) => {
                                        const updateModel = [...prevModel];
                                        updateModel[index] = { 
                                          label: newValue.label,
                                          value: newValue.value, 
                                          error: newValue.error ?? ''
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
                                    />
                                  }
                                />
                                ) : (
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
                            )
                        ))}
                    </div>
                    <div className="flex flex-row justify-between">
                        <Button 
                            className="bg-white border-[1px] border-solid border-gray-600 z-[1] text-gray-600 font-semibold w-[200px] h-[56px]"
                            variant="contained"
                            type="button"
                            href="/dss"
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