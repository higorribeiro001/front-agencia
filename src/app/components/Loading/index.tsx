import { DialogInterface } from "@/data/types";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";

export const Loading = ({isOpen}: DialogInterface) => {
    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent className="px-12 py-6">
                <CircularProgress className="mx-8" color="success" />
                <p className="text-center">Carregando...</p>
            </DialogContent>
        </Dialog>
    );
}