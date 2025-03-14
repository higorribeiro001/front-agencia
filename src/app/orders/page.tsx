"use client"

import { Button, Drawer, IconButton, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Visibility, CheckCircle } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import OrdersAdapt from "../service/adapt/OrdersAdapt";
import OrderAdapt from "../service/adapt/OrderAdapt";
import { RowDrawer } from "../components/RowDrawer";
import { DataTable } from "../components/DataTable";
import { DialogApp } from "../components/DialogApp";
import { deleteOrder, order, orderAccordingItem, orderApproved, orderItem, orderObservation, orders } from "../service/api/orders";
import politicaAnalise from '../../data/politica_analise.json';
import ColColor from "../components/ColColor";
import { getCookie } from "cookies-next";

export default function Orders() {
    const [rowsOrder, setRowsOrder] = useState<OrderInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState<number>();
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataOrder, setDataOrder] = useState<OrderInterface>();
    const [openDialog, setOpenDialog] = useState(false);
    const [monthSelected, setMonthSelected] = useState('');
    const [according, setAccording] = useState<{"label": string; "value": string}>({"label": "Todos", "value": ""});
    const role = getCookie("role");
    const [observation, setObservation] = useState('');

    const getOrder = async (id: string) => {
        const dataOrder = await order(id);
        const orderAdapt = new OrderAdapt(dataOrder);

        setOpenDrawer(true);
        setDataOrder(orderAdapt.externalOrderAdapt)
    }

    useEffect(() => {
        const handleAccording = async () => {
            if (according.value !== '') {
                setIsLoading(true);
                const dataOrders = await orderAccordingItem(according.value!);
                const orderAdapt = new OrdersAdapt(dataOrders);

                const ordersData = orderAdapt.externalOrdersAdapt;
                const ordersDataData = ordersData;
                setRowsOrder(ordersDataData.results);
                const numPages = ordersDataData?.count/10;
                setPages(parseInt(numPages.toFixed(0)));
                setIsLoading(false);
            } else {
                getOrders();
            }
        }

        handleAccording();
    }, [according])
      
    const columnsOrder: GridColDef[] = [
        { field: 'num_pedido', headerName: 'N° pedido', flex: 1 },
        { field: 'cliente', headerName: 'Cliente', flex: 3 },
        { field: 'conformidade_desconto', headerName: 'Desconto', flex: 3, renderCell: (params) => {
            const dataCol = params.row.condicoes_comerciais?.analise[1].valor;
            return <ColColor success={politicaAnalise.mensagens_sucesso.includes(dataCol)} approved={params.row.condicoes_comerciais?.analise[1].aprovado} />
        } },
        { field: 'retirada_pagamento', headerName: 'Retirada', flex: 3, renderCell: (params) => {
            const dataCol = params.row.condicoes_comerciais?.analise[2].valor;
            return <ColColor success={politicaAnalise.mensagens_sucesso.includes(dataCol)} approved={params.row.condicoes_comerciais?.analise[2].aprovado} />
        } },
        { field: 'conformidade_frete', headerName: 'Frete', flex: 3, renderCell: (params) => {
            const dataCol = params.row.condicoes_comerciais?.analise[3].valor;
            return <ColColor success={politicaAnalise.mensagens_sucesso.includes(dataCol)} approved={params.row.condicoes_comerciais?.analise[3].aprovado} />
        } },
        { field: 'pos_faturamento', headerName: 'Forma de pagamento', flex: 3, renderCell: (params) => {
            const dataCol = params.row.condicoes_comerciais?.analise[0].valor;
            return <ColColor success={politicaAnalise.mensagens_sucesso.includes(dataCol)} approved={params.row.condicoes_comerciais?.analise[0].aprovado} />
        } },
        { field: 'acao', headerName: 'Ação', flex: 1 , renderCell: (data) => (
            <IconButton onClick={() => getOrder(String(data.id))}>
              <Visibility />
            </IconButton>
        ), },
    ];

    const convertDateDrawer = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('pt-BR');
    }

    let timeout: NodeJS.Timeout;

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeout);
        setIsLoading(true);
        timeout = setTimeout(async () => {
            if (e.target.value !== "") {
                const dataOrders = await orderItem(e.target.value);
                const orderAdapt = new OrdersAdapt(dataOrders);

                const ordersData = orderAdapt.externalOrdersAdapt;
                const ordersDataData = ordersData;
                setRowsOrder(ordersDataData.results);
                setPages(1);
                setIsLoading(false);
            } else {
                getOrders();
            }
        }, 3000);
    }

    const changeValuesSelect = (e: SelectChangeEvent<string>) => {
        setMonthSelected(e.target.value);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setObservation(e.target.value);
    };

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (openDrawer && inputRef.current) {
            inputRef.current.focus();
        }
    }, [openDrawer]);

    const ContentViewOrder = ({dataOrder}: DataOrderInterface) => {
        return (
            <div className="flex flex-col gap-1">
                <h2 className="text-primary text-[25px] font-semibold mb-2">{ dataOrder?.cliente }</h2>
                <RowDrawer
                    keyRow="N° pedido"
                    value={dataOrder?.num_pedido ?? ''}
                />
                <RowDrawer
                    keyRow="Status"
                    value={dataOrder?.status ?? ''}
                />
                <RowDrawer
                    keyRow="Cliente"
                    value={dataOrder?.cliente ?? ''}
                />
                <RowDrawer
                    keyRow="Fantasia"
                    value={dataOrder?.fantasia ?? ''}
                />
                <RowDrawer
                    keyRow="E-mail"
                    value={dataOrder?.email ?? ''}
                />
                <RowDrawer
                    keyRow="Telefone"
                    value={dataOrder?.telefone}
                />
                <RowDrawer
                    keyRow="Representante"
                    value={dataOrder?.representante}
                />
                <RowDrawer
                    keyRow="Forma de pagamento"
                    value={dataOrder?.forma_pagamento}
                />
                <RowDrawer
                    keyRow="Tipo de venda"
                    value={`${dataOrder?.condicoes_comerciais?.tipo_venda}`}
                />
                <RowDrawer
                    keyRow="% desconto"
                    value={`${String((dataOrder?.condicoes_comerciais?.percentual_desconto * 100).toFixed(2)).replace('.', ',')}`}
                />
                <RowDrawer
                    keyRow="% frete"
                    value={`${String((dataOrder?.condicoes_comerciais?.percentual_frete * 100).toFixed(2)).replace('.', ',')}`}
                />
                <div className="flex flex-row gap-3 max-h-[24px]">
                    <RowDrawer
                        keyRow="Análise de desconto"
                        value={`${dataOrder?.condicoes_comerciais?.analise[1].valor}`}
                        color={true}
                        success={politicaAnalise.mensagens_sucesso.includes(dataOrder?.condicoes_comerciais?.analise[1].valor)}
                        approved={dataOrder?.condicoes_comerciais?.analise[1].aprovado}
                    />
                    {role === 'admin' && !dataOrder?.condicoes_comerciais?.analise[1].aprovado && (
                        <IconButton 
                            className="gap-2"
                            onClick={() => approveOrder(dataOrder!.id, dataOrder!.num_pedido, dataOrder?.condicoes_comerciais?.analise[1].id, !dataOrder?.condicoes_comerciais?.analise[1].aprovado)}
                        >
                            <CheckCircle 
                                fontSize="small"
                                color="success" 
                            /> 
                            <Typography 
                                className="font-semibold text-[16px]"
                                color="success"
                            >
                                Aprovar
                            </Typography>
                        </IconButton>
                    )}
                </div>
                <div className="flex flex-row gap-3 max-h-[24px]">
                    <RowDrawer
                        keyRow="Análise de retirada"
                        value={`${dataOrder?.condicoes_comerciais?.analise[2].valor}`}
                        color={true}
                        success={politicaAnalise.mensagens_sucesso.includes(dataOrder?.condicoes_comerciais?.analise[2].valor)}
                        approved={dataOrder?.condicoes_comerciais?.analise[2].aprovado}
                    />
                    {role === 'admin' && !dataOrder?.condicoes_comerciais?.analise[2].aprovado && (
                        <IconButton 
                            className="gap-2"
                            onClick={() => approveOrder(dataOrder!.id, dataOrder!.num_pedido, dataOrder?.condicoes_comerciais?.analise[2].id, !dataOrder?.condicoes_comerciais?.analise[2].aprovado)}
                        >
                            <CheckCircle 
                                fontSize="small"
                                color="success" 
                            /> 
                            <Typography 
                                className="font-semibold text-[16px]"
                                color="success"
                            >
                                Aprovar
                            </Typography>
                        </IconButton>
                    )}
                </div>
                <div className="flex flex-row gap-3 max-h-[24px]">
                    <RowDrawer
                        keyRow="Análise de frete"
                        value={`${dataOrder?.condicoes_comerciais?.analise[3].valor}`}
                        color={true}
                        success={politicaAnalise.mensagens_sucesso.includes(dataOrder?.condicoes_comerciais?.analise[3].valor)}
                        approved={dataOrder?.condicoes_comerciais?.analise[3].aprovado}
                    />
                    {role === 'admin' && !dataOrder?.condicoes_comerciais?.analise[3].aprovado && (
                        <IconButton 
                            className="gap-2"
                            onClick={() => approveOrder(dataOrder!.id, dataOrder!.num_pedido, dataOrder?.condicoes_comerciais?.analise[3].id, !dataOrder?.condicoes_comerciais?.analise[3].aprovado)}
                        >
                            <CheckCircle 
                                fontSize="small"
                                color="success" 
                            /> 
                            <Typography 
                                className="font-semibold text-[16px]"
                                color="success"
                            >
                                Aprovar
                            </Typography>
                        </IconButton>
                    )}
                </div>
                <div className="flex flex-row gap-3 max-h-[24px]">
                    <RowDrawer
                        keyRow="Análise da forma de pagamento"
                        value={`${dataOrder?.condicoes_comerciais?.analise[0].valor}`}
                        color={true}
                        success={politicaAnalise.mensagens_sucesso.includes(dataOrder?.condicoes_comerciais?.analise[0].valor)}
                        approved={dataOrder?.condicoes_comerciais?.analise[0].aprovado}
                    />
                    {role === 'admin' && !dataOrder?.condicoes_comerciais?.analise[0].aprovado && (
                        <IconButton 
                            className="gap-2"
                            onClick={() => approveOrder(dataOrder!.id, dataOrder!.num_pedido, dataOrder?.condicoes_comerciais?.analise[0].id, !dataOrder?.condicoes_comerciais?.analise[0].aprovado)}
                        >
                            <CheckCircle 
                                fontSize="small"
                                color="success" 
                            /> 
                            <Typography 
                                className="font-semibold text-[16px]"
                                color="success"
                            >
                                Aprovar
                            </Typography>
                        </IconButton>
                    )}
                </div>
                <RowDrawer
                    keyRow="Data de emissão"
                    value={ convertDateDrawer(dataOrder?.data_emissao ?? '') }
                />
                <RowDrawer
                    keyRow="Data de validade"
                    value={ convertDateDrawer(dataOrder?.data_validade ?? '') }
                />
                <RowDrawer
                    keyRow="Previsão de embarque"
                    value={ convertDateDrawer(dataOrder?.previsao_embarque ?? '') }
                />
                {dataOrder?.observacao && (
                    <RowDrawer
                        keyRow="Observação"
                        value={ dataOrder?.observacao }
                    />
                )}
                {dataOrder?.responsavel_aprovacao && (
                    <RowDrawer
                        keyRow="Responsável pela aprovação"
                        value={ dataOrder?.responsavel_aprovacao }
                    />
                )}
            </div>
        );
    }

    const getOrders = async () => {
        const dataOrders = await orders(currentPage);
        const ordersAdapt = new OrdersAdapt(dataOrders!);

        const dataOrder = ordersAdapt.externalOrdersAdapt;
        setRowsOrder(dataOrder.results);
        const numPages = dataOrder?.count/10;
        setPages(parseInt(numPages.toFixed(0)));
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        getOrders();
    }, [currentPage])

    const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
    }

    const removeOrder = async (id: string) => {
        const response = await deleteOrder(id);
        if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Excluído com sucesso!');
            setIsSuccess(true);

            setOpenDrawer(false);
            setOpenDialog(false);
            closeAlert();
            getOrders();
        }
    }

    const approveOrder = async (id: string, num: string, id_analise: number, value: boolean) => {
        const response = await orderApproved(num, id_analise, value);
        if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Alteração realizada com sucesso!');
            setIsSuccess(true);
            getOrder(id)

            setOpenDialog(false);
            closeAlert();
            getOrders();
        }
    }

    const observationOrder = async (id: string, num: string, observacao: string) => {
        const response = await orderObservation(num, observacao);
        if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Observação salva com sucesso!');
            setIsSuccess(true);
            getOrder(id)
            setOpenDialog(false);
            closeAlert();
            getOrders();
            setObservation('');
        }
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <Base
            openAlert={openAlert}
            isSuccess={isSuccess}
            messageAlert={messageAlert}
            title="pedidos"
        >
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                disableAutoFocus
                disableEnforceFocus
                className="z-[998]"
            >
                <div className="flex flex-col justify-between gap-4 px-10 py-5 h-full">
                    <DialogApp 
                        isOpen={openDialog}
                        title="Excluir"
                        content="Tem certeza que deseja excluir?"
                        func={() => removeOrder(dataOrder!.id)}
                        handleClose={handleClose}
                    />
                    <ContentViewOrder 
                        dataOrder={dataOrder!}
                    />
                    {role === 'admin' && dataOrder && !dataOrder?.observacao && (
                        <div className="flex flex-col gap-2 justify-start">
                            <TextField
                                className="w-full"
                                label="Observação" 
                                variant="outlined"
                                type="text"
                                onChange={handleChange}
                                value={observation}
                                inputRef={inputRef}
                            />
                            <Button 
                                className="bg-primary font-semibold w-[200px] h-[56px] z-[1]"
                                variant="contained"
                                type="button"
                                onClick={() => observationOrder(dataOrder.id, dataOrder.num_pedido, observation)}
                                sx={{bgcolor: "#055226"}}
                            >
                                Enviar
                            </Button>
                        </div>
                    )}
                    <footer className="flex flex-row justify-between gap-3">
                        {/* <IconButton 
                            className="gap-2"
                            href={"/orders/edit/"+dataOrder?.id}
                        >
                            <Edit 
                                fontSize="small"
                                color="success" 
                            /> 
                            <Typography 
                                className="font-semibold text-[16px]"
                                color="success"
                            >
                                Editar
                            </Typography>
                        </IconButton> */}
                        <IconButton 
                            className="gap-2"
                            href={"/orders/view/"+dataOrder?.id}
                        >
                            <Visibility 
                                fontSize="small"
                                color="success" 
                            /> 
                            <Typography 
                                className="font-semibold text-[16px]"
                                color="success"
                            >
                                Ver mais
                            </Typography>
                        </IconButton>
                    </footer>
                </div>
            </Drawer>
            <div className="transition-all h-full">
                <div className="animate-fade-up">
                    <DataTable 
                        title="Lista de Pedidos"
                        handleSearch={handleSearch} 
                        rows={rowsOrder} 
                        columns={columnsOrder} 
                        isLoading={isLoading} 
                        pages={pages}     
                        hrefRegister="/orders/register" 
                        handleCurrentPage={setCurrentPage}  
                        monthFilter={true} 
                        valueMonthFilter={monthSelected}
                        funcMonthFilter={changeValuesSelect}
                        according={according}
                        setAccording={setAccording}
                    />
                </div>
            </div>
        </Base>
    );
}