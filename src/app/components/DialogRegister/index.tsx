import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

export const DialogRegister = ({isOpen, title, funcRegister, funcInput, valueInput, errorInput, handleClose, isLoading}: DialogInterface) => {

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
                <TextField
                    className="w-full my-4"
                    label="* Nome" 
                    variant="outlined"
                    type="text"
                    error={errorInput !== '' ? true : false}
                    helperText={errorInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => funcInput!(e)}
                    value={valueInput}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleClose} 
                    sx={{ color: "gray" }}
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={funcRegister}
                    sx={{ color: "#FB3A04" }}
                    loading={isLoading}
                >
                    Salvar
                </Button>
            </DialogActions>
      </Dialog>
    );
}