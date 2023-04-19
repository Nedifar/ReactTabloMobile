import { Alert, AlertTitle, Button, Dialog, DialogActions, TextField } from "@mui/material";
import { DialogProps } from "../../../lib/CustomTypes";
import React from "react";

function EmptyCabinetDialog({ mainPageContainer, setCabinetSelectDialog, cabinetSelectDialog }: EmptyCabinetDialogProps) {

    const handleCloseCabinetSelectDialog = () => {
        setCabinetSelectDialog({ open: false });
    }

    const handleCabinetTextFieldChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value.length > 1) {
            e.target.value = e.target.value.slice(0, 1);
        }
        if (+e.target.value === 0 || +e.target.value > 6) {
            e.target.value = e.target.value.slice(0, 0);
        }
    }

    return (
        <Dialog
            keepMounted
            TransitionComponent={mainPageContainer.upSliderTransition}
            open={cabinetSelectDialog?.open}
            onClose={handleCloseCabinetSelectDialog}
            className="error">
            <Alert severity="info" className="errorAlert" id="infoAlert">
                <AlertTitle>
                    Информация
                </AlertTitle>
                <p>{cabinetSelectDialog?.content}</p>
                <TextField
                    autoFocus
                    label="Номер пары"
                    fullWidth
                    type="number"
                    variant="standard"
                    onChange={handleCabinetTextFieldChanged}
                />
            </Alert>
            <DialogActions>
                <Button className="alertBtn" onClick={cabinetSelectDialog?.ok}>
                    Ok
                </Button>
                <Button className="alertBtn" onClick={cabinetSelectDialog?.cancel}>
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>);
}

interface EmptyCabinetDialogProps extends DialogProps {
    dialogState: {
        open: boolean;
        text?: string | undefined;
    };
    cabinetSelectDialog: {
        open: boolean;
        content?: string;
        ok?: () => void;
        cancel?: () => void;
    };
    setCabinetSelectDialog: React.Dispatch<React.SetStateAction<{
        open: boolean;
        content?: string;
        ok?: () => void;
        cancel?: () => void;
    }>>
}

export default EmptyCabinetDialog;