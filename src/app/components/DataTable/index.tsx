import { DataTableInterface } from "@/data/types";
import { Search } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, Pagination, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ChangeEvent } from "react";

export const DataTable = ({handleSearch, rows, columns, isLoading, pages, hrefRegister, handleCurrentPage}: DataTableInterface) => {
    return (
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
                />
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