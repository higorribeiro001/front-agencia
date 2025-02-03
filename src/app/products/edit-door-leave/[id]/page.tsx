"use client"

import { Button, TextField } from "@mui/material";
import { Base } from "../../../components/Base/layout";
import { Breadcrumb } from "../../../components/Breadcrumb";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { MdfDoorLeaveInterface, StatusResponse } from "@/data/types";
import { mdfDoorLeave, putMdfDoorLeaveFindName } from "@/app/service/api/mdfDoorLeaves";
import { Loading } from "@/app/components/Loading";
import MdfDoorLeaveAdapt from "@/app/service/adapt/MdfDoorLeaveAdapt";


export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  
  const breadcrumbOptions = [
    {
      page: 'Kit de Porta',
      current: false,
      href: '/products'
    },
    {
      page: 'Edição',
      current: true,
      href: '/products/edit-door-leave'
    }
  ];
  
  const formFieldsOne = new FormBuilder()
  .addTextField('nome', '* Nome', 'text')
  .addTextField('chave', '* Chave', 'text')
  .addTextField('largura', '* Largura', 'text')
  .addTextField('altura', '* Altura', 'text')
  .addTextField('sarrafo', '* Sarrafo', 'text')
  .addTextField('mdf_30', '* MDF 30', 'text')
  .addTextField('mdf_6_comum_2_qualidade', '* MDF 6 comum (2° qualidade)', 'text')
  .addTextField('mdf_3_comum_1_qualidade', '* MDF 3 comum (1° qualidade)', 'text')
  .build();

  const formFieldsTwo = new FormBuilder()
  .addTextField('mdf_3_comum_2_qualidade', '* MDF 3 comum (2° qualidade)', 'text')
  .addTextField('mdf_3_Berneck', '* MDF 3 Berneck', 'text')
  .addTextField('madeira', '* Madeira', 'text')
  .addTextField('bondoor', '* Bondoor', 'text')
  .addTextField('total_mdf_m', '* Total MDF (m)', 'text')
  .addTextField('total_mdf_m2_rec', '* Total MDF (m²)_Rec', 'text')
  .addTextField('total_mdf_m2_rec', '* Total MDF (m²) Pintura', 'text')
  .addTextField('total_mdf_m2_rec', '* Total MDF (m³)', 'text')
  .build();
  
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');

  useEffect(() => {
    setIsLoading(true);
    
    const getMdf = async () => {
      const dataMdfDoorLeave: MdfDoorLeaveInterface = await mdfDoorLeave(resolvedParams.id);
      const mdfAdapt = new MdfDoorLeaveAdapt(dataMdfDoorLeave);

      const doorLeave = mdfAdapt.externalMdfDoorLeaveAdapt;

      setModelOne((prevModel) => {
        const updateModel = [...prevModel];

        updateModel[0].value = doorLeave!.nome;
        updateModel[1].value = doorLeave!.chave;
        updateModel[2].value = String(doorLeave!.largura).replace('.', ',');
        updateModel[3].value = String(doorLeave!.altura).replace('.', ',');
        updateModel[4].value = String(doorLeave!.sarrafo).replace('.', ',');
        updateModel[5].value = String(doorLeave!.mdf_30).replace('.', ',');
        updateModel[6].value = String(doorLeave!.mdf_6_comum_2_qualidade).replace('.', ',');
        updateModel[7].value = String(doorLeave!.mdf_3_comum_1_qualidade).replace('.', ',');

        return updateModel;
      })

      setModelTwo((prevModel) => {
        const updateModel = [...prevModel];

        updateModel[0].value = String(doorLeave!.mdf_3_comum_2_qualidade).replace('.', ',');
        updateModel[1].value = String(doorLeave!.mdf_3_berneck).replace('.', ',');
        updateModel[2].value = String(doorLeave!.madeira).replace('.', ',');
        updateModel[3].value = String(doorLeave!.bondoor).replace('.', ',');
        updateModel[4].value = String(doorLeave!.total_mdf_m).replace('.', ',');
        updateModel[5].value = String(doorLeave!.total_mdf_m2_rec).replace('.', ',');
        updateModel[6].value = String(doorLeave!.total_mdf_m2_pintura).replace('.', ',');
        updateModel[7].value = String(doorLeave!.total_mdf_m3).replace('.', ',');

        return updateModel;
      })

      setIsLoading(false);
    }

    getMdf();
  }, [params]);

  const initModelOne = [
      {
        name: 'nome',
        value: '',
        error: '',
      },
      {
        name: 'chave',
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
      },
      {
        name: 'mdf 30',
        value: '',
        error: '',
      },
      {
        name: 'mdf 6 comum 2° qualidade',
        value: '',
        error: '',
      },
      {
        name: 'mdf 3 comum 1° qualidade',
        value: '',
        error: '',
      },
    ];

    const initModelTwo = [
        {
          name: 'mdf 3 comum 2° qualidade',
          value: '',
          error: '',
        },
        {
          name: 'mdf 3 berneck',
          value: '',
          error: '',
        },
        {
          name: 'madeira',
          value: '',
          error: '',
        },
        {
          name: 'bondoor',
          value: '',
          error: '',
        },
        {
          name: 'total mdf m',
          value: '',
          error: '',
        },
        {
          name: 'total mdf m² rec',
          value: '',
          error: '',
        },
        {
          name: 'total mdf m² pintura',
          value: '',
          error: '',
        },
        {
          name: 'total mdf m³',
          value: '',
          error: '',
        }
    ];

    const [pageEdit, setPageEdit] = useState(1);

    const [modelOne, setModelOne] = useState(initModelOne);
    const [modelTwo, setModelTwo] = useState(initModelTwo);

    const cleanFieldsOne = () => {
      setModelOne(initModelOne);
    }

    const cleanFieldsTwo = () => {
      setModelTwo(initModelTwo);
    }

    const changeValuesOne = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setModelOne((prevModel) => {
          const updateModel = [...prevModel];
          updateModel[index].value = e.target.value;
          if (updateModel[index].value === '') {
            updateModel[index].error = `Campo ${modelOne[index].name} obrigatório.`;
          } else {
            updateModel[index].error = '';
          }
          return updateModel;
        });
    }

    const changeValuesTwo = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      setModelTwo((prevModel) => {
        const updateModel = [...prevModel];
        updateModel[index].value = e.target.value;
        if (updateModel[index].value === '') {
          updateModel[index].error = `Campo ${modelTwo[index].name} obrigatório.`;
        } else {
          updateModel[index].error = '';
        }
        return updateModel;
      });
  }

    const validatorOne = (message: string, index: number) => {
        setModelOne((prevModel) => {
          const updateModel = [...prevModel];
          updateModel[index].error = message;
          return updateModel;
        });
    }

    const validatorTwo = (message: string, index: number) => {
      setModelOne((prevModel) => {
        const updateModel = [...prevModel];
        updateModel[index].error = message;
        return updateModel;
      });
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        for (let i=0; i < modelOne.length; i++) {
          if (modelOne[i].value === '') {
            validatorOne(`Campo ${modelOne[i].name} obrigatório.`, i);
          } else {
            validatorOne('', i);
          }
    
          if (modelOne[i].error !== '') {
            return;
          }
        }

        for (let i=0; i < modelTwo.length; i++) {
          if (modelTwo[i].value === '') {
            validatorTwo(`Campo ${modelTwo[i].name} obrigatório.`, i);
          } else {
            validatorTwo('', i);
          }
    
          if (modelTwo[i].error !== '') {
            return;
          }
        }
    
        setIsLoading(true);
    
        editMdfDoorLeave();
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const editMdfDoorLeave = async () => {
        try {
          const response = await putMdfDoorLeaveFindName(resolvedParams.id, modelOne[0].value, modelOne[1].value, parseFloat(modelOne[2].value.replace(',', '.')), parseFloat(modelOne[3].value.replace(',', '.')), parseFloat(modelOne[4].value.replace(',', '.')), parseFloat(modelOne[5].value.replace(',', '.')), parseFloat(modelOne[6].value.replace(',', '.')), parseFloat(modelOne[7].value.replace(',', '.')), parseFloat(modelTwo[0].value.replace(',', '.')), parseFloat(modelTwo[1].value.replace(',', '.')), parseFloat(modelTwo[2].value.replace(',', '.')), parseFloat(modelTwo[3].value.replace(',', '.')), parseFloat(modelTwo[4].value.replace(',', '.')), parseFloat(modelTwo[5].value.replace(',', '.')), parseFloat(modelTwo[6].value.replace(',', '.')), parseFloat(modelTwo[7].value.replace(',', '.')));
    
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
                        onClick={pageEdit === 1 ? cleanFieldsOne : cleanFieldsTwo}
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
                        {pageEdit === 1 ? formFieldsOne.map((value, index: number) => (
                            <TextField
                                key={index}
                                className="w-[49%]"
                                label={value.label} 
                                variant="outlined"
                                type={value.type}
                                error={modelOne[index].error !== '' ? true : false}
                                helperText={modelOne[index].error}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => changeValuesOne(e, index)}
                                value={modelOne[index].value}
                            />
                        )) : formFieldsTwo.map((value, index: number) => (
                          <TextField
                              key={index}
                              className="w-[49%]"
                              label={value.label} 
                              variant="outlined"
                              type={value.type}
                              error={modelTwo[index].error !== '' ? true : false}
                              helperText={modelTwo[index].error}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => changeValuesTwo(e, index)}
                              value={modelTwo[index].value}
                          />
                      ))}
                    </div>
                    <div className="flex flex-row justify-between">
                        {pageEdit === 1 ? (
                          <Button 
                            className="bg-white border-[1px] border-solid border-gray-600 z-[1] text-gray-600 font-semibold w-[200px] h-[56px]"
                            variant="contained"
                            type="button"
                            href="/products"
                          >
                              Cancelar
                          </Button>
                        ) : (
                          <Button 
                            className="bg-white border-[1px] border-solid border-gray-600 z-[1] text-gray-600 font-semibold w-[200px] h-[56px]"
                            variant="contained"
                            type="button"
                            onClick={(e) => {
                              e.preventDefault(); 
                              setPageEdit(pageEdit - 1);
                            }}
                          >
                              Voltar
                          </Button>
                        )}
                        {pageEdit === 1 ? (
                          <Button 
                            type="button"
                            className="bg-primary font-semibold w-[200px] h-[56px] z-[1]"
                            variant="contained"
                            onClick={(e) => {
                              e.preventDefault(); 
                              setPageEdit(pageEdit + 1);
                            }}
                          >
                              Próximo
                          </Button>
                        ) : (
                          <Button 
                              className="bg-primary font-semibold w-[200px] h-[56px] z-[1]"
                              variant="contained"
                              type="submit"
                          >
                              Enviar
                          </Button>
                        )}
                    </div>
                </form>
            </div>
        </Base>
    );
}