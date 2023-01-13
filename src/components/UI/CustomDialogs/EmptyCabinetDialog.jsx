import { Alert, AlertTitle, Button, Dialog, DialogActions, TextField } from "@mui/material";

function EmptyCabinetDialog(props) {

    const mainPageContainer = props.mainPageContainer;

    const handleCloseCabinetSelectDialog = () => {
        mainPageContainer.setCabinetSelectDialog({ open: false });
    }

    const handleCabinetTextFieldChanged = (e) => {
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
            TransitionComponent={mainPageContainer.UpSliderTransition}
            open={mainPageContainer.cabinetSelectDialog.open}
            onClose={handleCloseCabinetSelectDialog}
            className="error">
            <Alert severity="info" className="errorAlert" id="infoAlert">
                <AlertTitle>
                    Информация
                </AlertTitle>
                <p>{mainPageContainer.cabinetSelectDialog.content}</p>
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
                <Button className="alertBtn" onClick={mainPageContainer.cabinetSelectDialog.ok}>
                    Ok
                </Button>
                <Button className="alertBtn" onClick={mainPageContainer.cabinetSelectDialog.cancel}>
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>);
}

export default EmptyCabinetDialog;