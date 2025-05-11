"use client"

import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { Base } from "../../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { Loading } from "@/app/components/Loading";
import { ArrowBack } from "@mui/icons-material";
import { postLogistic } from "@/app/service/api/logistic";
import { unity, unityItems } from "@/app/service/api/unity";
import { sellerItems } from "@/app/service/api/seller";
import { clientItems } from "@/app/service/api/client";
import { routeItems } from "@/app/service/api/routeService";
import { numTransportItems } from "@/app/service/api/numTransport";
import { driverItems } from "@/app/service/api/driver";
import { plateItems } from "@/app/service/api/plate";
import { typeVehicleItems } from "@/app/service/api/typeVehicle";
import status from '../../../data/status.json';
import { getStates } from "@/app/service/api/states";
import { getCities } from "@/app/service/api/cities";
import { categoryItems } from "@/app/service/api/category";

export default function RegisterJuazeiro() {

    const formFields = new FormBuilder()
        .addTextField('data', '* Data', 'date')
        .addTextField('unidade_id', '* Unidade', 'select')
        .addTextField('ov', '* OV', 'text')
        .addTextField('nf', '* NF', 'text')
        .addTextField('valor', '* Valor', 'number')
        .addTextField('vendedor_id', '* Vendedor', 'select')
        .addTextField('cliente_id', '* Cliente', 'select')
        .addTextField('peso_kg', '* Peso (Kg)', 'text')
        .addTextField('estado', '* Estado', 'select')
        .addTextField('cidade', '* Cidade', 'select')
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
    const [states, setStates] = useState<Model[]>([]);
    const [cities, setCities] = useState<Model[]>([]);
    const [part, setPart] = useState(1);

    const getStatesData = async () => {
      const ufs = await getStates() as { sigla: string; nome: string; }[];

      for (let i=0; i<ufs.length; i++) {
        states.push({
          label: ufs[i].sigla,
          value: ufs[i].sigla,
          name: '',
          error: ''
        })
      }

      setStates(states);
    }

    const getCitiesData = async () => {
      const citiesData = await getCities(model[8]?.value) as { nome: string; }[];
      setCities(cities);
      for (let i=0; i<citiesData.length; i++) {
        cities.push({
          label: citiesData[i].nome,
          value: citiesData[i].nome,
          name: '',
          error: ''
        })
      }
    }

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

    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
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

    useEffect(() => {
      getUnities();
      getSellers();
      getClients();
      getCategories();
      getRoutes();
      getNumTransports();
      getDrivers();
      getPlate();
      getTypeVehicle();
      getStatesData();
      getUnitySelected();
    }, []);

    useEffect(() => {
      getCitiesData();
    }, [model[8].value]);

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
    
        registerLogistic();
    
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const registerLogistic = async () => {
        try {
          const response = await postLogistic(
            { 
              data: model[0].value, 
              unidade_id: model[1].value, 
              ov: model[2].value, 
              nf: model[3].value,  
              valor: parseFloat(model[4].value.replace(',', '.')), 
              vendedor_id: model[5].value, 
              cliente_id: model[6].value, 
              peso_kg: parseFloat(model[7].value.replace(',', '.')), 
              cidade: model[9].value, 
              bairro: model[10].value, 
              categoria_id: model[11].value, 
              detalhamento: model[12].value,
              rota_id: model[13].value,
              ordem_entrada: parseInt(model[14].value),
              num_transporte_id: model[15].value,
              motorista_id: model[16].value,
              previsao_saida_carga: model[17].value,
              placa_id: model[18].value,
              tipo_veiculo_id: model[19].value,
              status: model[20].value,
              ocorrencia: model[21].value,
              detalhamento_ocorrencia: model[22].value,
              data_retorno_carga: model[23].value,
            });
    
          if (response.status === 201) {
            setOpenAlert(true);
            setMessageAlert('Registrado com sucesso!');
            setIsSuccess(true);
            cleanFields();
            closeAlert();
            setPart(1);
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

    const changePart = (e: React.MouseEvent<HTMLButtonElement>, value: number) => {
      e.preventDefault();
      setPart(value);
    }

    return (
        <Base 
          title="Cadastro de juazeiro"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
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
                      {formFields
                        .map((value, index) => ({ ...value, originalIndex: index }))
                        .slice(part === 1 ? 0 : 14, part === 1 ? 14 : 24)
                        .map((value) => ( 
                          value.type === 'select' ? (
                            <Autocomplete
                                key={value.originalIndex}
                                disablePortal
                                disabled={value.name === 'unidade_id'}
                                options={value.name === 'categoria_id' && category ? category : value.name === 'unidade_id' && dataUnity ? dataUnity : value.name === 'vendedor_id' && seller ? seller : value.name === 'cliente_id' && client ? client : value.name === 'categoria_id' && category ? category : value.name === 'rota_id' && route ? route : value.name === 'num_transporte_id' && numTransport ? numTransport : value.name === 'motorista_id' && driver ? driver : value.name === 'placa_id' && plate ? plate : value.name === 'tipo_veiculo_id' && typeVehicle ? typeVehicle : value.name === 'status' ? status : value.name === 'estado' ? states : value.name === 'cidade' ? cities : [{ label: 'Aguarde...', value: '' }]}
                                className="w-full lg:w-[49%]"
                                value={model[value.originalIndex]} 
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    setModel((prevModel) => {
                                      const updateModel = [...prevModel];
                                      updateModel[value.originalIndex] = { 
                                        label: newValue.label,
                                        name: updateModel[value.originalIndex].name,
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
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeValues(e, value.originalIndex)} 
                                    value={model[value.originalIndex].value}
                                    error={model[value.originalIndex].error !== '' ? true : false}
                                    helperText={model[value.originalIndex].error}
                                  />
                                }
                              />
                              ) : (
                                <TextField
                                  key={value.originalIndex}
                                  className="w-full lg:w-[49%]"
                                  label={value.label} 
                                  variant="outlined"
                                  type={value.type}
                                  error={model[value.originalIndex].error !== '' ? true : false}
                                  helperText={model[value.originalIndex].error}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => changeValues(e, value.originalIndex)}
                                  value={model[value.originalIndex].value}
                            />
                          )
                      ))}
                  </div>
                  <div className="flex flex-row justify-between gap-2">
                      {part === 1 ? (
                        <Button 
                            className="border-[1px] border-solid font-semibold w-[200px] h-[56px]"
                            variant="contained"
                            type="button"
                            sx={{ bgcolor: 'var(--background)', color: 'var(--black2)', borderColor: 'var(--black2)' }}
                            href="/juazeiro"
                            
                        >
                            Cancelar
                        </Button>
                      ) : (
                        <Button 
                            className="border-[1px] border-solid font-semibold w-[200px] h-[56px]"
                            variant="contained"
                            type="button"
                            sx={{ bgcolor: 'var(--background)', color: 'var(--black2)', borderColor: 'var(--black2)' }}
                            
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => changePart(e, 1)}
                        >
                            Voltar
                        </Button>
                      )}
                      {part === 1 ? (
                        <Button 
                            className="bg-primary font-semibold w-[200px] h-[56px] z-[1]"
                            variant="contained"
                            type="button"
                            
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => changePart(e, 2)}
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