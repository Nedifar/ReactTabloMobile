import { TransitionProps } from "@mui/material/transitions";

export interface DialogProps {
    mainPageContainer: {
        upSliderTransition: React.ForwardRefExoticComponent<TransitionProps & {
            children: React.ReactElement<any, any>;
        } & React.RefAttributes<unknown>>;
    }
}