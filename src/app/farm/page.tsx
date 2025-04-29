"use client"

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Autocomplete, Button, Divider, Drawer, IconButton, InputAdornment, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Edit, Search, Visibility } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { RowDrawer } from "../components/RowDrawer";
import { DataTable } from "../components/DataTable";
import { DialogApp } from "../components/DialogApp";
import ColColor from "../components/ColColor";
import LogisticAdapt from "../service/adapt/LogisticAdapt";
import { deleteLogistic, logistic, logisticFindByName, logistics } from "../service/api/logistic";
import LogisticsAdapt from "../service/adapt/LogisticsAdapt";
import { unity } from "../service/api/unity";
import UnityAdapt from "../service/adapt/UnityAdapt";
import { farm, farmFindByName, farms } from "../service/api/farms";
import FarmsAdapt from "../service/adapt/FarmsAdapt";
import FarmAdapt from "../service/adapt/FarmAdapt";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from "next/image";
import TerrainIcon from '@mui/icons-material/Terrain';

export default function Farm() {
    const [rowsFarm, setRowsFarm] = useState<FarmInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [pages, setPages] = useState<number>();
    const [currentPage, setCurrentPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataFarm, setDataFarm] = useState<FarmInterface>();
    const [openDialog, setOpenDialog] = useState(false);
    const [monthSelected, setMonthSelected] = useState('');
    const [according, setAccording] = useState<{"label": string; "value": string}>({"label": "", "value": ""});
    const [unityId, setUnityId] = useState('');

    const getFarm = async (id: string) => {
        const dataFarm = await farm(id);
        const farmAdapt = new FarmAdapt(dataFarm!);

        setOpenDrawer(true);
        setDataFarm(farmAdapt.externalFarmAdapt)
    }

    const getFarms = async () => {
        const dataFarms = await farms(currentPage);
        const farmssAdapt = new FarmsAdapt(dataFarms!);

        const dataFarm = farmssAdapt.externalFarmsAdapt;
        setRowsFarm(dataFarm.results);
        const numPages = dataFarm?.next;
        setPages(numPages);
        setIsLoading(false);
    }

    const convertDate = (isoDate: string) => {
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    let timeout: NodeJS.Timeout;

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeout);
        setIsLoading(true);
        timeout = setTimeout(async () => {
            if (e.target.value !== "") {
                const dataFarms = await farmFindByName(unityId, e.target.value);

                const farmData = dataFarms;
                setRowsFarm(farmData.results);
                setPages(1);
                setIsLoading(false);
            } else {
                getFarms();
            }
        }, 3000);
    }

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (openDrawer && inputRef.current) {
            inputRef.current.focus();
        }
    }, [openDrawer]);

    useEffect(() => {
        setIsLoading(true);

        getFarms();
    }, [currentPage]);

    return (
        <div className="transition-all h-full">
            <div className="animate-fade-left">
                {/* <div className="flex flex-col gap-3">
                    <h1 className="text-[30px] font-semibold text-gray">Fazendas</h1>
                    <Divider />
                </div> */}
                <div className="w-full lg:w-2/3 flex flex-row justify-between gap-5 mb-8">
                    <Autocomplete
                        disablePortal
                        freeSolo
                        options={[]}
                        className="w-4/5"
                        value={according} 
                        onChange={(event, newValue) => {
                            if (newValue) {
                            }
                        }}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                placeholder="pesquise..."
                                value={according}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton>
                                                <Search />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        }
                    />
                    <Button 
                        className="bg-primary text-white font-semibold w-1/5 h-[56px]"
                        variant="contained"
                        type="button"
                        // onClick={funcOpenDialog}
                        style={{background: "#031B17", color: "#FFFFFF"}}
                    >
                        Novo
                    </Button>
                </div>
                <div className="flex flex-wrap gap-3 w-full h-full">
                    <div className="animate-fade-up w-full lg:w-1/3">
                        <Accordion className="p-2">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                <div className="flex flex-row items-center gap-3 overflow-hidden">
                                    <TerrainIcon sx={{ fontSize: '35px' }} />
                                    <h2 className="text-[22px] font-bold truncate whitespace-nowrap overflow-hidden w-[220px] lg:w-full">
                                        Fazenda São Joséeeeeeeeeeeeeeeeeee
                                    </h2>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex flex-row gap-1">
                                        <h3 className="font-semibold">Área (HA):</h3>
                                        <p>210</p>
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <h3 className="font-semibold">Quantidade de animais:</h3>
                                        <p>5000</p>
                                    </div>
                                </div>
                            </AccordionDetails>
                            <AccordionActions>
                                <IconButton 
                                    className="gap-2"
                                >
                                    <Edit 
                                        fontSize="small"
                                        color="inherit" 
                                    /> 
                                    <Typography 
                                        className="font-semibold text-[16px]"
                                        color="inherit"
                                    >
                                        Editar
                                    </Typography>
                                </IconButton>
                            </AccordionActions>
                        </Accordion>
                    </div>
                    <div className="animate-fade-up w-full lg:w-1/3">
                        <Accordion className="p-2">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                <div className="flex flex-row items-center gap-3 overflow-hidden">
                                    <TerrainIcon sx={{ fontSize: '35px' }} />
                                    <h2 className="text-[22px] font-bold truncate whitespace-nowrap overflow-hidden w-[220px] lg:w-full">
                                        Fazenda São Joséeeeeeeeeeeeeeeeeee
                                    </h2>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex flex-row gap-1">
                                        <h3 className="font-semibold">Área (HA):</h3>
                                        <p>210</p>
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <h3 className="font-semibold">Quantidade de animais:</h3>
                                        <p>5000</p>
                                    </div>
                                </div>
                            </AccordionDetails>
                            <AccordionActions>
                                <IconButton 
                                    className="gap-2"
                                >
                                    <Edit 
                                        fontSize="small"
                                        color="inherit" 
                                    /> 
                                    <Typography 
                                        className="font-semibold text-[16px]"
                                        color="inherit"
                                    >
                                        Editar
                                    </Typography>
                                </IconButton>
                            </AccordionActions>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}