import { DataTableInterface, EmployeeLabelInterface } from "@/data/types";
import { Search } from "@mui/icons-material";
import { Autocomplete, Box, Button, IconButton, InputAdornment, MenuItem, Pagination, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ChangeEvent, useEffect, useState } from "react";
import meses from "@/data/meses.json"
import { dateDss } from "@/app/service/api/orders";
import EmployeesLabelAdapt from "@/app/service/adapt/EmployeesLabelAdapt";
import { employeesLabel } from "@/app/service/api/employees";
import { dateEpi } from "@/app/service/api/epi";
import { dateAbsenseWarning } from "@/app/service/api/absenseWarning";

export const DataTable = ({handleSearch, rows, columns, isLoading, pages, hrefRegister, handleCurrentPage, title, monthFilter, valueMonthFilter="", funcMonthFilter, listDateDss, handleSearchDss, listDateEpi, handleSearchEpi, listDateAbsenseWarning, handleSearchAbsenseWarning}: DataTableInterface) => {
    const [dateDssData, setDateDssData] = useState<EmployeeLabelInterface[]>([]);
    const [dateEpiData, setDateEpiData] = useState<EmployeeLabelInterface[]>([]);
    const [dateAbsenseWarningData, setDateAbsenseWarningData] = useState<EmployeeLabelInterface[]>([]);
    const [employeesData, setEmployeesData] = useState<EmployeeLabelInterface[]>();
    
    useEffect(() => {
        if (listDateDss) {
            const getDateDss = async () => {
            const dataDateDss = await dateDss();
            const employeeAdapt = new EmployeesLabelAdapt(dataDateDss!);
                setDateDssData(employeeAdapt.externalEmployeesLabelAdapt);
            }
    
            getDateDss();
        }

        if (listDateEpi) {
            const getDateEpi = async () => {
            const dataDateEpi = await dateEpi();
            const employeeAdapt = new EmployeesLabelAdapt(dataDateEpi!);
                setDateEpiData(employeeAdapt.externalEmployeesLabelAdapt);
            }
    
            getDateEpi();
        }

        if (listDateAbsenseWarning) {
            const getDateAbsenseWarning = async () => {
            const dataDateAbsenseWarning = await dateAbsenseWarning();
            const employeeAdapt = new EmployeesLabelAdapt(dataDateAbsenseWarning!);
                setDateAbsenseWarningData(employeeAdapt.externalEmployeesLabelAdapt);
            }
    
            getDateAbsenseWarning();
        }
    }, []);

    useEffect(() => {
            const getEmployee = async () => {
              const dataEmployee = await employeesLabel();
              const employeeAdapt = new EmployeesLabelAdapt(dataEmployee!);
              setEmployeesData(employeeAdapt.externalEmployeesLabelAdapt);
            }
      
            getEmployee();
        }, []);
    
    const CustomNoRowsOverlay = () => (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>❌ Nenhum dado encontrado!</p>
        </div>
    );
    
    return (
        <div className="flex flex-col p-4 border gap-4 border-gray-400 rounded">
            <h2 className="uppercase">{title}</h2>
            <div className="flex flex-row gap-4 justify-between">
                {listDateDss ? (
                    <Autocomplete
                        disablePortal
                        options={employeesData!}
                        sx={{ width: 300 }}
                        className="w-full"
                        onChange={(event, newValue) => {
                            if (listDateDss) {
                                handleSearchDss(newValue!);
                            }
                        }}
                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                label="" 
                                placeholder="pesquise..."
                                fullWidth
                            />
                        }
                  />
                ) : 
                listDateEpi ? (
                    <Autocomplete
                        disablePortal
                        options={employeesData!}
                        sx={{ width: 300 }}
                        className="w-full"
                        onChange={(event, newValue) => {
                            if (listDateEpi) {
                                handleSearchEpi(newValue!);
                            }
                        }}
                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                label="" 
                                placeholder="pesquise..."
                                fullWidth
                            />
                        }
                    />
                    ) : listDateAbsenseWarning ? (
                        <Autocomplete
                            disablePortal
                            options={employeesData!}
                            sx={{ width: 300 }}
                            className="w-full"
                            onChange={(event, newValue) => {
                                if (listDateAbsenseWarning) {
                                    handleSearchAbsenseWarning(newValue!);
                                }
                            }}
                            isOptionEqualToValue={(option, value) => option?.value === value?.value}
                            renderInput={(params) => 
                                <TextField 
                                    {...params} 
                                    label="" 
                                    placeholder="pesquise..."
                                    fullWidth
                                />
                            }
                        />
                    ) : (
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
                        placeholder="pesquise..."
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
                    />
                )}
                {monthFilter && (
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={valueMonthFilter}
                        label=""
                        displayEmpty
                        className="w-[200px]"
                        onChange={funcMonthFilter}
                        defaultValue=""
                    >
                        <MenuItem disabled value="">
                            Data
                        </MenuItem>
                        {listDateDss ? 
                            dateDssData?.map((value, index) => (
                                <MenuItem 
                                    key={index}
                                    value={value.value}
                                >
                                    {value.label}
                                </MenuItem>
                            ))
                        : listDateEpi ? 
                            dateEpiData?.map((value, index) => (
                                <MenuItem 
                                    key={index}
                                    value={value.value}
                                >
                                    {value.label}
                                </MenuItem>
                            ))
                        : listDateAbsenseWarning ? 
                            dateAbsenseWarningData?.map((value, index) => (
                                <MenuItem 
                                    key={index}
                                    value={value.value}
                                >
                                    {value.label}
                                </MenuItem>
                            ))
                        : meses.map((value, index) => (
                                <MenuItem 
                                    key={index}
                                    value={value.value}
                                >
                                    {value.label}
                                </MenuItem>
                        ))}
                    </Select>
                )}
                <Button 
                    className="bg-primary font-semibold w-[200px] h-[56px]"
                    variant="contained"
                    type="button"
                    href={hrefRegister}
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
                        rows={rows} 
                        columns={columns} 
                        loading={isLoading}
                        pageSizeOptions={[]} 
                        slots={{
                            noRowsOverlay: CustomNoRowsOverlay,
                        }}
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
                        onChange={(_, page) => handleCurrentPage(page)}
                    />
                </div>
            </Box>
        </div>
    );
}