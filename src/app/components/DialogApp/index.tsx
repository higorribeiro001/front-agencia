import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

export const DialogApp = ({isOpen, title, content, func, handleClose}: DialogInterface) => {

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" className="bg-card text-black2">
                {title}
            </DialogTitle>
            <DialogContent className="bg-card text-black2">
                <DialogContentText id="alert-dialog-description" className="text-black2">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions className="bg-card text-black2">
                <Button 
                    onClick={func}
                    sx={{ color: "var(--black2)" }}
                >
                    Sim
                </Button>
                <Button 
                    onClick={handleClose} 
                    sx={{ color: "var(--black2)" }}
                    autoFocus
                >
                    Não
                </Button>
            </DialogActions>
      </Dialog>
    );
}