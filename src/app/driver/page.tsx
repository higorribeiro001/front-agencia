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
import { driver, driverFindByName, drivers, postDriver, putDriver } from "../service/api/driver";

export default function Driver() {
    const [rowsData, setRowsDrawer] = useState<DataInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState<number>();
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataSeller, setDataDriverDrawer] = useState<DataInterface>();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogRegister, setOpenDialogRegister] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [monthSelected, setMonthSelected] = useState('');
    const [according, setAccording] = useState<{"label": string; "value": string}>({"label": "Todos", "value": ""});
    // const role = getCookie("role");
    const [idName, setIdName] = useState('');

    const getDriverDrawer = async (id: string) => {
        const dataDriver = await driver(id);
        const driverAdapt = new DataAdapt(dataDriver!);

        setOpenDrawer(true);
        setDataDriverDrawer(driverAdapt.externalDataAdapt)
    }

    const initModel = {
        label: '',
        name: 'nome',
        value: '',
        error: '',
    };

    const [model, setModel] = useState(initModel);
      
    const columnsDriver: GridColDef[] = [
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
            <IconButton onClick={() => getDriverDrawer(String(data.id))}>
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
                const dataDrawer = await driverFindByName(e.target.value);

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

    const ContentViewDriver = ({dataData}: DataDataInterface) => {
        return (
            <div className="flex flex-col gap-1">
                <h2 className="text-primary text-[25px] font-semibold mb-2">MOTORISTA</h2>
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
        const dataDriver = await drivers(currentPage);
        const categoriesData = new DataAdapts(dataDriver!);

        const dataDriverAdapt = categoriesData.externalDataAdapts;
        setRowsDrawer(dataDriverAdapt?.data);
        const numPages = dataDriverAdapt?.last_page;
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
            const name = await driver(id);
            const driverAdapt = new DataAdapt(name!);
            setModel((prevModel) => ({
                ...prevModel, 
                value: driverAdapt.externalDataAdapt.nome
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

    const submitRegisterDriver = async (e: React.FormEvent<HTMLFormElement>) => {
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
    
        registerDriver();
    
    }
    
    const registerDriver = async () => {
        try {
            const response = await postDriver(
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

    const submitEditDriver = async (e: React.FormEvent<HTMLFormElement>) => {
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
    
        editDriver();
    
    }
    
    const editDriver = async () => {
        try {
            const response = await putDriver(
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
            title="Motoristas"
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
                title="Cadastro de Motorista"
                valueInput={model.value}
                errorInput={model.error}
                funcInput={changeValues}
                funcRegister={submitRegisterDriver}
                handleClose={handleCloseRegister}
                isLoading={isLoadingRegister}
            />
            <DialogRegister 
                isOpen={openDialogEdit}
                title="Edição de Motorista"
                valueInput={model.value}
                errorInput={model.error}
                funcInput={changeValues}
                funcRegister={submitEditDriver}
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
                    <ContentViewDriver
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
                                sx={{bgcolor: "#031B17", color: '#FFFFFF'}}
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
                        title="Lista de Motoristas"
                        handleSearch={handleSearch} 
                        rows={rowsData} 
                        columns={columnsDriver} 
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