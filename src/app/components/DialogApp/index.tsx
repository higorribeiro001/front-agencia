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
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={func}
                    sx={{ color: "#FB3A04" }}
                >
                    Sim
                </Button>
                <Button 
                    onClick={handleClose} 
                    sx={{ color: "#FB3A04" }}
                    autoFocus
                >
                    Não
                </Button>
            </DialogActions>
      </Dialog>
    );
}