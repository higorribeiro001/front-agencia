"use client"

import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { Base } from "../../../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { Loading } from "@/app/components/Loading";
import { ArrowBack } from "@mui/icons-material";
import status from "@/data/status.json";
import OrderAdapt from "@/app/service/adapt/OrderAdapt";
import { order, putOrder } from "@/app/service/api/orders";

export default function EditOrder({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    
    const formFields = new FormBuilder()
          .addTextField('num_pedido', '* N° pedido', 'text')
          .addTextField('cliente', '* Cliente', 'text')
          .addTextField('fantasia', '* Fantasia', 'text')
          .addTextField('empresa', '* Empresa', 'text')
          .addTextField('cpf_cnpj', '* CPF/CNPJ', 'text')
          .addTextField('telefone', '* Telefone', 'text')
          .addTextField('email', '* E-mail', 'text')
          .addTextField('cep', '* CEP', 'text')
          .addTextField('endereco', '* Endereço', 'text')
          .addTextField('bairro', '* Bairro', 'text')
          .addTextField('city', '* Cidade', 'text')
          .addTextField('uf', '* UF', 'text')
          .addTextField('inscricao_estadual', '* Inscrição Estadual', 'text')
          .addTextField('representante', '* Representante', 'text')
          .addTextField('status', '* Status', 'text')
          .addTextField('conforme', '* Conforme', 'select')
          .addTextField('carga', '* Carga', 'text')
          .addTextField('data_emissao', '* Data emissão', 'date')
          .addTextField('data_validade', '* Data validade', 'date')
          .addTextField('previsao_embarque', '* Previsão embarque', 'date')
          .addTextField('ultima_entrega', '* Última entrega', 'date')
          .addTextField('tipo_venda', '* Tipo venda', 'text')
          .addTextField('forma_pagamento', '* Forma de pagamento', 'text')
          .addTextField('endereco_entrega', '* Endereço de entrega', 'text')
          .addTextField('prazo_entrega', '* Prazo de entrega', 'date')
          .build();
  
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    useEffect(() => {
      setIsLoading(true);
      
      const getOrder = async () => {
        const dataOrder: OrderInterface = await order(resolvedParams.id);
        const orderAdapt = new OrderAdapt(dataOrder);

        const orderData = orderAdapt.externalOrderAdapt;

        setModel((prevModel) => {
          const updateModel = [...prevModel];

          updateModel[0].value = orderData!.num_pedido;
          updateModel[1].value = orderData!.cliente;
          updateModel[2].value = orderData!.fantasia;
          updateModel[3].value = orderData!.empresa;
          updateModel[4].value = orderData!.cpf_cnpj;
          updateModel[5].value = orderData!.telefone;
          updateModel[6].value = orderData!.email;
          updateModel[7].value = orderData!.cep;
          updateModel[8].value = orderData!.endereco;
          updateModel[9].value = orderData!.bairro;
          updateModel[10].value = orderData!.city;
          updateModel[11].value = orderData!.uf;
          updateModel[12].value = orderData!.inscricao_estadual;
          updateModel[13].value = orderData!.representante;
          updateModel[14].value = orderData!.status;
          updateModel[15].label = orderData!.conforme ? 'Sim' : 'Não';
          updateModel[15].value = String(orderData!.conforme);
          updateModel[16].value = orderData!.carga;
          updateModel[17].value = orderData!.data_emissao !== '' ? orderData!.data_emissao : '2025-01-01';
          updateModel[18].value = orderData!.data_validade !== '' ? orderData!.data_validade : '2025-01-01';
          updateModel[19].value = orderData!.ultima_entrega !== '' ? orderData!.ultima_entrega : '2025-01-01';
          updateModel[20].value = orderData!.previsao_embarque !== '' ? orderData!.previsao_embarque : '2025-01-01';
          updateModel[21].value = orderData!.tipo_venda;
          updateModel[22].value = orderData!.forma_pagamento;
          updateModel[23].value = orderData!.endereco_entrega;
          updateModel[24].value = orderData!.prazo_entrega !== '' ? orderData!.prazo_entrega : '2025-01-01';

          return updateModel;
        });

        setIsLoading(false);
      }

      getOrder();
    }, [params]);

    const initModel = [
        {
            name: 'num_pedido',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'cliente',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'fantasia',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'empresa',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'cpf_cnpj',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'telefone',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'email',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'cep',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'endereco',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'bairro',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'city',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'uf',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'inscricao_estadual',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'representante',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'status',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'conforme',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'carga',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'data_emissao',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'data_validade',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'previsao_embarque',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'ultima_entrega',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'tipo_venda',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'forma_pagamento',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'endereco_entrega',
            label: '',
            value: '',
            error: '',
        },
        {
            name: 'prazo_entrega',
            label: '',
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
    
        editOrder();
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const editOrder = async () => {
        try {
          const response = await putOrder(resolvedParams.id, model[0].value, model[1].value, model[2].value, model[3].value, model[4].value, model[5].value, model[6].value, model[7].value, model[8].value, model[9].value, model[10].value, model[11].value, model[12].value, model[13].value, model[14].value, Boolean(model[15].value), model[16].value, model[17].value, model[18].value, model[19].value, model[20].value, model[21].value, model[22].value, model[23].value, model[24].value);
    
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
          title="Edição de Pedidos"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
            <div className="flex flex-col gap-6 w-[85%] h-full z-10 relative">
                <Loading 
                  isOpen={isLoading}
                />
                <div className="flex flex-row justify-between z-10 relative">
                    <IconButton href="/orders">
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
                      {formFields.map((value: {type: string; label: string;}, index: number) => (
                            value.type === 'select' ? (
                                <Autocomplete
                                    key={index}
                                    disablePortal
                                    options={status}
                                    sx={{ width: 300 }}
                                    className="w-[49%]"
                                    value={model[index]} 
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setModel((prevModel) => {
                                          const updateModel = [...prevModel];
                                          updateModel[index] = { 
                                            label: newValue.label,
                                            name: updateModel[index].name,
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
                            href="/orders"
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