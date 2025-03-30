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
// import { getCookie } from "cookies-next";
import UserAdapt from "../service/adapt/UserAdapt";
import { deleteUser, user, userFindByName, users } from "../service/api/user";
import UsersAdapt from "../service/adapt/UsersAdapt";

export default function Users() {
    const [rowsUser, setRowsUser] = useState<UserInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState<number>();
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataUser, setDataUser] = useState<UserInterface>();
    const [openDialog, setOpenDialog] = useState(false);
    const [monthSelected, setMonthSelected] = useState('');
    const [according, setAccording] = useState<{"label": string; "value": string}>({"label": "Todos", "value": ""});
    // const role = getCookie("role");

    const getUser = async (id: string) => {
        const dataUser = await user(id);
        const userAdapt = new UserAdapt(dataUser!);

        setOpenDrawer(true);
        setDataUser(userAdapt.externalUserAdapt)
    }

    // const convertDate = (isoDate: string) => {
    //     const [year, month, day] = isoDate.split('-');
    //     return `${day}/${month}/${year}`;
    // }
      
    const columnsUser: GridColDef[] = [
        { field: 'name', headerName: 'Nome', flex: 3 },
        { field: 'email', headerName: 'E-mail', flex: 2 },
        { field: 'phone', headerName: 'Telefone', flex: 2 },
        { field: 'role', headerName: 'Papel', flex: 2 },
        { field: 'ativo', headerName: 'Status', flex: 1, renderCell: (params) => {
            return <ColColor message={params.value ? 'ativo' : 'inativo'} />
        } },
        { field: 'acao', headerName: 'Ação', flex: 1 , renderCell: (data) => (
            <IconButton onClick={() => getUser(String(data.row.id))}>
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
                const dataUsers = await userFindByName(e.target.value);

                const userData = dataUsers;
                setRowsUser(userData);
                setPages(1);
                setIsLoading(false);
            } else {
                getUsers();
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

    const ContentViewUser = ({dataUser}: DataUserInterface) => {
        return (
            <div className="flex flex-col gap-1">
                <h2 className="text-primary text-[25px] font-semibold mb-2">{ dataUser?.name ?? '' }</h2>
                <RowDrawer
                    keyRow="E-mail"
                    value={dataUser?.email ?? ''}
                />
                <RowDrawer
                    keyRow="Telefone"
                    value={dataUser?.phone ?? ''}
                />
                <RowDrawer
                    keyRow="Papel"
                    value={dataUser?.role ?? ''}
                />
                <RowDrawer
                    keyRow="Status"
                    value={dataUser?.ativo ? 'ativo' : 'inativo'}
                />
                <RowDrawer
                    keyRow="Data de criação"
                    value={convertDateDrawer(dataUser?.created_at)}
                />
                <RowDrawer
                    keyRow="Data de edição"
                    value={convertDateDrawer(dataUser?.updated_at)}
                />
            </div>
        );
    }

    const getUsers = async () => {
        const dataUser = await users(currentPage);
        const usersAdapt = new UsersAdapt(dataUser!);

        const dataUserAdapt = usersAdapt.externalUsersAdapt;

        setRowsUser(dataUserAdapt?.data);
        const numPages = dataUser?.last_page;
        setPages(numPages);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        getUsers();
    }, [currentPage]);

    const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
    }

    const removeUser = async (id: string) => {
        const response = await deleteUser(id);
        if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Excluído com sucesso!');
            setIsSuccess(true);

            setOpenDrawer(false);
            setOpenDialog(false);
            closeAlert();
            getUsers();
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
            title="Usuários"
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
                        func={() => removeUser(dataUser!.id)}
                        handleClose={handleClose}
                    />
                    <ContentViewUser 
                        dataUser={dataUser!}
                    />
                    {/* {role === 'admin' && dataUser && !dataUser?.observacao && (
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
                                onClick={() => observationOrder(dataUser.id, dataUser.num_pedido, observation)}
                                sx={{bgcolor: "#FB3A04"}}
                            >
                                Enviar
                            </Button>
                        </div>
                    )} */}
                    <footer className="flex flex-row justify-between gap-3">
                        <IconButton 
                            className="gap-2"
                            href={"/users/edit/"+dataUser?.id}
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
                        title="Lista de Usuários"
                        handleSearch={handleSearch} 
                        rows={rowsUser} 
                        columns={columnsUser} 
                        isLoading={isLoading} 
                        pages={pages}     
                        hrefRegister="/users/register" 
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