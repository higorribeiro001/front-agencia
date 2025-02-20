"use client"

import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { Base } from "../../../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { EmployeeInterface, StatusResponse } from "@/data/types";
import { employee, putEmployee } from "@/app/service/api/employees";
import { Loading } from "@/app/components/Loading";
import EmployeeAdapt from "@/app/service/adapt/EmployeeAdapt";
import { ArrowBack } from "@mui/icons-material";
import meses from "@/data/meses.json";
import setores from "@/data/setores.json";
import funcoes from "@/data/funcoes.json";
import categorias from "@/data/categorias.json";
import categorias_bonus from "@/data/categorias_bonus.json";
import status from "@/data/status.json";

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    
    const formFields = new FormBuilder()
          .addTextField('cod_funcionario', '* COD Funcionário', 'number')
          .addTextField('funcionario', '* Funcionário', 'text')
          .addTextField('setor', '* Setor', 'select')
          .addTextField('funcao', '* Função', 'select')
          .addTextField('categoria', '* Categoria', 'select')
          .addTextField('categoria_bonus', '* Categoria Bônus', 'select')
          .addTextField('mes', '* Mês', 'select')
          .addTextField('is_active', '* Status', 'select')
          .build();
  
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    useEffect(() => {
      setIsLoading(true);
      
      const getEmployee = async () => {
        const dataEmployee: EmployeeInterface = await employee(resolvedParams.id);
        const employeeAdapt = new EmployeeAdapt(dataEmployee);

        const employeeData = employeeAdapt.externalEmployeeAdapt;

        setModel((prevModel) => {
          const updateModel = [...prevModel];

          updateModel[0].value = String(employeeData!.cod_funcionario);
          updateModel[1].value = employeeData!.funcionario;
          updateModel[2].value = employeeData!.setor;
          updateModel[3].value = employeeData!.funcao;
          updateModel[4].value = employeeData!.categoria;
          updateModel[5].value = employeeData!.categoria_bonus;
          updateModel[6].value = employeeData!.mes;
          updateModel[7].value = employeeData!.is_active ? 'ativo' : 'inativo';

          return updateModel;
        });

        setIsLoading(false);
      }

      getEmployee();
    }, [params]);

    const initModel = [
        {
            label: 'cod_funcionario',
            value: '',
            error: '',
        },
        {
            label: 'funcionario',
            value: '',
            error: '',
        },
        {
            label: 'setor',
            value: '',
            error: '',
        },
        {
            label: 'funcao',
            value: '',
            error: '',
        },
        {
            label: 'categoria',
            value: '',
            error: '',
        },
        {
            label: 'categoria_bonus',
            value: '',
            error: '',
        },
        {
            label: 'mes',
            value: '',
            error: '',
        },
        {
            label: 'is_active',
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
    
        editEmployee();
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const editEmployee = async () => {
        try {
          const response = await putEmployee(resolvedParams.id, parseInt(model[0].value), model[1].value, model[2].value, model[3].value, model[4].value, model[5].value, model[6].value, model[7].value === 'ativo' ? true : false);
    
          if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Editado com sucesso!');
            setIsSuccess(true);
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
          title="Edição de Funcionário"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
            <div className="flex flex-col gap-6 w-[85%] h-full z-10 relative">
                <Loading 
                  isOpen={isLoading}
                />
                <div className="flex flex-row justify-between z-10 relative">
                    <IconButton href="/employees">
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
                                  options={value.name === 'mes' ? meses : value.name === 'setor' ? setores : value.name === 'funcao' ? funcoes : value.name === 'categoria' ? categorias : value.name === 'categoria_bonus' ? categorias_bonus : status}
                                  sx={{ width: 300 }}
                                  className="w-[49%]"
                                  value={model[index].value} 
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
                            href="/employees"
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