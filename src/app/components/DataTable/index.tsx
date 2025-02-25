import { Autocomplete, Box, Button, Pagination, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const DataTable = ({handleSearch, rows, columns, isLoading, pages, hrefRegister, handleCurrentPage, title, monthFilter, valueMonthFilter="", funcMonthFilter}: DataTableInterface) => { 
    
    const CustomNoRowsOverlay = () => (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>❌ Nenhum dado encontrado!</p>
        </div>
    );
    
    return (
        <div className="flex flex-col p-4 border gap-4 border-gray-400 rounded">
            <h2 className="uppercase">{title}</h2>
            <div className="flex flex-row gap-4 justify-between">
                {/* <Autocomplete
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
                /> */}
                {hrefRegister && (
                    <Button 
                        className="bg-primary font-semibold w-[200px] h-[56px]"
                        variant="contained"
                        type="button"
                        href={hrefRegister}
                    >
                        Cadastrar
                    </Button>
                )}
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