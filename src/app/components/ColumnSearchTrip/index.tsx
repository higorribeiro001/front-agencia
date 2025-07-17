import TripsAdapt from "@/app/service/adapt/TripsAdapt";
import { trips } from "@/app/service/api/trip";
import { DirectionsBusFilled } from "@mui/icons-material";
import { Autocomplete, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function ColumnSearchTrip({ label, typeInput }: ColumnSearchTripInterface) {
    const [optionsTrip, setOptionsTrip] = useState<Model[]>([]);
    const [selectedTrip, setSelectedTrip] = useState<Model | null>(null);
    
    const getTrips = async () => {
        const response = await trips();
        const tripAdapt = new TripsAdapt(response?.data ?? []);
    
        const tripData = tripAdapt.externalTripsAdapt;

        const listTrip = tripData.map(t => ({
            label: t.titulo,
            value: String(t.id),
            name: '',
            error: '',
        }));

        setOptionsTrip(listTrip);
    }

    useEffect(() => {
        getTrips();
    }, []);

    return (
        <div className="flex flex-col gap-2 justify-center w-[250px]">
            <label className="text-[12px] font-semibold">{label}</label>
            {typeInput === 'select' ? (
                <Autocomplete
                    disablePortal
                    options={optionsTrip}
                    className="w-full"
                    value={selectedTrip}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setSelectedTrip(newValue); 
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