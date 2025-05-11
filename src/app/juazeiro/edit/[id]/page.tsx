"use client"

import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { Base } from "../../../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { Loading } from "@/app/components/Loading";
import { ArrowBack } from "@mui/icons-material";
import status from "@/data/status.json";
import { logistic, putLogistic } from "@/app/service/api/logistic";
import LogisticAdapt from "@/app/service/adapt/LogisticAdapt";
import { unity, unityItems } from "@/app/service/api/unity";
import { categoryItems } from "@/app/service/api/category";
import { sellerItems } from "@/app/service/api/seller";
import { clientItems } from "@/app/service/api/client";
import { routeItems } from "@/app/service/api/routeService";
import { numTransportItems } from "@/app/service/api/numTransport";
import { driverItems } from "@/app/service/api/driver";
import { plateItems } from "@/app/service/api/plate";
import { typeVehicleItems } from "@/app/service/api/typeVehicle";

export default function EditLogistic({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    
    const formFields = new FormBuilder()
        .addTextField('data', '* Data', 'date')
        .addTextField('unidade_id', '* Unidade', 'select')
        .addTextField('ov', '* OV', 'text')
        .addTextField('nf', '* NF', 'text')
        .addTextField('valor', '* Valor', 'number')
        .addTextField('vendedor_id', '* Vendedor', 'select')
        .addTextField('cliente_id', '* Cliente', 'select')
        .addTextField('peso_kg', '* Peso (Kg)', 'text')
        .addTextField('cidade', '* Cidade', 'text')
        .addTextField('bairro', '* Bairro', 'text')
        .addTextField('categoria_id', '* Categoria', 'select')
        .addTextField('detalhamento', '* Detalhamento', 'text')
        .addTextField('rota_id', '* Rota', 'select')
        .addTextField('ordem_entrada', 'Ordem de Entrada', 'text')
        .addTextField('num_transporte_id', 'Nº Transporte', 'select')
        .addTextField('motorista_id', 'Motorista', 'select')
        .addTextField('previsao_saida_carga', 'Previsão de Saída da Carga', 'date')
        .addTextField('placa_id', 'Placa', 'select')
        .addTextField('tipo_veiculo_id', 'Tipo de Veículo', 'select')
        .addTextField('status', 'Status', 'select')
        .addTextField('ocorrencia', 'Ocorrência', 'text')
        .addTextField('detalhamento_ocorrencia', 'Detalhamento Ocorrência', 'text')
        .addTextField('data_retorno_carga', 'Data de Retorno da Carga', 'date')
        .build();

    const [dataUnity, setDataUnity] = useState<Model[]>();
    const [category, setCategory] = useState<Model[]>();
    const [seller, setSeller] = useState<Model[]>();
    const [client, setClient] = useState<Model[]>();
    const [route, setRoute] = useState<Model[]>();
    const [numTransport, setNumTransport] = useState<Model[]>();
    const [driver, setDriver] = useState<Model[]>();
    const [plate, setPlate] = useState<Model[]>();
    const [typeVehicle, setTypeVehicle] = useState<Model[]>();
  
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingInit, setIsLoadingInit] = useState(true);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    const getUnities = async () => {
      const unityData = await unityItems();
      setDataUnity(unityData);
    }

    const getUnitySelected = async () => {
      const unityData = await unity('juazeiro');
      setModel((prevModel) => {
          const updateModel = [...prevModel];
          updateModel[1].label = unityData![0].nome;
          updateModel[1].value = unityData![0].id;

          return updateModel;
      });
    }

    const getCategories = async () => {
      const categoryData = await categoryItems();
      setCategory(categoryData);
    }

    const getSellers = async () => {
      const sellerData = await sellerItems();
      setSeller(sellerData);
    }

    const getClients = async () => {
      const clientData = await clientItems();
      setClient(clientData);
    }

    const getRoutes = async () => {
      const routeData = await routeItems();
      setRoute(routeData);
    }

    const getNumTransports = async () => {
      const numTransportData = await numTransportItems();
      setNumTransport(numTransportData);
    }

    const getDrivers = async () => {
      const driverData = await driverItems();
      setDriver(driverData);
    }

    const getPlate = async () => {
      const plateData = await plateItems();
      setPlate(plateData);
    }

    const getTypeVehicle = async () => {
      const typeVehicleData = await typeVehicleItems();
      setTypeVehicle(typeVehicleData);
    }

    useEffect(() => {
      setIsLoadingInit(true);
      getUnities();
      getSellers();
      getClients();
      getCategories();
      getRoutes();
      getNumTransports();
      getDrivers();
      getPlate();
      getTypeVehicle();
      getUnitySelected();
      setIsLoadingInit(false);
    }, []);

    useEffect(() => {
      setIsLoading(true);
      
      const getLogistic = async () => {
        const dataLogistic: LogisticInterface | undefined = await logistic(resolvedParams.id);
        const orderAdapt = new LogisticAdapt(dataLogistic!);

        const orderData = orderAdapt.externalLogisticAdapt;

        setModel((prevModel) => {
          const updateModel = [...prevModel];

          updateModel[0].value = orderData?.data;
          updateModel[1].label = orderData?.unidade.nome;
          updateModel[1].value = orderData?.unidade_id;
          updateModel[2].value = orderData?.ov;
          updateModel[3].value = orderData?.nf;
          updateModel[4].value = String(orderData?.valor);
          updateModel[5].label = orderData?.vendedor.nome;
          updateModel[5].value = orderData?.vendedor_id;
          updateModel[6].label = orderData?.cliente.nome;
          updateModel[6].value = orderData?.cliente_id;
          updateModel[7].value = String(orderData?.peso_kg);
          updateModel[8].value = orderData?.cidade;
          updateModel[9].value = orderData?.bairro;
          updateModel[10].label = orderData?.categoria.nome;
          updateModel[10].value = orderData?.categoria_id;
          updateModel[11].value = orderData?.detalhamento;
          updateModel[12].label = orderData?.rota.nome;
          updateModel[12].value = orderData?.rota_id;
          updateModel[13].value = String(orderData?.ordem_entrada ?? '');
          updateModel[14].label = orderData?.num_transporte?.nome ?? '';
          updateModel[14].value = orderData?.num_transporte_id ?? '';
          updateModel[15].label = orderData?.motorista?.nome ?? '';
          updateModel[15].value = orderData?.motorista_id ?? '';
          updateModel[16].value = orderData?.previsao_saida_carga ?? '2025-01-01';
          updateModel[17].label = orderData?.placa?.nome ?? '';
          updateModel[17].value = orderData?.placa_id ?? '';
          updateModel[18].label = orderData?.tipo_veiculo?.nome ?? '';
          updateModel[18].value = orderData?.tipo_veiculo_id ?? '';
          updateModel[19].label = orderData?.status ?? '';
          updateModel[19].value = orderData?.status ?? '';
          updateModel[20].value = orderData?.ocorrencia ?? '';
          updateModel[21].value = orderData?.detalhamento_ocorrencia ?? '';
          updateModel[22].value = orderData?.data_retorno_carga ?? '2025-01-01';

          return updateModel;
        });

        setIsLoading(false);
      }

      getLogistic();
    }, [params]);

    const initModel = [
        {
            label: '',
            name: 'data',
            value: '2025-01-01',
            error: '',
        },
        {
            label: '',
            name: 'unidade_id',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'ov',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'nf',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'valor',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'vendedor_id',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'cliente_id',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'peso_kg',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'estado',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'cidade',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'bairro',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'categoria_id',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'detalhamento',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'rota_id',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'ordem_entrada',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'num_transporte_id',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'motorista_id',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'previsao_saida_carga',
            value: '2025-01-01',
            error: '',
        },
        {
            label: '',
            name: 'placa_id',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'tipo_veiculo_id',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'status',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'ocorrencia',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'detalhamento_ocorrencia',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'data_retorno_carga',
            value: '2025-01-01',
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
    
        editLogistic();
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const editLogistic = async () => {
        try {
          const response = await putLogistic(
            { 
              id: resolvedParams.id,
              data: model[0].value, 
              unidade_id: model[1].value, 
              ov: model[2].value, 
              nf: model[3].value,  
              valor: parseFloat(model[4].value.replace(',', '.')), 
              vendedor_id: model[5].value, 
              cliente_id: model[6].value, 
              peso_kg: parseFloat(model[7].value.replace(',', '.')), 
              cidade: model[8].value, 
              bairro: model[9].value, 
              categoria_id: model[10].value, 
              detalhamento: model[11].value,
              rota_id: model[12].value,
              ordem_entrada: parseInt(model[13].value),
              num_transporte_id: model[14].value,
              motorista_id: model[15].value,
              previsao_saida_carga: model[16].value,
              placa_id: model[17].value,
              tipo_veiculo_id: model[18].value,
              status: model[19].value,
              ocorrencia: model[20].value,
              detalhamento_ocorrencia: model[21].value,
              data_retorno_carga: model[22].value,
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
          title="Edição de Juazeiro"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
            {!isLoadingInit && (
              <div className="flex flex-col gap-6 w-full h-full z-10 relative animate-fade-up">
                  <Loading 
                    isOpen={isLoading}
                  />
                  <div className="flex flex-row w-full justify-between z-10 relative">
                      <IconButton href="/juazeiro">
                        <ArrowBack sx={{ color: 'var(--black2)' }} />
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
                                  options={value.name === 'categoria_id' && category ? category : value.name === 'unidade_id' && dataUnity ? dataUnity : value.name === 'vendedor_id' && seller ? seller : value.name === 'cliente_id' && client ? client : value.name === 'categoria_id' && category ? category : value.name === 'rota_id' && route ? route : value.name === 'num_transporte_id' && numTransport ? numTransport : value.name === 'motorista_id' && driver ? driver : value.name === 'placa_id' && plate ? plate : value.name === 'tipo_veiculo_id' && typeVehicle ? typeVehicle : value.name === 'status' ? status : [{ label: 'Aguarde...', value: '' }]}
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
                              className="border-[1px] border-solid font-semibold w-[200px] h-[56px]"
                              variant="contained"
                              type="button"
                              href="/juazeiro"
                              
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
            )}
        </Base>
    );
}