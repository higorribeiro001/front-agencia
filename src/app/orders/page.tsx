"use client"

import { Drawer, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Visibility, Edit } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import OrdersAdapt from "../service/adapt/OrdersAdapt";
import OrderAdapt from "../service/adapt/OrderAdapt";
import { RowDrawer } from "../components/RowDrawer";
import { DataTable } from "../components/DataTable";
import { DialogApp } from "../components/DialogApp";
import { deleteOrder, order, orders } from "../service/api/orders";

export default function Orders() {
    const [rowsOrder, setRowsOrder] = useState<OrderInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState(0);
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
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'conforme', headerName: 'Conforme', width: 100, renderCell: (params) => {
            return <div>
                {params.value ? 'Sim' : 'Não'}
            </div>
        }  },
        { field: 'cliente', headerName: 'Cliente', width: 280 },
        { field: 'representante', headerName: 'Representante', width: 260, minWidth: 260 },
        { field: 'resultados', headerName: 'Total pedido venda', width: 160, renderCell: (params) => {
            const total = params.value?.[0]?.total_pedido_venda;
            return <div>
                R$ {total ? String(total.toFixed(2)).replace('.', ',') : ''}
            </div>
        } },
        { field: 'data_emissao', headerName: 'Data de emissão', width: 140, renderCell: (params) => {
            return <div>
                {convertDate(params.value)}
            </div>
        } },
        { field: 'data_validade', headerName: 'Data de validade', width: 140, renderCell: (params) => {
            return <div>
                {convertDate(params.value)}
            </div>
        } },
        { field: 'acao', headerName: 'Ação', width: 60 , renderCell: (data) => (
            <IconButton onClick={() => getOrder(String(data.id))}>
              <Visibility />
            </IconButton>
        ), },
    ];

    const convertDate = (isoDate: string) => {
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    const convertDateDrawer = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('pt-BR');
    }

    let timeout: NodeJS.Timeout;

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeout);
        setIsLoading(true);
        
        timeout = setTimeout(async () => {
            const dataOrders = await order(e.target.value);
            const orderAdapt = new OrderAdapt(dataOrders!);

            const ordersData = orderAdapt.externalOrderAdapt;
            const ordersDataData = ordersData;
            setRowsOrder([ordersDataData]);
            setPages(0);
            setIsLoading(false);
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
                    keyRow="Conforme"
                    value={dataOrder?.conforme ? 'Sim' : 'Não'}
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
                    keyRow="Total pedido venda"
                    value={`R$ ${dataOrder?.resultados?.[0]?.total_pedido_venda.toFixed(2)}`}
                />
                <RowDrawer
                    keyRow="Valor desconto"
                    value={`R$ ${dataOrder?.resultados?.[0]?.valor_desconto_2_porc.toFixed(2)}`}
                />
                <RowDrawer
                    keyRow="Frete"
                    value={`R$ ${dataOrder?.resultados?.[0]?.frete.toFixed(2)}`}
                />
                <RowDrawer
                    keyRow="Data de validade"
                    value={ convertDateDrawer(dataOrder?.data_validade ?? '') }
                />
                <RowDrawer
                    keyRow="Data de emissão"
                    value={ convertDateDrawer(dataOrder?.data_emissao ?? '') }
                />
            </div>
        );
    }

    const getOrders = async () => {
        const dataOrders = await orders(currentPage);
        const ordersAdapt = new OrdersAdapt(dataOrders!);

        const dataOrder = ordersAdapt.externalOrdersAdapt;
        setRowsOrder(dataOrder.results);
        setPages(dataOrder?.count/10);
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
                        <IconButton 
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
                        </IconButton>
                        {/* <IconButton 
                            className="gap-2"
                            onClick={(e) => handleDialog(e)}
                        >
                            <Delete
                                fontSize="small"
                                color="error" 
                            /> 
                            <Typography 
                                className="font-semibold text-[16px]"
                                color="error"
                            >
                                Excluir
                            </Typography>
                        </IconButton> */}
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