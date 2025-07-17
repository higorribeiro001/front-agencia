import Image from "next/image";
import fundo from '../../../../public/assets/fundo.jpg';
import logo from '../../../../public/assets/logo.png';
import { Box, Button } from "@mui/material";
import ColumnSearchTrip from "../ColumnSearchTrip";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { trip, trips } from "@/app/service/api/trip";
import TripAdapt from "@/app/service/adapt/TripAdapt";
import TripsAdapt from "@/app/service/adapt/TripsAdapt";

export default function Home() {
    const [selectedTrip, setSelectedTrip] = useState<Model>({label: '', value: '', error: '', name: ''});

    const route = useRouter();

    const getTrips = async () => {
        const response = await trips();
        const tripAdapt = new TripsAdapt(response?.data ?? []);
    
        const tripData = tripAdapt.externalTripsAdapt;

        return tripData;
    }

    const nextRoute = async () => {
        const url = '/maps';

        const response = await trip(selectedTrip.value);
        const tripAdapt = new TripAdapt(response!);
        const tripData = tripAdapt.externalTripAdapt;

        if (selectedTrip.value !== '') {
            route.replace(url+`/?lat=${tripData.latitude}&lng=${tripData.longitude}`);
        } else {
            const trips = await getTrips();
            route.replace(url+`/?lat${trips[0].latitude}&lng${trips[0].longitude}`);
        }
    }
    
    return (
        <div className="flex w-full h-full relative py-10 overflow-y-hidden">
            <Image src={fundo} alt="Fundo" className="w-full h-full z-40" style={{ width: "100%", height: "100%" }} fill />
            <div className="w-full h-full z-50 flex flex-col items-center justify-end gap-10 p-16 absolute">
                <Image src={logo} alt="Fundo" className="z-40" width={350} height={450} />
                <Box
                    sx={{
                        p: 8,
                        mb: 7,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <div className="w-full h-full flex flex-col gap-8 lg:flex-row items-center justify-between">
                        <ColumnSearchTrip label="Para onde vai?" typeInput="select" value={selectedTrip} setValue={setSelectedTrip} />
                        <ColumnSearchTrip label="Quando?" typeInput="input" />
                        <Button variant="contained" sx={{ width: '250px', height: '56px', marginTop: '26px', bgcolor: 'primary.paper' }} type="button" onClick={nextRoute}>BUSCAR</Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}