import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const UpSliderTransition = React.forwardRef((props: TransitionProps & {
    children: React.ReactElement<any, any>;
}, ref) =>
    <Slide unmountOnExit mountOnEnter direction="up" ref={ref} {...props} />
)

export default UpSliderTransition;