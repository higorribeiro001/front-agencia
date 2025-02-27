import { Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Pagination, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ChangeEvent } from "react";

export const DataTable = ({handleSearch, rows, columns, isLoading, pages, handleCurrentPage, title}: DataTableInterface) => { 
    
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
                    placeholder="pesquise pelo n° do pedido..."
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch!(e)}
                /> 
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
                    {pages! > 0 && (
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
                            onChange={(_, page) => handleCurrentPage!(page)}
                        />
                    )}
                </div>
            </Box>
        </div>
    );
}