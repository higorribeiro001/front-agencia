import { CircularProgress, Dialog, DialogContent } from "@mui/material";

export const Loading = ({isOpen}: DialogInterface) => {
    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent className="px-12 py-6 bg-background text-black2">
                <CircularProgress className="mx-8" color="success" />
                <p className="text-center">Carregando...</p>
            </DialogContent>
        </Dialog>
    );
}