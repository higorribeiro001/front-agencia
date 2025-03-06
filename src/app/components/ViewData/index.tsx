"use client"

import { styled } from '@mui/material/styles';
import { Button, IconButton, Pagination } from "@mui/material";
import { Base } from "../../components/Base/layout";
import React, { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { postOrder, uploadPhotoItem } from '../../service/api/orders';
import { Loading } from '../../components/Loading';
import RowInfo from '../../components/RowInfo';
import { DataTable } from '../../components/DataTable';
import { GridColDef } from '@mui/x-data-grid';
import { ArrowBack } from '@mui/icons-material';
import ListOrdersAdapt from '@/app/service/adapt/ListOrdersAdapt';
import Image from 'next/image';

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

export default function ViewData({importFile, data, title}: {importFile: boolean; data?: OrderInterface[]; title: string;}) {
    const [fileUpload, setFileUpload] = useState<File[]>([])
    const [imageUpload, setImageUpload] = useState<File>()
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [dataResponse, setDataResponse] = useState<OrderInterface[]>()
    const [currentPage, setCurrentPage] = useState(0);

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
    ];

    const closeAlert = () => {
        setTimeout(() => {
            setOpenAlert(false);
        }, 6000);
    }

    useEffect(() => {
        if (fileUpload.length > 0) {
            const uploadPdf = async () => {
                try {
                    setIsLoading(true);
                    const formData = new FormData();
                    fileUpload.forEach((file) => {
                        formData.append('arquivo_pedido', file);
                    });
                    
                    const response = await postOrder(formData);
            
                    if (response.status === 201) {
                        const orderAdapt = new ListOrdersAdapt(response.data);
                        
                        const orderData = orderAdapt.externalListOrdersAdapt;
                        const orderDataData = orderData;
                        setDataResponse(orderDataData);
    
                        setOpenAlert(true);
                        setMessageAlert('Importação realizada com sucesso com sucesso!');
                        setIsSuccess(true);
                        closeAlert();
                    }
                } catch (e: unknown) {
                    const error = e as ErrorResponse;
                    if (error.response.data.erro === "{'num_pedido': [ErrorDetail(string='pedidos com este num pedido já existe.', code='unique')]}") {
                        setOpenAlert(true);
                        setMessageAlert('Pedido com este número já existe.');
                        setIsSuccess(false);
                    } else {
                        setOpenAlert(true);
                        setMessageAlert('Erro inesperado, por favor aguardo e tente novamente mais tarde.');
                        setIsSuccess(false);
                    }
                    
                    closeAlert();
                } finally {
                    setIsLoading(false);
                }
            }
    
            if (fileUpload !== undefined) {
                uploadPdf();
            }
        }
    }, [fileUpload]);

    useEffect(() => {
        const uploadImage = async () => {
            try {
                setIsLoading(true);
                const formData = new FormData();
                formData.append('foto', imageUpload!);
                
                const response = await uploadPhotoItem(dataResponse![currentPage].num_pedido, formData);
        
                if (response.status === 200) {
                    setOpenAlert(true);
                    setMessageAlert('Importação realizada com sucesso com sucesso!');
                    setIsSuccess(true);
                    closeAlert();
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
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

        if (imageUpload !== undefined) {
            uploadImage();
        }
    }, [imageUpload]);

    const phraseSuccess = 'Está de acordo com a Política de Análise';
    const phraseSuccess2 = 'Está dentro do prazo';
    const phraseExtra = 'Não foi aplicado desconto no total do pedido.';

    const convertDate = (isoDate: string) => {
        if (!isoDate) {
            return '';
        }
        
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

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
                {!importFile && (
                    <div className="flex flex-row w-full justify-between">
                        <IconButton href="/orders">
                            <ArrowBack color="inherit" />
                        </IconButton>
                    </div>
                )}
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
                                    accept=".pdf, application/pdf"
                                    onChange={(event) => setFileUpload(Array.from(event.target.files!))}
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
                    {dataResponse && dataResponse.length && (
                        <div className='gap-5 flex flex-col'>
                            <div className='flex flex-col gap-1 rounded-md shadow-md p-4'>
                                <h2 className='text-primary font-semibold mb-3'>{dataResponse?.[currentPage]?.cliente}</h2>
                                <RowInfo title="Número do Pedido:" info={dataResponse?.[currentPage]?.num_pedido} />
                                <RowInfo title="Status:" info={dataResponse?.[currentPage]?.status} />
                                <RowInfo title="Empresa:" info={dataResponse?.[currentPage]?.empresa} />
                                <RowInfo title="Fantasia:" info={dataResponse?.[currentPage]?.fantasia} />
                                <RowInfo title="Carga:" info={dataResponse?.[currentPage]?.carga} />
                                <RowInfo title="CNPJ/CPF:" info={dataResponse?.[currentPage]?.cpf_cnpj} />
                                <RowInfo title="Email:" info={dataResponse?.[currentPage]?.email} />
                                <RowInfo title="Telefone:" info={dataResponse?.[currentPage]?.telefone} />
                                <RowInfo title="CEP:" info={dataResponse?.[currentPage]?.cep} />
                                <RowInfo title="Endereço:" info={dataResponse?.[currentPage]?.endereco} />
                                <RowInfo title="Bairro:" info={dataResponse?.[currentPage]?.bairro} />
                                <RowInfo title="Cidade:" info={dataResponse?.[currentPage]?.city} />
                                <RowInfo title="UF:" info={dataResponse?.[currentPage]?.uf} />
                            </div>
                            <div className='flex flex-col gap-1 rounded-md shadow-md p-4'>
                                <h2 className='text-primary font-semibold mb-3'>Detalhes:</h2>
                                <RowInfo title="Endereço de entrega:" info={dataResponse?.[currentPage]?.endereco_entrega} />
                                <RowInfo title="Prazo entrega:" info={dataResponse?.[currentPage]?.prazo_entrega} />
                                {Object.keys(dataResponse?.[currentPage]?.info_produto || {}).length > 0 && (
                                    <div>
                                        <h2 className='text-primary font-semibold mb-3'>Detalhes Extras:</h2>
                                        {dataResponse?.[currentPage]?.info_produto.map((value, index) => (
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
                {dataResponse && dataResponse.length && (
                    <div className='flex sm:w-full lg:w-4/6 h-auto flex-col gap-5 rounded-md shadow-md p-4'>
                        <div className="flex flex-col gap-1">
                            <h2 className='text-primary font-semibold mb-3'>{dataResponse?.[currentPage]?.representante}</h2>
                            <RowInfo title="Tipo Venda:" info={dataResponse?.[currentPage]?.condicoes_comerciais?.tipo_venda === '' ? '-' : dataResponse?.[currentPage]?.condicoes_comerciais?.tipo_venda} />
                            <RowInfo title="Forma de pagamento:" info={dataResponse?.[currentPage]?.condicoes_comerciais?.forma_pagamento} />
                            <RowInfo title="Data de emissão:" info={convertDate(dataResponse?.[currentPage]?.data_emissao)} />
                            <RowInfo title="Data de validade:" info={convertDate(dataResponse?.[currentPage]?.data_validade)} />
                            <RowInfo
                                title="Análise de desconto:"
                                info={`${dataResponse?.[currentPage]?.condicoes_comerciais?.conformidade_desconto}`}
                                color={true}
                                success={dataResponse?.[currentPage]?.condicoes_comerciais?.conformidade_desconto === phraseSuccess || dataResponse?.[currentPage]?.condicoes_comerciais?.conformidade_desconto === phraseExtra}
                            />
                            <RowInfo
                                title="Análise de retirada:"
                                info={`${dataResponse?.[currentPage]?.condicoes_comerciais?.retirada_pagamento}`}
                                color={true}
                                success={dataResponse?.[currentPage]?.condicoes_comerciais?.retirada_pagamento === phraseSuccess2}
                            />
                            <RowInfo
                                title="Análise de frete:"
                                info={`${dataResponse?.[currentPage]?.condicoes_comerciais?.conformidade_frete}`}
                                color={true}
                                success={dataResponse?.[currentPage]?.condicoes_comerciais?.conformidade_frete === phraseSuccess}
                            />
                            <RowInfo
                                title="Pós-faturamento:"
                                info={`${dataResponse?.[currentPage]?.condicoes_comerciais?.pos_faturamento}`}
                                color={true}
                                success={dataResponse?.[currentPage]?.condicoes_comerciais?.pos_faturamento === phraseSuccess}
                            />
                            <RowInfo title="% frete:" info={String((dataResponse?.[currentPage]?.condicoes_comerciais?.percentual_frete * 100).toFixed(2)).replace('.', ',')} />
                            <RowInfo title="% desconto:" info={String((dataResponse?.[currentPage]?.condicoes_comerciais?.percentual_desconto * 100).toFixed(2)).replace('.', ',')} />
                            {dataResponse?.[currentPage]?.condicoes_comerciais?.qtd_parcelas > 0 && (
                                <RowInfo title="Parcelas:" info={String(dataResponse?.[currentPage]?.condicoes_comerciais?.qtd_parcelas)} />
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className='text-primary font-semibold mb-3'>Registro fotográfico do empreendimento:</h2>
                            {dataResponse?.[currentPage]?.registro_fotografico_empreendimento && (
                                <Image className='mb-3' width={320} height={300} src={dataResponse?.[currentPage]?.registro_fotografico_empreendimento} alt="Descrição da imagem" />
                            )}
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                className="bg-primary w-[320px]"
                            >
                                Buscar imagem
                                <VisuallyHiddenInput
                                    type="file"
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={(event) => setImageUpload(event.target.files![0])}
                                    multiple
                                />
                            </Button>
                        </div>
                        <DataTable 
                            title="Produtos" 
                            rows={dataResponse?.[currentPage]?.dados_tabela || []} 
                            columns={columnsOrder} 
                            isLoading={isLoading}   
                        />
                        <DataTable 
                            title="Resultados" 
                            rows={dataResponse?.[currentPage]?.resultados || []} 
                            columns={columnsOrderResults} 
                            isLoading={isLoading}   
                        />
                        <Pagination 
                            count={dataResponse.length} 
                            variant="outlined" 
                            sx={{
                                "& .MuiPaginationItem-root.Mui-selected": {
                                    backgroundColor: "#02521F", 
                                    color: "#FFFFFF",
                                },
                            }}   
                            shape="rounded" 
                            onChange={(_, page) => setCurrentPage!(page-1)}
                        />
                    </div>
                )}
            </div>
        </Base>
    );
}