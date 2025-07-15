import Image from "next/image";
import fundo from '../../../../public/assets/fundo.jpg';
import logo from '../../../../public/assets/logo.png';
import { Box, Button } from "@mui/material";
import ColumnSearchTrip from "../ColumnSearchTrip";

export default function Home() {
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
                        <ColumnSearchTrip label="Para onde vai?" typeInput="select" />
                        <ColumnSearchTrip label="Quando?" typeInput="input" />
                        <Button variant="contained" sx={{ width: '250px', height: '56px', marginTop: '26px', bgcolor: 'primary.paper' }}>BUSCAR</Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}