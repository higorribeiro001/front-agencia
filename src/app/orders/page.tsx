"use client"

import { Drawer, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Visibility } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import OrdersAdapt from "../service/adapt/OrdersAdapt";
import OrderAdapt from "../service/adapt/OrderAdapt";
import { RowDrawer } from "../components/RowDrawer";
import { DataTable } from "../components/DataTable";
import { DialogApp } from "../components/DialogApp";
import { deleteOrder, order, orderItem, orders } from "../service/api/orders";
import politicaAnalise from '../../data/politica_analise.json';
import ColColor from "../components/ColColor";

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

    const getOrder = async (id: string) => {
        const dataOrder = await order(id);
        const orderAdapt = new OrderAdapt(dataOrder);

        setOpenDrawer(true);
        setDataOrder(orderAdapt.externalOrderAdapt)
    }
      
    const columnsOrder: GridColDef[] = [
        { field: 'num_pedido', headerName: 'N° pedido', width: 90 },
        { field: 'cliente', headerName: 'Cliente', width: 380 },
        { field: 'conformidade_desconto', headerName: 'Desconto', width: 200, renderCell: (params) => {
            const dataCol = params.row.condicoes_comerciais?.conformidade_desconto;
            return <ColColor success={politicaAnalise.mensagens_sucesso.includes(dataCol)} />
        } },
        { field: 'retirada_pagamento', headerName: 'Retirada', width: 200, renderCell: (params) => {
            const dataCol = params.row.condicoes_comerciais?.retirada_pagamento;
            return <ColColor success={politicaAnalise.mensagens_sucesso.includes(dataCol)} />
        } },
        { field: 'conformidade_frete', headerName: 'Frete', width: 200, renderCell: (params) => {
            const dataCol = params.row.condicoes_comerciais?.conformidade_frete;
            return <ColColor success={politicaAnalise.mensagens_sucesso.includes(dataCol)} />
        } },
        { field: 'pos_faturamento', headerName: 'Forma de pagamento', width: 200, renderCell: (params) => {
            const dataCol = params.row.condicoes_comerciais?.pos_faturamento;
            return <ColColor success={politicaAnalise.mensagens_sucesso.includes(dataCol)} />
        } },
        { field: 'acao', headerName: 'Ação', width: 60 , renderCell: (data) => (
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
                <RowDrawer
                    keyRow="Análise de desconto"
                    value={`${dataOrder?.condicoes_comerciais?.conformidade_desconto}`}
                    color={true}
                    success={politicaAnalise.mensagens_sucesso.includes(dataOrder?.condicoes_comerciais?.conformidade_desconto)}
                />
                <RowDrawer
                    keyRow="Análise de retirada"
                    value={`${dataOrder?.condicoes_comerciais?.retirada_pagamento}`}
                    color={true}
                    success={politicaAnalise.mensagens_sucesso.includes(dataOrder?.condicoes_comerciais?.retirada_pagamento)}
                />
                <RowDrawer
                    keyRow="Análise de frete"
                    value={`${dataOrder?.condicoes_comerciais?.conformidade_frete}`}
                    color={true}
                    success={politicaAnalise.mensagens_sucesso.includes(dataOrder?.condicoes_comerciais?.conformidade_frete)}
                />
                <RowDrawer
                    keyRow="Análise da forma de pagamento"
                    value={`${dataOrder?.condicoes_comerciais?.pos_faturamento}`}
                    color={true}
                    success={politicaAnalise.mensagens_sucesso.includes(dataOrder?.condicoes_comerciais?.pos_faturamento)}
                />
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
                    />
                </div>
            </div>
        </Base>
    );
}