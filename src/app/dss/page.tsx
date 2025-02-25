"use client"

import { Drawer, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Visibility, Edit } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { deleteDss, dss, dssFindName, dsss } from "../service/api/orders";
import DsssAdapt from "../service/adapt/DsssAdapt";
import DssAdapt from "../service/adapt/DssAdapt";
import { RowDrawer } from "../components/RowDrawer";
import { DataTable } from "../components/DataTable";
import { DialogApp } from "../components/DialogApp";
import { DataDssInterface, DssInterface } from "@/data/types";

export default function Dsss() {
    const [rowsDss, setRowsDss] = useState<DssInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataDss, setDataDss] = useState<DssInterface>();
    const [openDialog, setOpenDialog] = useState(false);
    const [monthSelected, setMonthSelected] = useState('');

    const getDss = async (id: string) => {
        const dataDss = await dss(id);
        const dssAdapt = new DssAdapt(dataDss);

        setOpenDrawer(true);
        setDataDss(dssAdapt.externalDssAdapt)
    }

    useEffect(() => {
        const getDssData = async () => {
            getDsss();
            const dataDsss = await dssFindName(monthSelected);
            const dsssAdapt = new DsssAdapt(dataDsss!);

            const dataDss = dsssAdapt.externalDsssAdapt;
            setRowsDss(dataDss.data);
            setPages(dataDss?.last_page ?? 0);
            setIsLoading(false);
        }

        getDssData();
    }, [monthSelected])
      
    const columnsDss: GridColDef[] = [
        { field: 'data_realizacao', headerName: 'Data de Realização', width: 200, renderCell: (params) => {
            const formattedDate = convertDate(params.value);

            return (
                <div>
                  {formattedDate}
                </div>
              );
        } },
        { field: 'matricula', headerName: 'Matrícula', width: 150 },
        { field: 'funcionario', headerName: 'Funcionário', width: 500 , renderCell: (params) => {
            return (
                <div>
                  {params.value.funcionario}
                </div>
              );
        } },
        { field: 'presenca', headerName: 'Presença', width: 190, renderCell: (params) => {
            return (
                <div className="flex justify-center items-center py-[10px]">
                    <div className="flex justify-center items-center font-semibold px-2 w-full" style={params.value ? { backgroundColor: 'green', color: 'white', height: '30px', borderRadius: '4px' } : { backgroundColor: 'red', color: 'white', height: '30px', borderRadius: '4px' }}>
                        <p>{params.value ? 'sim' : 'não'}</p>
                    </div>
                </div>
              );
        } },
        { field: 'created_at', headerName: 'Data de Criação', width: 200, renderCell: (params) => {
            const formattedDate = convertDateDrawer(params.value);

            return (
                <div>
                  {formattedDate}
                </div>
              );
        } },
        { field: 'updated_at', headerName: 'Data de Edição', width: 200, renderCell: (params) => {
            const formattedDate = convertDateDrawer(params.value);

            return (
                <div>
                  {formattedDate}
                </div>
              );
        } },
        { field: 'acao', headerName: 'Ação', width: 60 , renderCell: (data) => (
            <IconButton onClick={() => getDss(String(data.id))}>
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

    const handleSearch = (values: {label: string; value: string; error: string}) => {
        clearTimeout(timeout);
        setIsLoading(true);
        
        if (values) {
            timeout = setTimeout(async () => {
                const dataDsss = await dssFindName(values.value ?? '');
                const dssAdapt = new DsssAdapt(dataDsss!);
    
                const dsssData = dssAdapt.externalDsssAdapt;
                const dsssDataData = dsssData.data;
                setRowsDss(dsssDataData);
                setPages(dsssData?.last_page ?? 0);
                setIsLoading(false);
            }, 1000);
        } else {
            getDsss();
        }
    }

    const changeValuesSelect = (e: SelectChangeEvent<string>) => {
        setMonthSelected(e.target.value);
    }

    const ContentViewDss = ({dataDss}: DataDssInterface) => {
        return (
            <div className="flex flex-col gap-1">
                <h2 className="text-primary text-[25px] font-semibold mb-2">{ dataDss?.funcionario.funcionario }</h2>
                <RowDrawer
                    keyRow="Data de realização"
                    value={convertDateDrawer(dataDss?.data_realizacao ?? '')}
                />
                <RowDrawer
                    keyRow="Matrícula"
                    value={dataDss?.matricula ?? ''}
                />
                <RowDrawer
                    keyRow="Presença"
                    value={dataDss?.presenca ? 'ativo' : 'inativo'}
                />
                <RowDrawer
                    keyRow="Data de criação"
                    value={ convertDateDrawer(dataDss?.created_at ?? '') }
                />
                <RowDrawer
                    keyRow="Data de edição"
                    value={ convertDateDrawer(dataDss?.updated_at ?? '') }
                />
            </div>
        );
    }

    const getDsss = async () => {
        const dataDsss = await dsss(currentPage);
        const dsssAdapt = new DsssAdapt(dataDsss!);

        const dataDss = dsssAdapt.externalDsssAdapt;
        setRowsDss(dataDss.data);
        setPages(dataDss?.last_page ?? 0);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        getDsss();
    }, [currentPage])

    const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
    }

    const removeMdfDoomLeave = async (id: string) => {
        const response = await deleteDss(id);
        if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Excluído com sucesso!');
            setIsSuccess(true);

            setOpenDrawer(false);
            setOpenDialog(false);
            closeAlert();
            getDsss();
        }
    }

    // const handleDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     setOpenDialog(true);
    // }

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <Base
            openAlert={openAlert}
            isSuccess={isSuccess}
            messageAlert={messageAlert}
            title="dss"
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
                        func={() => removeMdfDoomLeave(dataDss!.id)}
                        handleClose={handleClose}
                    />
                    <ContentViewDss 
                        dataDss={dataDss!}
                    />
                    <footer className="flex flex-row justify-between gap-3">
                        <IconButton 
                            className="gap-2"
                            href={"/dss/edit/"+dataDss?.id}
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
                        title="Listagem de DSS"
                        rows={rowsDss} 
                        columns={columnsDss} 
                        isLoading={isLoading} 
                        pages={pages}     
                        hrefRegister="/dss/register" 
                        handleCurrentPage={setCurrentPage}  
                        monthFilter={true} 
                        valueMonthFilter={monthSelected}
                        funcMonthFilter={changeValuesSelect}
                        listDateDss={true}
                        listDateEpi={false}
                        listDateAbsenseWarning={false}
                        handleSearch={()=>{}}
                        handleSearchDss={handleSearch}
                        handleSearchEpi={()=>{}}
                        handleSearchAbsenseWarning={()=>{}}
                    />
                </div>
            </div>
        </Base>
    );
}