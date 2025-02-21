"use client"

import { Drawer, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Visibility, Edit } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { deleteEmployee, employee, employeeFindName, employees } from "../service/api/employees";
import EmployeesAdapt from "../service/adapt/EmployeesAdapt";
import EmployeeAdapt from "../service/adapt/EmployeeAdapt";
import { RowDrawer } from "../components/RowDrawer";
import { DataTable } from "../components/DataTable";
import { DialogApp } from "../components/DialogApp";
import { DataEmployeeInterface, EmployeeInterface } from "@/data/types";

export default function Employees() {
    const [rowsEmployee, setRowsEmployee] = useState<EmployeeInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataEmployee, setDataEmployee] = useState<EmployeeInterface>();
    const [openDialog, setOpenDialog] = useState(false);
    const [monthSelected, setMonthSelected] = useState('');

    const getEmployee = async (id: string) => {
        const dataEmployee = await employee(id);
        const employeeAdapt = new EmployeeAdapt(dataEmployee);

        setOpenDrawer(true);
        setDataEmployee(employeeAdapt.externalEmployeeAdapt)
    }

    useEffect(() => {
        const getEmployeeData = async () => {
            getEmployees();
            const dataEmployees = await employeeFindName(monthSelected);
            const employeeAdapt = new EmployeesAdapt(dataEmployees!);

            const employeesData = employeeAdapt.externalEmployeesAdapt;
            const employeesDataData = employeesData.data;
            setRowsEmployee(employeesDataData);
            setPages(employeesData?.last_page ?? 0);
            setIsLoading(false);
        }

        getEmployeeData();
    }, [monthSelected])
      
    const columnsEmployee: GridColDef[] = [
        { field: 'mes', headerName: 'Mês', width: 120, renderCell: (params) => {
            const formattedDate = convertDate(params.value);

            return (
                <div>
                  {formattedDate}
                </div>
              );
        } },
        { field: 'cod_funcionario', headerName: 'COD', width: 100 },
        { field: 'funcionario', headerName: 'Funcionário', width: 300 },
        { field: 'setor', headerName: 'Setor', width: 190 },
        { field: 'funcao', headerName: 'Função', width: 220 },
        { field: 'categoria', headerName: 'Categoria', width: 190 },
        { field: 'categoria_bonus', headerName: 'Categoria Bônus', width: 190 },
        { field: 'is_active', headerName: 'Status', width: 100, renderCell: (params) => {
            return (
                <div className="flex justify-center items-center py-[10px]">
                    <div className="flex justify-center items-center font-semibold px-2 w-full" style={params.value ? { backgroundColor: 'green', color: 'white', height: '30px', borderRadius: '4px' } : { backgroundColor: 'red', color: 'white', height: '30px', borderRadius: '4px' }}>
                        <p>{params.value ? 'ativo' : 'inativo'}</p>
                    </div>
                </div>
              );
        } },
        { field: 'acao', headerName: 'Ação', width: 60 , renderCell: (data) => (
            <IconButton onClick={() => getEmployee(String(data.id))}>
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
            const dataEmployees = await employeeFindName(e.target.value);
            const employeeAdapt = new EmployeesAdapt(dataEmployees!);

            const employeesData = employeeAdapt.externalEmployeesAdapt;
            const employeesDataData = employeesData.data;
            setRowsEmployee(employeesDataData);
            setPages(employeesData?.last_page ?? 0);
            setIsLoading(false);
        }, 3000);
    }

    const changeValuesSelect = (e: SelectChangeEvent<string>) => {
        setMonthSelected(e.target.value);
    }

    const ContentViewEmployee = ({dataEmployee}: DataEmployeeInterface) => {
        return (
            <div className="flex flex-col gap-1">
                <h2 className="text-primary text-[25px] font-semibold mb-2">{ dataEmployee?.funcionario }</h2>
                <RowDrawer
                    keyRow="Mês"
                    value={convertDate(dataEmployee?.mes ?? '')}
                />
                <RowDrawer
                    keyRow="COD"
                    value={dataEmployee?.cod_funcionario ?? ''}
                />
                <RowDrawer
                    keyRow="Setor"
                    value={dataEmployee?.setor ?? ''}
                />
                <RowDrawer
                    keyRow="Função"
                    value={dataEmployee?.funcao ?? ''}
                />
                <RowDrawer
                    keyRow="Categoria"
                    value={dataEmployee?.categoria ?? ''}
                />
                <RowDrawer
                    keyRow="Categoria Bônus"
                    value={dataEmployee?.categoria_bonus ?? ''}
                />
                <RowDrawer
                    keyRow="Status"
                    value={dataEmployee?.is_active ? 'ativo' : 'inativo'}
                />
                <RowDrawer
                    keyRow="Data de criação"
                    value={ convertDateDrawer(dataEmployee?.created_at ?? '') }
                />
                <RowDrawer
                    keyRow="Data de edição"
                    value={ convertDateDrawer(dataEmployee?.updated_at ?? '') }
                />
            </div>
        );
    }

    const getEmployees = async () => {
        const dataEmployees = await employees(currentPage);
        const employeesAdapt = new EmployeesAdapt(dataEmployees!);

        const dataEmployee = employeesAdapt.externalEmployeesAdapt;
        setRowsEmployee(dataEmployee.data);
        setPages(dataEmployee?.last_page ?? 0);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        getEmployees();
    }, [currentPage])

    const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
    }

    const removeMdfDoomLeave = async (id: string) => {
        const response = await deleteEmployee(id);
        if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Excluído com sucesso!');
            setIsSuccess(true);

            setOpenDrawer(false);
            setOpenDialog(false);
            closeAlert();
            getEmployees();
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
            title="funcionários"
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
                        func={() => removeMdfDoomLeave(dataEmployee!.id)}
                        handleClose={handleClose}
                    />
                    <ContentViewEmployee 
                        dataEmployee={dataEmployee!}
                    />
                    <footer className="flex flex-row justify-between gap-3">
                        <IconButton 
                            className="gap-2"
                            href={"/employees/edit/"+dataEmployee?.id}
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
                        title="Lista de Funcionários"
                        handleSearch={handleSearch} 
                        rows={rowsEmployee} 
                        columns={columnsEmployee} 
                        isLoading={isLoading} 
                        pages={pages}     
                        hrefRegister="/employees/register" 
                        handleCurrentPage={setCurrentPage}  
                        monthFilter={true} 
                        valueMonthFilter={monthSelected}
                        funcMonthFilter={changeValuesSelect}
                        listDateDss={false}
                        listDateEpi={false}
                        listDateAbsenseWarning={false}
                        handleSearchDss={()=>{}}
                        handleSearchEpi={()=>{}}
                        handleSearchAbsenseWarning={()=>{}}
                    />
                </div>
            </div>
        </Base>
    );
}