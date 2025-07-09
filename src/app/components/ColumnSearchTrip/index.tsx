import { DirectionsBusFilled } from "@mui/icons-material";
import { Autocomplete, IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";

export default function ColumnSearchTrip({ label, typeInput }: ColumnSearchTripInterface) {
    return (
        <div className="flex flex-col gap-2 justify-center w-[250px]">
            <label className="text-[12px] font-semibold">{label}</label>
            {typeInput === 'select' ? (
                <Autocomplete
                    disablePortal
                    options={[]}
                    className="w-full"
                    value={{label: '', value: ''}}
                    onChange={(event, newValue) => {
                        if (newValue) {
                        }
                    }}
                    onInputChange={(event, inputValue, reason) => {
                        if (reason === 'clear' || inputValue === '') {
                        }
                    }}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={(option) => option?.label || ''}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                    <DirectionsBusFilled />
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                        />
                    )}
                />
            ) : (
                <TextField
                    variant="outlined"
                    fullWidth
                    type="date"
                    // onChange={(e: ChangeEvent<HTMLInputElement>) => changeValues(e, index)}
                    // value={}
                />
            )}
        </div>
    )
}