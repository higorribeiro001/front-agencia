import { DataTableInterface } from "@/data/types";
import { Search } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, MenuItem, Pagination, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ChangeEvent } from "react";
import meses from "@/data/meses.json"

export const DataTable = ({handleSearch, rows, columns, isLoading, pages, hrefRegister, handleCurrentPage, title, monthFilter, valueMonthFilter, funcMonthFilter}: DataTableInterface) => {

    const CustomNoRowsOverlay = () => (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>❌ Nenhum dado encontrado!</p>
        </div>
      );
    return (
        <div className="flex flex-col p-4 border gap-4 border-gray-400 rounded">
            <h2 className="uppercase">{title}</h2>
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
                    placeholder="pesquise..."
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
                />
                {monthFilter && (
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={valueMonthFilter}
                        label=""
                        className="w-[200px]"
                        onChange={funcMonthFilter}
                    >
                        <MenuItem disabled value="default">
                            Mês
                        </MenuItem>
                        {meses.map((value, index) => (
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