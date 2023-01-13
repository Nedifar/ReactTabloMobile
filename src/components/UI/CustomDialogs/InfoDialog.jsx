import { Alert, AlertTitle, Button, Dialog, DialogActions } from "@mui/material";

function InfoDialog(props) {
    const mainPageContainer = props.mainPageContainer;

    const handleOkDialogClick = () => {
        mainPageContainer.setInfoDialog({ open: false })
    }

    const handleCloseDialog = () => {
        mainPageContainer.setInfoDialog({ open: false })
    }
return(
    <Dialog
        keepMounted
        TransitionComponent={mainPageContainer.UpSliderTransition}
        open={mainPageContainer.infoDialog.open}
        onClose={handleCloseDialog}
        className="error">
        <Alert severity="success" className="errorAlert">
            <AlertTitle>
                Информация
            </AlertTitle>
            {mainPageContainer.infoDialog.content}
        </Alert>
        <DialogActions>
            <Button className="alertBtn" onClick={handleOkDialogClick}>
                Ok
            </Button>
        </DialogActions>
    </Dialog>);
}

export default InfoDialog;