"use client"

import { Drawer, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Visibility, Edit } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { RowDrawer } from "../components/RowDrawer";
import { DataTable } from "../components/DataTable";
import { DialogApp } from "../components/DialogApp";
import { AbsenseWarningInterface, DataAbsenseWarningInterface } from "@/data/types";
import AbsenseWarningAdapt from "../service/adapt/AbsenseWarningAdapt";
import AbsenseWarningsAdapt from "../service/adapt/AbsenseWarningsAdapt";
import { absenseWarning, absenseWarningFindName, absenseWarnings, deleteAbsenseWarning } from "../service/api/absenseWarning";

export default function AbsenceWarnings() {
    const [rowsAbsenseWarning, setRowsAbsenseWarning] = useState<AbsenseWarningInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataAbsenseWarning, setDataAbsenseWarning] = useState<AbsenseWarningInterface>();
    const [openDialog, setOpenDialog] = useState(false);
    const [monthSelected, setMonthSelected] = useState('');

    const getAbsenseWarning = async (id: string) => {
        const dataAbsenseWarning = await absenseWarning(id);
        const absenseWarningAdapt = new AbsenseWarningAdapt(dataAbsenseWarning);

        setOpenDrawer(true);
        setDataAbsenseWarning(absenseWarningAdapt.externalAbsenseWarningAdapt)
    }

    useEffect(() => {
        const getAbsenseWarningData = async () => {
            getAbsenseWarnings();
            const dataAbsenseWarnings = await absenseWarningFindName(monthSelected);
            const absenseWarningsAdapt = new AbsenseWarningsAdapt(dataAbsenseWarnings!);

            const dataAbsenseWarning = absenseWarningsAdapt.externalAbsenseWarningsAdapt;
            setRowsAbsenseWarning(dataAbsenseWarning.data);
            setPages(dataAbsenseWarning?.last_page ?? 0);
            setIsLoading(false);
        }

        getAbsenseWarningData();
    }, [monthSelected])
      
    const columnsAbsenseWarning: GridColDef[] = [
        { field: 'mes', headerName: 'Data', width: 180, renderCell: (params) => {
            const formattedDate = convertDate(params.value);

            return (
                <div>
                  {formattedDate}
                </div>
              );
        } },
        { field: 'matricula', headerName: 'Matrícula', width: 150 },
        { field: 'funcionario', headerName: 'Funcionário', width: 350 , renderCell: (params) => {
            return (
                <div>
                  {params.value.funcionario}
                </div>
              );
        } },
        { field: 'faltas', headerName: 'Faltas', width: 190},
        { field: 'advertencias', headerName: 'Advertências', width: 190},
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
            <IconButton onClick={() => getAbsenseWarning(String(data.id))}>
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
                const dataAbsenseWarnings = await absenseWarningFindName(values.value ?? '');
                const absenseWarningAdapt = new AbsenseWarningsAdapt(dataAbsenseWarnings!);
    
                const absenseWarningsData = absenseWarningAdapt.externalAbsenseWarningsAdapt;
                const absenseWarningsDataData = absenseWarningsData.data;
                setRowsAbsenseWarning(absenseWarningsDataData);
                setPages(absenseWarningsData?.last_page ?? 0);
                setIsLoading(false);
            }, 1000);
        } else {
            getAbsenseWarnings();
        }
    }

    const changeValuesSelect = (e: SelectChangeEvent<string>) => {
        setMonthSelected(e.target.value);
    }

    const ContentViewAbsenseWarning = ({dataAbsenseWarning}: DataAbsenseWarningInterface) => {
        return (
            <div className="flex flex-col gap-1">
                <h2 className="text-primary text-[25px] font-semibold mb-2">{ dataAbsenseWarning?.funcionario.funcionario }</h2>
                <RowDrawer
                    keyRow="Data"
                    value={convertDateDrawer(dataAbsenseWarning?.mes ?? '')}
                />
                <RowDrawer
                    keyRow="Matrícula"
                    value={dataAbsenseWarning?.matricula ?? ''}
                />
                <RowDrawer
                    keyRow="Faltas"
                    value={dataAbsenseWarning?.faltas ?? ''}
                />
                <RowDrawer
                    keyRow="Advertências"
                    value={dataAbsenseWarning?.advertencias ?? ''}
                />
                <RowDrawer
                    keyRow="Data de criação"
                    value={ convertDateDrawer(dataAbsenseWarning?.created_at ?? '') }
                />
                <RowDrawer
                    keyRow="Data de edição"
                    value={ convertDateDrawer(dataAbsenseWarning?.updated_at ?? '') }
                />
            </div>
        );
    }

    const getAbsenseWarnings = async () => {
        const dataAbsenseWarnings = await absenseWarnings(currentPage);
        const absenseWarningsAdapt = new AbsenseWarningsAdapt(dataAbsenseWarnings!);

        const dataAbsenseWarning = absenseWarningsAdapt.externalAbsenseWarningsAdapt;
        setRowsAbsenseWarning(dataAbsenseWarning?.data ?? []);
        setPages(dataAbsenseWarning?.last_page ?? 0);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        getAbsenseWarnings();
    }, [currentPage])

    const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
    }

    const removeMdfDoomLeave = async (id: string) => {
        const response = await deleteAbsenseWarning(id);
        if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Excluído com sucesso!');
            setIsSuccess(true);

            setOpenDrawer(false);
            setOpenDialog(false);
            closeAlert();
            getAbsenseWarnings();
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
            title="Faltas/Advertências"
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
                        func={() => removeMdfDoomLeave(dataAbsenseWarning!.id)}
                        handleClose={handleClose}
                    />
                    <ContentViewAbsenseWarning 
                        dataAbsenseWarning={dataAbsenseWarning!}
                    />
                    <footer className="flex flex-row justify-between gap-3">
                        <IconButton 
                            className="gap-2"
                            href={"/absence-warning/edit/"+dataAbsenseWarning?.id}
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
                        title="Listagem de Faltas/Adervertências"
                        rows={rowsAbsenseWarning} 
                        columns={columnsAbsenseWarning} 
                        isLoading={isLoading} 
                        pages={pages}     
                        hrefRegister="/absence-warning/register" 
                        handleCurrentPage={setCurrentPage}  
                        monthFilter={true} 
                        valueMonthFilter={monthSelected}
                        funcMonthFilter={changeValuesSelect}
                        listDateDss={false}
                        listDateEpi={false}
                        listDateAbsenseWarning={true}
                        handleSearch={()=>{}}
                        handleSearchDss={()=>{}}
                        handleSearchEpi={()=>{}}
                        handleSearchAbsenseWarning={handleSearch}
                    />
                </div>
            </div>
        </Base>
    );
}