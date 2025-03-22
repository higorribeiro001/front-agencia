"use client"

import { Drawer, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Edit, Visibility } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { RowDrawer } from "../components/RowDrawer";
import { DataTable } from "../components/DataTable";
import { DialogApp } from "../components/DialogApp";
// import { getCookie } from "cookies-next";
import { deleteLogistic } from "../service/api/logistic";
import DataAdapt from "../service/adapt/DataAdapt";
import { DialogRegister } from "../components/DialogRegister";
import DataAdapts from "../service/adapt/DataAdapts";
import { postRoute, putRoute, route, routeFindByName, routes } from "../service/api/route";

export default function Route() {
    const [rowsSeller, setRowsDrawer] = useState<DataInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState<number>();
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataSeller, setDataRouteDrawer] = useState<DataInterface>();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogRegister, setOpenDialogRegister] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [monthSelected, setMonthSelected] = useState('');
    const [according, setAccording] = useState<{"label": string; "value": string}>({"label": "Todos", "value": ""});
    // const role = getCookie("role");
    const [idName, setIdName] = useState('');

    const getRouteDrawer = async (id: string) => {
        const dataRoute = await route(id);
        const routeAdapt = new DataAdapt(dataRoute);

        setOpenDrawer(true);
        setDataRouteDrawer(routeAdapt.externalDataAdapt)
    }

    const initModel = {
        label: '',
        name: 'nome',
        value: '',
        error: '',
    };

    const [model, setModel] = useState(initModel);
      
    const columnsRoute: GridColDef[] = [
        { field: 'nome', headerName: 'Nome', flex: 5 },
        { field: 'created_at', headerName: 'Data de criação', flex: 2, renderCell: (params) => {
            const dataCol = params.value;
            return dataCol ? convertDateDrawer(dataCol) : '-';
        } },
        { field: 'updated_at', headerName: 'Data de edição', flex: 2, renderCell: (params) => {
            const dataCol = params.value;
            return dataCol ? convertDateDrawer(dataCol) : '-';
        } },
        { field: 'acao', headerName: 'Ação', flex: 1 , renderCell: (data) => (
            <IconButton onClick={() => getRouteDrawer(String(data.id))}>
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
                const dataDrawer = await routeFindByName(e.target.value);

                const drawerData = dataDrawer;
                setRowsDrawer(drawerData);
                setPages(1);
                setIsLoading(false);
            } else {
                getDrawer();
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

    const ContentViewRoute = ({dataData}: DataDataInterface) => {
        return (
            <div className="flex flex-col gap-1">
                <h2 className="text-primary text-[25px] font-semibold mb-2">ROTA</h2>
                <RowDrawer
                    keyRow="Nome"
                    value={dataData?.nome ?? ''}
                />
                <RowDrawer
                    keyRow="Data de criação"
                    value={convertDateDrawer(dataData?.created_at)}
                />
                <RowDrawer
                    keyRow="Data de edição"
                    value={convertDateDrawer(dataData?.updated_at)}
                />
            </div>
        );
    }

    const getDrawer = async () => {
        const dataRoutes = await routes(currentPage);
        const categoriesData = new DataAdapts(dataRoutes!);

        const dataRoutesAdapt = categoriesData.externalDataAdapts;
        setRowsDrawer(dataRoutesAdapt?.data);
        const numPages = dataRoutesAdapt?.last_page;
        setPages(numPages);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        getDrawer();
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
            getDrawer();
        }
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleOpenRegister = () => {
        setOpenDialogRegister(true);
    };

    const handleOpenEdit = (id: string) => {
        setOpenDialogEdit(true);
        setIdName(id);
        const getName = async () => {
            const name = await route(id);
            const routeAdapt = new DataAdapt(name);
            setModel((prevModel) => ({
                ...prevModel, 
                value: routeAdapt.externalDataAdapt.nome
            }));
        }

        getName();
    };

    const handleCloseRegister = () => {
        setModel((prevModel) => ({
            ...prevModel, 
            value: ''
        }));
        setOpenDialogRegister(false);
    };

    const handleCloseEdit = () => {
        setModel((prevModel) => ({
            ...prevModel, 
            value: ''
        }));
        setOpenDialogEdit(false);
    };

    const changeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModel((prevModel) => ({
            ...prevModel, 
            value: e.target.value
        }));
    };

    const validator = (message: string) => {
        setModel((prevModel) => {
            const updateModel = prevModel;
            updateModel.error = message;
            return updateModel;
        });
    }

    const submitRegisterRoute = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (model.value === '') {
            validator(`Campo ${model.label} obrigatório.`);
            setOpenAlert(true);
            setMessageAlert('Preencha o nome.');
            setIsSuccess(false);
        } else {
            validator('');
        }

        if (model.error !== '') {
            return;
        }
    
        setIsLoadingRegister(true);
    
        registerRoute();
    
    }
    
    const registerRoute = async () => {
        try {
            const response = await postRoute(
                { 
                    nome: model.value
                }
            );
    
            if (response.status === 201) {
                setOpenAlert(true);
                setMessageAlert('Registrado com sucesso!');
                setIsSuccess(true);
                model.value = '';
                model.error = '';
                closeAlert();
                getDrawer();
                handleCloseRegister();
            }
        } catch (e: unknown) {
            const error = e as StatusResponse;
            if (error.response.status === 422) {
                setOpenAlert(true);
                setMessageAlert('Preencha todos os campos obrigatórios.');
                setIsSuccess(false);
        
                closeAlert();
            } else {
                setOpenAlert(true);
                setMessageAlert('Erro inesperado, por favor aguardo e tente novamente mais tarde.');
                setIsSuccess(false);
        
                closeAlert();
            }
        } finally {
            setIsLoadingRegister(false);
        }
    }

    const submitEditRoute = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (model.value === '') {
            validator(`Campo ${model.label} obrigatório.`);
            setOpenAlert(true);
            setMessageAlert('Preencha o nome.');
            setIsSuccess(false);
        } else {
            validator('');
        }

        if (model.error !== '') {
            return;
        }
    
        setIsLoadingRegister(true);
    
        editRoute();
    
    }
    
    const editRoute = async () => {
        try {
            const response = await putRoute(
            { 
                id: idName,
                nome: model.value
            });
    
            if (response.status === 200) {
                setOpenAlert(true);
                setMessageAlert('Editado com sucesso!');
                setIsSuccess(true);
                model.value = '';
                model.error = '';
                closeAlert();
                getDrawer();
                setOpenDrawer(false);
                handleCloseEdit();
            }
        } catch (e: unknown) {
            const error = e as StatusResponse;
            if (error.response.status === 422) {
                setOpenAlert(true);
                setMessageAlert('Preencha todos os campos obrigatórios.');
                setIsSuccess(false);
        
                closeAlert();
            } else {
                setOpenAlert(true);
                setMessageAlert('Erro inesperado, por favor aguardo e tente novamente mais tarde.');
                setIsSuccess(false);
        
                closeAlert();
            }
        } finally {
            setIsLoadingRegister(false);
        }
    }

    return (
        <Base
            openAlert={openAlert}
            isSuccess={isSuccess}
            messageAlert={messageAlert}
            title="Rotas"
        >
            <DialogApp 
                isOpen={openDialog}
                title="Excluir"
                content="Tem certeza que deseja excluir?"
                func={() => removeLogistic(dataSeller!.id)}
                handleClose={handleClose}
            />
            <DialogRegister 
                isOpen={openDialogRegister}
                title="Cadastro de Rota"
                valueInput={model.value}
                errorInput={model.error}
                funcInput={changeValues}
                funcRegister={submitRegisterRoute}
                handleClose={handleCloseRegister}
                isLoading={isLoadingRegister}
            />
            <DialogRegister 
                isOpen={openDialogEdit}
                title="Edição de Rota"
                valueInput={model.value}
                errorInput={model.error}
                funcInput={changeValues}
                funcRegister={submitEditRoute}
                handleClose={handleCloseEdit}
                isLoading={isLoadingRegister}
            />
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                disableAutoFocus
                disableEnforceFocus
                className="z-[998]"
            >
                <div className="flex flex-col justify-between gap-4 px-10 py-5 h-full">
                    <ContentViewRoute 
                        dataData={dataSeller!}
                    />
                    {/* {role === 'admin' && dataSeller && !dataSeller?.observacao && (
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
                                onClick={() => observationOrder(dataSeller.id, dataSeller.num_pedido, observation)}
                                sx={{bgcolor: "#FB3A04"}}
                            >
                                Enviar
                            </Button>
                        </div>
                    )} */}
                    <footer className="flex flex-row justify-between gap-3">
                        <IconButton 
                            className="gap-2"
                            onClick={() => handleOpenEdit(dataSeller!.id!)}
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
                        title="Lista de rotas"
                        handleSearch={handleSearch} 
                        rows={rowsSeller} 
                        columns={columnsRoute} 
                        isLoading={isLoading} 
                        pages={pages}     
                        funcOpenDialog={handleOpenRegister}
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