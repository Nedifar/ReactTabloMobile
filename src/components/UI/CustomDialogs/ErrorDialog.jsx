import { Alert, AlertTitle, Button, Dialog, DialogActions } from "@mui/material";

function ErrorDialog(props) {
    const mainPageContainer = props.mainPageContainer;

    const handleDialogClose = () => {
        mainPageContainer.setDialogState({ open: false });
    }
    return (
        <Dialog
            keepMounted
            TransitionComponent={mainPageContainer.upSliderTransition}
            open={mainPageContainer.dialogState.open}
            onClose={handleDialogClose}
            className="error">
            <Alert severity="error" className="errorAlert">
                <AlertTitle>
                    Ошибка
                </AlertTitle>
                <p>{mainPageContainer.dialogState.text}</p>
            </Alert>
            <DialogActions>
                <Button className="alertBtn" onClick={mainPageContainer.ok}>
                    Повторить
                </Button>
                <Button className="alertBtn" onClick={mainPageContainer.cancel}>
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ErrorDialog;