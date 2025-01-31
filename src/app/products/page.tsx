"use client"

import { Box, Drawer, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { Base } from "../components/Base/layout";
import { Breadcrumb } from "../components/Breadcrumb";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { deleteMdfDoorLeave, mdfDoorLeave, mdfDoorLeaveFindName, mdfDoorLeaves } from "../service/api/mdfDoorLeaves";
import MdfDoorLeavesAdapt from "../service/adapt/MdfDoorLeavesAdapt";
import MdfDoorLeaveAdapt from "../service/adapt/MdfDoorLeaveAdapt";
import { RowDrawer } from "../components/RowDrawer";
import { getCookie } from "cookies-next";
import { DataTable } from "../components/DataTable";
import { DataMdfDoorLeaveInterface, MdfDoorLeaveInterface, TabPanelProps } from "@/data/types";
import { DialogApp } from "../components/DialogApp";

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ py: 4, gap: 4 }}>{children}</Box>}
      </div>
    );
}

export default function Products() {
    const role = getCookie('role');

    const breadcrumbOptions = [
        {
            page: 'Kit de Porta',
            current: true,
            href: '/products'
        }
    ];

    const tabOptions = [
        {
            label: 'MDF',
            value: 0
        },
        {
            label: 'COLA',
            value: 1
        },
        {
            label: 'PINTURA',
            value: 2
        },
        {
            label: 'EMBALAGEM',
            value: 3
        },
        {
            label: 'PALLET',
            value: 4
        },
        {
            label: 'BORRACHA BATENTE',
            value: 5
        }
    ];

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [rowsMdfDoorLeaves, setRowsMdfDoorLeaves] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataMdfDoorLeave, setDataMdfDoorLeave] = useState<MdfDoorLeaveInterface>();
    const [openDialog, setOpenDialog] = useState(false);

    const getMdfDoorLeave = async (id: string) => {
        const dataMdfDoorLeave = await mdfDoorLeave(id);
        const mdfDoorLeaveAdapt = new MdfDoorLeaveAdapt(dataMdfDoorLeave);

        setOpenDrawer(true);
        setDataMdfDoorLeave(mdfDoorLeaveAdapt.externalMdfDoorLeaveAdapt)
    }
      
    const columnsMdfDoorLeaves: GridColDef[] = [
        { field: 'nome', headerName: 'Nome', width: 180 },
        { field: 'chave', headerName: 'Chave', width: 200 },
        { field: 'largura', headerName: 'Largura', width: 80 },
        { field: 'altura', headerName: 'Altura', width: 80 },
        { field: 'sarrafo', headerName: 'Sarrafo', width: 80 },
        { field: 'madeira', headerName: 'Madeira', width: 150 },
        { field: 'bondoor', headerName: 'Bondoor', width: 150 },
        { field: 'total_mdf_m', headerName: 'Total MDF (m)', width: 150 },
        { field: 'total_mdf_m3', headerName: 'Total MDF (m³)', width: 150 },
        { field: 'acao', headerName: 'Ação', width: 60 , renderCell: (data) => (
            <IconButton onClick={() => getMdfDoorLeave(String(data.id))}>
              <Visibility />
            </IconButton>
          ), },
    ];

    const convertDate = (isoDate: string) => {
        const date = new Date(isoDate);

        return date.toLocaleDateString('pt-BR');
    }

    let timeout: NodeJS.Timeout;

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeout);
        setIsLoading(true);
        
        timeout = setTimeout(async () => {
            const dataMdfDoorLeaves = await mdfDoorLeaveFindName(e.target.value);
            const mdfAdapt = new MdfDoorLeavesAdapt(dataMdfDoorLeaves!);

            const doorLeaves = mdfAdapt.externalMdfDoorLeavesAdapt;
            setRowsMdfDoorLeaves(doorLeaves?.data ?? []);
            setPages(doorLeaves?.last_page ?? 0);
            setCurrentPage(doorLeaves?.last_page ?? 0);
            setIsLoading(false);
        }, 3000);
    }

    const ContentViewMdfDoorLeave = ({dataMdfDoorLeave}: DataMdfDoorLeaveInterface) => {
        return (
            <div className="flex flex-col gap-1">
                <h2 className="text-primary text-[25px] font-semibold mb-2">{ dataMdfDoorLeave?.nome }</h2>
                <RowDrawer
                    keyRow="Chave"
                    value={dataMdfDoorLeave?.chave ?? ''}
                />
                <RowDrawer
                    keyRow="Largura"
                    value={dataMdfDoorLeave?.largura ?? ''}
                />
                <RowDrawer
                    keyRow="Altura"
                    value={dataMdfDoorLeave?.altura ?? ''}
                />
                <RowDrawer
                    keyRow="Sarrafo"
                    value={dataMdfDoorLeave?.sarrafo ?? ''}
                />
                <RowDrawer
                    keyRow="MDF 30"
                    value={dataMdfDoorLeave?.mdf_30 ?? ''}
                />
                <RowDrawer
                    keyRow="MDF 6 comum (2° qualidade)"
                    value={dataMdfDoorLeave?.mdf_6_comum_2_qualidade ?? ''}
                />
                <RowDrawer
                    keyRow="MDF 3 comum (1° qualidade)"
                    value={dataMdfDoorLeave?.mdf_3_comum_1_qualidade ?? ''}
                />
                <RowDrawer
                    keyRow="MDF 3 comum (2° qualidade)"
                    value={dataMdfDoorLeave?.mdf_3_comum_2_qualidade ?? ''}
                />
                <RowDrawer
                    keyRow="MDF 3 Berneck"
                    value={dataMdfDoorLeave?.mdf_3_berneck ?? ''}
                />
                <RowDrawer
                    keyRow="Madeira"
                    value={dataMdfDoorLeave?.madeira ?? ''}
                />
                <RowDrawer
                    keyRow="Bondoor"
                    value={dataMdfDoorLeave?.bondoor ?? ''}
                />
                <RowDrawer
                    keyRow="Total MDF (m)"
                    value={dataMdfDoorLeave?.total_mdf_m ?? ''}
                />
                <RowDrawer
                    keyRow="Total MDF (m²)_Rec"
                    value={dataMdfDoorLeave?.total_mdf_m2_rec ?? ''}
                />
                <RowDrawer
                    keyRow="Total MDF (m²)"
                    value={dataMdfDoorLeave?.total_mdf_m2_pintura ?? ''}
                />
                <RowDrawer
                    keyRow="Total MDF (m³)"
                    value={dataMdfDoorLeave?.total_mdf_m3 ?? ''}
                />
                <RowDrawer
                    keyRow="Data de criação"
                    value={ convertDate(dataMdfDoorLeave?.created_at ?? '') }
                />
                <RowDrawer
                    keyRow="Data de edição"
                    value={ convertDate(dataMdfDoorLeave?.updated_at ?? '') }
                />
            </div>
        );
    }

    const getMdf = async () => {
        const dataMdfDoorLeaves = await mdfDoorLeaves(currentPage);
        const mdfAdapt = new MdfDoorLeavesAdapt(dataMdfDoorLeaves!);

        const doorLeaves = mdfAdapt.externalMdfDoorLeavesAdapt;
        setRowsMdfDoorLeaves(doorLeaves?.data ?? []);
        setPages(doorLeaves?.last_page ?? 0);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        getMdf();
    }, [currentPage])

    const removeMdfDoomLeave = async (id: string) => {
        const response = await deleteMdfDoorLeave(id);
        if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('Excluído com sucesso!');
            setIsSuccess(true);

            setOpenDrawer(false);
            getMdf();
        }
    }

    const handleDialog = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <Base
            openAlert={openAlert}
            isSuccess={isSuccess}
            messageAlert={messageAlert}
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
                        func={() => removeMdfDoomLeave(dataMdfDoorLeave!.id)}
                        handleClose={handleClose}
                    />
                    <ContentViewMdfDoorLeave 
                        dataMdfDoorLeave={dataMdfDoorLeave!}
                    />
                    {role === 'admin' && <footer className="flex flex-row justify-between gap-3">
                        <IconButton 
                            className="gap-2"
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
                        <IconButton 
                            className="gap-2"
                            onClick={handleDialog}
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
                        </IconButton>
                    </footer>}
                </div>
            </Drawer>
            <div>
                <Breadcrumb 
                    options={breadcrumbOptions}
                />
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        sx={{ "& .MuiTabs-indicator": { backgroundColor: "#02521F" } }}
                    >
                        {tabOptions.map((value, index) => (
                            <Tab 
                                key={index}
                                value={value.value} 
                                label={value.label}
                                sx={{ color: "gray", "&.Mui-selected": { color: "#02521F" } }} 
                            />
                        ))}
                    </Tabs>
                </Box>
                <CustomTabPanel 
                    value={value} 
                    index={0}
                >
                    <DataTable 
                        handleSearch={handleSearch} 
                        rows={rowsMdfDoorLeaves} 
                        columns={columnsMdfDoorLeaves} 
                        isLoading={isLoading} 
                        pages={pages}     
                        hrefRegister="/products/register-door-leave" 
                        handleCurrentPage={setCurrentPage}   
                    />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Item Two
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={5}>
                    Item Three
                </CustomTabPanel>
            </div>
        </Base>
    );
}