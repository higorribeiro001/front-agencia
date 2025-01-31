"use client"

import { Box, Button, Drawer, IconButton, InputAdornment, Pagination, Tab, Tabs, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import { Breadcrumb } from "../components/Breadcrumb";
import React, { useEffect, useState } from "react";
import { Search, Visibility } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { mdfDoorLeave, mdfDoorLeaves } from "../service/api/mdfDoorLeaves";
import MdfDoorLeavesAdapt from "../service/adapt/MdfDoorLeavesAdapt";
import MdfDoorLeaveAdapt from "../service/adapt/MdfDoorLeaveAdapt";

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
    const toggleDrawer =
        (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpenDrawer(open);
    };
    
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

    const [rowsMdfDoorLeaves, setRowsMdfDoorLeaves] = useState<GridRowsProp>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);

    const getMdfDoorLeave = async (id: string) => {
        const dataMdfDoorLeave = await mdfDoorLeave(id);
        const mdfDoorLeaveAdapt = new MdfDoorLeaveAdapt(dataMdfDoorLeave);

        console.log(mdfDoorLeaveAdapt.externalMdfDoorLeaveAdapt)
        toggleDrawer(true);
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

    useEffect(() => {
        setIsLoading(true);
        const getMdf = async () => {
            const dataMdfDoorLeaves = await mdfDoorLeaves(currentPage);
            const mdfAdapt = new MdfDoorLeavesAdapt(dataMdfDoorLeaves!);

            const doorLeaves = mdfAdapt.externalMdfDoorLeavesAdapt;
            setRowsMdfDoorLeaves(doorLeaves?.data ?? []);
            setPages(doorLeaves?.last_page ?? 0);
            setCurrentPage(doorLeaves?.last_page ?? 0);
        }

        getMdf();
        setIsLoading(false);
    }, [])

    return (
        <Base>
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
            >
                <h1>Testeeeeeeeeeeeeeeeeeeeeeeeeeeeee</h1>
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
                <CustomTabPanel value={value} index={0}>
                    <div className="flex flex-col p-4 border gap-4 border-gray-400 rounded">
                        <h2>FOLHA DE PORTA</h2>
                        <div className="flex flex-row gap-4 justify-between">
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="text"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <Search />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                // onChange={(e: ChangeEvent<HTMLInputElement>) => changeValues(e, index)}
                                // value={model[index].value}
                            />
                            <Button 
                                className="bg-primary font-semibold w-[200px] h-[56px]"
                                variant="contained"
                                type="button"
                                href="register-leave"
                            >
                                Cadastrar
                            </Button>
                        </div>
                        <Box sx={{ width: 1 }}>
                            <div className="flex flex-col gap-3 items-end">
                                <DataGrid 
                                    sx={{"& .MuiDataGrid-columnHeaders": {
                                        bgcolor: "#000000",
                                    }}} 
                                    className="w-full"
                                    rows={rowsMdfDoorLeaves} 
                                    columns={columnsMdfDoorLeaves} 
                                    loading={isLoading}
                                    pageSizeOptions={[]} 
                                    hideFooter 
                                    disableColumnMenu 
                                />
                                <Pagination 
                                    count={pages} 
                                    variant="outlined" 
                                    sx={{
                                        "& .MuiPaginationItem-root.Mui-selected": {
                                            backgroundColor: "#02521F", 
                                            color: "#FFFFFF",
                                        },
                                    }}   
                                    shape="rounded" 
                                />
                            </div>
                        </Box>
                    </div>
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