"use client"

import { Drawer, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { useEffect, useState } from "react";
import { Visibility, Edit } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import EpisAdapt from "../service/adapt/EpisAdapt";
import EpiAdapt from "../service/adapt/EpiAdapt";
import { RowDrawer } from "../components/RowDrawer";
import { DataTable } from "../components/DataTable";
import { DialogApp } from "../components/DialogApp";
import { DataEpiInterface, EpiInterface } from "@/data/types";
import { deleteEpi, epi, epiFindName, epis } from "../service/api/epi";

export default function Epis() {
    const [rowsEpi, setRowsEpi] = useState<EpiInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataEpi, setDataEpi] = useState<EpiInterface>();
    const [openDialog, setOpenDialog] = useState(false);
    const [monthSelected, setMonthSelected] = useState('');

    const getEpi = async (id: string) => {
        const dataEpi = await epi(id);
        const epiAdapt = new EpiAdapt(dataEpi);

        setOpenDrawer(true);
        setDataEpi(epiAdapt.externalEpiAdapt)
    }

    useEffect(() => {
        const getEpiData = async () => {
            getEpis();
            const dataEpis = await epiFindName(monthSelected);
            const episAdapt = new EpisAdapt(dataEpis!);

            const dataEpi = episAdapt.externalEpisAdapt;
            setRowsEpi(dataEpi.data);
            setPages(dataEpi?.last_page ?? 0);
            setIsLoading(false);
        }

        getEpiData();
    }, [monthSelected])
      
    const columnsEpi: GridColDef[] = [
        { field: 'data_abordagem', headerName: 'Data de Abordagem', width: 200, renderCell: (params) => {
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
        { field: 'conforme', headerName: 'Conforme', width: 190, renderCell: (params) => {
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
            <IconButton onClick={() => getEpi(String(data.id))}>
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
                const dataEpis = await epiFindName(values.value ?? '');
                const epiAdapt = new EpisAdapt(dataEpis!);
    
                const episData = epiAdapt.externalEpisAdapt;
                const episDataData = episData.data;
                setRowsEpi(episDataData);
                setPages(episData?.last_page ?? 0);
                setIsLoading(false);
            }, 1000);
        } else {
            getEpis();
        }
    }

    const changeValuesSelect = (e: SelectChangeEvent<string>) => {
        setMonthSelected(e.target.value);
    }

    const ContentViewEpi = ({dataEpi}: DataEpiInterface) => {
        return (
            <div className="flex flex-col gap-1">
                <h2 className="text-primary text-[25px] font-semibold mb-2">{ dataEpi?.funcionario.funcionario }</h2>
                <RowDrawer
                    keyRow="Data de abordagem"
                    value={convertDateDrawer(dataEpi?.data_abordagem ?? '')}
                />
                <RowDrawer
                    keyRow="Matrícula"
                    value={dataEpi?.matricula ?? ''}
                />
                <RowDrawer
                    keyRow="Conforme"
                    value={dataEpi?.conforme ? 'sim' : 'não'}
                />
                <RowDrawer
                    keyRow="Data de criação"
                    value={ convertDateDrawer(dataEpi?.created_at ?? '') }
                />
                <RowDrawer
                    keyRow="Data de edição"
                    value={ convertDateDrawer(dataEpi?.updated_at ?? '') }
                />
            </div>
        );
    }

    const getEpis = async () => {
        const dataEpis = await epis(currentPage);
        const episAdapt = new EpisAdapt(dataEpis!);

        const dataEpi = episAdapt.externalEpisAdapt;
        setRowsEpi(dataEpi.data);
        setPages(dataEpi?.last_page ?? 0);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        getEpis();
    }, [currentPage])

    const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
    }

    const removeMdfDoomLeave = async (id: string) => {
        const response = await deleteEpi(id);
        if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Excluído com sucesso!');
            setIsSuccess(true);

            setOpenDrawer(false);
            setOpenDialog(false);
            closeAlert();
            getEpis();
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
            title="epi"
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
                        func={() => removeMdfDoomLeave(dataEpi!.id)}
                        handleClose={handleClose}
                    />
                    <ContentViewEpi 
                        dataEpi={dataEpi!}
                    />
                    <footer className="flex flex-row justify-between gap-3">
                        <IconButton 
                            className="gap-2"
                            href={"/epi/edit/"+dataEpi?.id}
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
                        title="Listagem de EPI"
                        rows={rowsEpi} 
                        columns={columnsEpi} 
                        isLoading={isLoading} 
                        pages={pages}     
                        hrefRegister="/epi/register" 
                        handleCurrentPage={setCurrentPage}  
                        monthFilter={true} 
                        valueMonthFilter={monthSelected}
                        funcMonthFilter={changeValuesSelect}
                        listDateDss={false}
                        listDateEpi={true}
                        listDateAbsenseWarning={false}
                        handleSearch={()=>{}}
                        handleSearchDss={()=>{}}
                        handleSearchEpi={handleSearch}
                        handleSearchAbsenseWarning={()=>{}}
                    />
                </div>
            </div>
        </Base>
    );
}