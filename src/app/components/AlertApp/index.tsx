import { Alert, Stack } from "@mui/material";

export default function AlertApp({isOpen, isSuccess, message}: AlertAppInterface) {
    return (
        isOpen ? (
            <div className="flex fixed w-full p-12 z-[999]">
                <Stack sx={{ width: '100%', zIndex: 999 }} spacing={2} className="z-[999]">
                    <Alert 
                        severity={isSuccess ? "success" : "error"} 
                        variant="filled" 
                        elevation={10}
                        className="z-[999]"
                    >
                        { message }
                    </Alert>
                </Stack>
            </div>
        ) : (
            <div></div>
        )
    );
}