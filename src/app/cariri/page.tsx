"use client"

import { Drawer, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Edit, Visibility } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { RowDrawer } from "../components/RowDrawer";
import { DataTable } from "../components/DataTable";
import { DialogApp } from "../components/DialogApp";
import ColColor from "../components/ColColor";
import { getCookie } from "cookies-next";
import LogisticAdapt from "../service/adapt/LogisticAdapt";
import { deleteLogistic, logistic, logistics } from "../service/api/logistic";
import LogisticsAdapt from "../service/adapt/LogisticsAdapt";
import { unity } from "../service/api/unity";
import UnityAdapt from "../service/adapt/UnityAdapt";

export default function Cariri() {
    const [rowsCariri, setRowsCariri] = useState<LogisticInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState<number>();
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataLogistic, setDataLogistic] = useState<LogisticInterface>();
    const [openDialog, setOpenDialog] = useState(false);
    const [monthSelected, setMonthSelected] = useState('');
    const [according, setAccording] = useState<{"label": string; "value": string}>({"label": "Todos", "value": ""});
    const role = getCookie("role");
    const [unityId, setUnityId] = useState('');

    const getLogistic = async (id: string) => {
        const dataUnity = await logistic(id);
        const logisticAdapt = new LogisticAdapt(dataUnity);

        setOpenDrawer(true);
        setDataLogistic(logisticAdapt.externalLogisticAdapt)
    }

    const convertDate = (isoDate: string) => {
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }
      
    const columnsCariri: GridColDef[] = [
        { field: 'data', headerName: 'Data', flex: 1, renderCell: (params) => {
            const dataCol = params.row.data;
            return convertDate(dataCol);
        } },
        { field: 'cliente', headerName: 'Cliente', flex: 2, renderCell: (params) => {
            const dataCol = params.row.cliente?.nome;
            return dataCol;
        } },
        { field: 'vendedor', headerName: 'Vendedor', flex: 2, renderCell: (params) => {
            const dataCol = params.row.vendedor?.nome;
            return dataCol;
        } },
        { field: 'valor', headerName: 'Valor (R$)', flex: 2, renderCell: (params) => {
            const dataCol = params.row.valor;
            return `R$ ${dataCol.toFixed(2).replace('.', ',')}`;
        } },
        { field: 'status', headerName: 'Status', flex: 3, renderCell: (params) => {
            return <ColColor message={params.row.status} />
        } },
        { field: 'acao', headerName: 'Ação', flex: 1 , renderCell: (data) => (
            <IconButton onClick={() => getLogistic(String(data.id))}>
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
                const dataLogistics = await logistic(e.target.value);
                const logisticAdapt = new LogisticAdapt(dataLogistics);

                const logisticData = logisticAdapt.externalLogisticAdapt;
                const logisticDataData = logisticData;
                setRowsCariri([logisticDataData]);
                setPages(1);
                setIsLoading(false);
            } else {
                getLogistics();
            }
        }, 3000);
    }

    const changeValuesSelect = (e: SelectChangeEvent<string>) => {
        setMonthSelected(e.target.value);
    }

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (openDrawer && inputRef.current) {
            inputRef.current.focus();
        }
    }, [openDrawer]);

    const ContentViewLogistic = ({dataLogistic}: DataLogisticInterface) => {
        return (
            <div className="flex flex-col gap-1">
                <h2 className="text-primary text-[25px] font-semibold mb-2">{ dataLogistic?.cliente?.nome }</h2>
                <RowDrawer
                    keyRow="Data"
                    value={convertDateDrawer(dataLogistic?.data) ?? ''}
                />
                <RowDrawer
                    keyRow="OV"
                    value={dataLogistic?.ov ?? ''}
                />
                <RowDrawer
                    keyRow="NF"
                    value={dataLogistic?.nf ?? ''}
                />
                <RowDrawer
                    keyRow="Valor"
                    value={`R$ ${dataLogistic?.valor.toFixed(2).replace('.', ',')}`}
                />
                <RowDrawer
                    keyRow="Vendedor"
                    value={dataLogistic?.vendedor?.nome ?? ''}
                />
                <RowDrawer
                    keyRow="Peso (Kg)"
                    value={dataLogistic?.peso_kg}
                />
                <RowDrawer
                    keyRow="Cidade"
                    value={dataLogistic?.cidade}
                />
                <RowDrawer
                    keyRow="Bairro"
                    value={dataLogistic?.bairro}
                />
                <RowDrawer
                    keyRow="Categoria"
                    value={dataLogistic?.categoria?.nome}
                />
                <RowDrawer
                    keyRow="Detalhamento"
                    value={dataLogistic?.detalhamento}
                />
                <RowDrawer
                    keyRow="Rota"
                    value={dataLogistic?.rota?.nome}
                />
                <RowDrawer
                    keyRow="Ordem de Entrada"
                    value={dataLogistic?.ordem_entrada}
                />
                <RowDrawer
                    keyRow="Nº Transporte"
                    value={dataLogistic?.num_transporte?.nome}
                />
                <RowDrawer
                    keyRow="Previsão de Saída da Carga"
                    value={convertDateDrawer(dataLogistic?.previsao_saida_carga)}
                />
                <RowDrawer
                    keyRow="Placa"
                    value={dataLogistic?.placa?.nome}
                />
                <RowDrawer
                    keyRow="Tipo de Veículo"
                    value={dataLogistic?.tipo_veiculo?.nome}
                />
                <RowDrawer
                    keyRow="Motorista"
                    value={dataLogistic?.motorista?.nome}
                />
                <RowDrawer
                    keyRow="Status"
                    value={dataLogistic?.status}
                />
                <RowDrawer
                    keyRow="Ocorrência"
                    value={dataLogistic?.ocorrencia}
                />
                <RowDrawer
                    keyRow="Detalhamento Ocorrência"
                    value={dataLogistic?.detalhamento_ocorrencia}
                />
                <RowDrawer
                    keyRow="Data Retorno Carga"
                    value={convertDateDrawer(dataLogistic?.data_retorno_carga)}
                />
            </div>
        );
    }

    const getLogistics = async () => {
        const dataUnity = await unity('CARIRI');
        const unityAdapt = new UnityAdapt(dataUnity[0]);

        const dataUnityAdapt = unityAdapt.externalUnityAdapt;

        const dataLogistics = await logistics(currentPage, dataUnityAdapt?.id);
        const logisticsAdapt = new LogisticsAdapt(dataLogistics!);

        const dataLogistic = logisticsAdapt.externalLogisticsAdapt;
        setRowsCariri(dataLogistic.data);
        const numPages = dataLogistic?.last_page;
        setPages(numPages);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        getLogistics();
    }, [currentPage]);

    const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
    }

    const removeLogistic = async (id: string) => {
        const response = await deleteLogistic(id);
        if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Excluído com sucesso!');
            setIsSuccess(true);

            setOpenDrawer(false);
            setOpenDialog(false);
            closeAlert();
            getLogistics();
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
            title="cariri"
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
                        func={() => removeLogistic(dataLogistic!.id)}
                        handleClose={handleClose}
                    />
                    <ContentViewLogistic 
                        dataLogistic={dataLogistic!}
                    />
                    {/* {role === 'admin' && dataLogistic && !dataLogistic?.observacao && (
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
                                onClick={() => observationOrder(dataLogistic.id, dataLogistic.num_pedido, observation)}
                                sx={{bgcolor: "#FB3A04"}}
                            >
                                Enviar
                            </Button>
                        </div>
                    )} */}
                    <footer className="flex flex-row justify-between gap-3">
                        <IconButton 
                            className="gap-2"
                            href={"/cariri/edit/"+dataLogistic?.id}
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
                    </footer>
                </div>
            </Drawer>
            <div className="transition-all h-full">
                <div className="animate-fade-up">
                    <DataTable 
                        title="Logística"
                        handleSearch={handleSearch} 
                        rows={rowsCariri} 
                        columns={columnsCariri} 
                        isLoading={isLoading} 
                        pages={pages}     
                        hrefRegister="/cariri/register" 
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