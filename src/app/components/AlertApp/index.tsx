import { Alert, Stack } from "@mui/material";

export default function AlertApp({isOpen, isSuccess, message}: AlertApp) {
    return (
        isOpen ? (
            <div className="flex fixed w-full p-12">
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert 
                        severity={isSuccess ? "success" : "error"} 
                        variant="filled" 
                        elevation={10}
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