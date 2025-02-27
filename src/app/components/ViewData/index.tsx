"use client"

import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
import { Base } from "../../components/Base/layout";
import React, { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { postOrder } from '../../service/api/orders';
import { Loading } from '../../components/Loading';
import OrderAdapt from '../../service/adapt/OrderAdapt';
import RowInfo from '../../components/RowInfo';
import { DataTable } from '../../components/DataTable';
import { GridColDef } from '@mui/x-data-grid';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function ViewData({importFile, data, title}: {importFile: boolean; data?: OrderInterface; title: string;}) {
    const [fileUpload, setFileUpload] = useState<File>()
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [dataResponse, setDataResponse] = useState<OrderInterface>()

    useEffect(() => {
        setDataResponse(data!);
    }, [data])

    const columnsOrder: GridColDef[] = [
        { field: 'produto', headerName: 'Produto', width: 380 },
        { field: 'un', headerName: 'Un', width: 60 },
        { field: 'qtd', headerName: 'Quantidade', width: 100 },
        { field: 'valor_un', headerName: 'Valor Un', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } },
        { field: 'desconto', headerName: 'Desconto', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } },
        { field: 'valor_total', headerName: 'Valor Total', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } }
    ];

    const columnsOrderResults: GridColDef[] = [
        { field: 'total_qtd', headerName: 'Quantidade Kits', width: 100 },
        { field: 'total_qtd_m3', headerName: 'Quantidade m³', width: 100 },
        { field: 'total_produtos', headerName: 'Produtos', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } },
        { field: 'total_st', headerName: 'Total de St', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } },
        { field: 'frete', headerName: 'Frete', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } },
        { field: 'desp_acess', headerName: 'Desp. Acess.', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } },
        { field: 'desconto', headerName: 'Desconto', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } },
        { field: 'total_ipi', headerName: 'Total IPI', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } },
        { field: 'total_pedido_venda', headerName: 'Total Pedido Venda', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } },
        { field: 'valor_desconto_2_porc', headerName: 'Valor c/ Desconto 2%', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } },
        { field: 'valor_pos_6_meses_retirada', headerName: 'Valor c/juros', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } },
        { field: 'valor_frete', headerName: 'Valor Frete', width: 100, renderCell: (params) => {
            return (
                <div>
                    R$ {params.value.toFixed(2).replace('.', ',')}
                </div>
            );
        } }
    ];

    const closeAlert = () => {
        setTimeout(() => {
            setOpenAlert(false);
        }, 6000);
    }

    useEffect(() => {
        const uploadPdf = async () => {
            try {
                setIsLoading(true);
                const formData = new FormData();
                formData.append('arquivo_pedido', fileUpload!)
                formData.append('lista_descontos_montagem', '[]')
                
                const response = await postOrder(formData);
        
                if (response.status === 201) {
                    const orderAdapt = new OrderAdapt(response.data);
                    
                    const orderData = orderAdapt.externalOrderAdapt;
                    const orderDataData = orderData;
                    setDataResponse(orderDataData);

                    setOpenAlert(true);
                    setMessageAlert('Importação realizada com sucesso com sucesso!');
                    setIsSuccess(true);
                    closeAlert();
                }
            } catch {
                setOpenAlert(true);
                setMessageAlert('Erro inesperado, por favor aguardo e tente novamente mais tarde.');
                setIsSuccess(false);
        
                closeAlert();
            } finally {
                setIsLoading(false);
            }
        }

        if (fileUpload !== undefined) {
            uploadPdf();
        }
    }, [fileUpload]);

    return (
        <Base 
            title={title}
            openAlert={openAlert}
            isSuccess={isSuccess}
            messageAlert={messageAlert}
        >
            <div className="w-full animate-fade-up flex flex-wrap gap-5 justify-between mb-8">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="lg:max-w-[400px] sm:w-full flex flex-col gap-5">
                    {importFile && (
                        <form 
                            className='flex flex-col gap-5 rounded-md shadow-md p-4' 
                        >
                            <p className='text-justify'>Importe um arquivo em formato de PDF, você pode clicar no botão abaixo e selecionar o documento desejado.</p>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                className="bg-primary"
                            >
                                Importar arquivo
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(event) => setFileUpload(event.target.files![0])}
                                    multiple
                                />
                            </Button>
                            {/* Agora defina o valor do frete por kit
                            <TextField
                                className="w-full"
                                label="Valor do frete/kit" 
                                variant="outlined"
                                type="number"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFreight(e.target.value)}
                                value={freight}
                            /> */}
                        </form>
                    )}
                    {dataResponse && (
                        <div className='gap-5 flex flex-col'>
                            <div className='flex flex-col gap-1 rounded-md shadow-md p-4'>
                                <h2 className='text-primary font-semibold mb-3'>{dataResponse?.cliente}</h2>
                                <RowInfo title="Número do Pedido:" info={dataResponse?.num_pedido} />
                                <RowInfo title="Status:" info={dataResponse?.status} />
                                <RowInfo title="Conformidade:" info={dataResponse?.conforme ? 'Sim' : 'Não'} />
                                <RowInfo title="Empresa:" info={dataResponse?.empresa} />
                                <RowInfo title="Fantasia:" info={dataResponse?.fantasia} />
                                <RowInfo title="Carga:" info={dataResponse?.carga} />
                                <RowInfo title="CNPJ/CPF:" info={dataResponse?.cpf_cnpj} />
                                <RowInfo title="Email:" info={dataResponse?.email} />
                                <RowInfo title="Telefone:" info={dataResponse?.telefone} />
                                <RowInfo title="CEP:" info={dataResponse?.cep} />
                                <RowInfo title="Endereço:" info={dataResponse?.endereco} />
                                <RowInfo title="Bairro:" info={dataResponse?.bairro} />
                                <RowInfo title="Cidade:" info={dataResponse?.city} />
                                <RowInfo title="UF:" info={dataResponse?.uf} />
                            </div>
                            <div className='flex flex-col gap-1 rounded-md shadow-md p-4'>
                                <h2 className='text-primary font-semibold mb-3'>Detalhes:</h2>
                                <RowInfo title="Observações:" info={dataResponse?.observacoes} />
                                <RowInfo title="Tipo de Venda:" info={dataResponse?.tipo_venda} />
                                <RowInfo title="Forma de pagamento:" info={dataResponse?.forma_pagamento} />
                                <RowInfo title="Endereço de entrega:" info={dataResponse?.endereco_entrega} />
                                <RowInfo title="Prazo entrega:" info={dataResponse?.prazo_entrega} />
                                {Object.keys(dataResponse?.info_produto || {}).length > 0 && (
                                    <div>
                                        <h2 className='text-primary font-semibold mb-3'>Detalhes Extras:</h2>
                                        {dataResponse?.info_produto.map((value, index) => (
                                            <p 
                                                key={index}
                                                className='text-justify'
                                            >{value}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {dataResponse && (
                    <div className='flex sm:w-full lg:w-4/6 h-auto flex-col gap-5 rounded-md shadow-md p-4'>
                        <h2 className='text-primary font-semibold mb-3'>{dataResponse?.representante}</h2>
                        <DataTable 
                            title="Produtos" 
                            rows={dataResponse!.dados_tabela!} 
                            columns={columnsOrder} 
                            isLoading={isLoading}   
                        />
                        <DataTable 
                            title="Resultados" 
                            rows={dataResponse!.resultados!} 
                            columns={columnsOrderResults} 
                            isLoading={isLoading}   
                        />
                    </div>
                )}
            </div>
        </Base>
    );
}