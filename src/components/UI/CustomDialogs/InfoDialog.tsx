import { Alert, AlertTitle, Button, Dialog, DialogActions } from "@mui/material";
import { DialogProps } from "../../../lib/CustomTypes";

function InfoDialog({ mainPageContainer, setInfoDialog, infoDialog }: IInfoDailogProps) {

    const handleOkDialogClick = (): void => {
        setInfoDialog({ open: false })
    }

    const handleCloseDialog = (): void => {
        setInfoDialog({ open: false })
    }
    return (
        <Dialog
            keepMounted
            TransitionComponent={mainPageContainer.upSliderTransition}
            open={infoDialog?.open}
            onClose={handleCloseDialog}
            className="error">
            <Alert severity="success" className="errorAlert">
                <AlertTitle>
                    Информация
                </AlertTitle>
                {infoDialog?.content}
            </Alert>
            <DialogActions>
                <Button className="alertBtn" onClick={handleOkDialogClick}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>);
}

interface IInfoDailogProps extends DialogProps {
    setInfoDialog: React.Dispatch<React.SetStateAction<{
        content?: string;
        open: boolean;
    }>>;
    infoDialog: {
        content?: string;
        open: boolean;
    };
}

export default InfoDialog;