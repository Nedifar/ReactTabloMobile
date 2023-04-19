import { Alert, AlertTitle, Button, Dialog, DialogActions } from "@mui/material";
import { DialogProps } from "../../../lib/CustomTypes";

function ErrorDialog({ mainPageContainer, setDialogState, dialogState, ok, cancel }: IErrorDialogProps) {

    const handleDialogClose = () => {
        setDialogState({ open: false });
    }
    return (
        <Dialog
            keepMounted
            TransitionComponent={mainPageContainer.upSliderTransition}
            open={dialogState?.open}
            onClose={handleDialogClose}
            className="error">
            <Alert severity="error" className="errorAlert">
                <AlertTitle>
                    Ошибка
                </AlertTitle>
                <p>{dialogState?.text}</p>
            </Alert>
            <DialogActions>
                <Button className="alertBtn" onClick={ok}>
                    Повторить
                </Button>
                <Button className="alertBtn" onClick={cancel}>
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>
    );
}

interface IErrorDialogProps extends DialogProps {
    ok: () => void;
    cancel: () => void;
    setDialogState: React.Dispatch<React.SetStateAction<{
        content?: string | undefined;
        open: boolean;
    }>>;
    dialogState: {
        open: boolean;
        text?: string;
    }
}

export default ErrorDialog;