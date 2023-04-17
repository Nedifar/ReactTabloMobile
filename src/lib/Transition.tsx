import { Slide } from "@mui/material";
import React from "react";

const UpSliderTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide unmountOnExit mountOnEnter direction="up" ref={ref} {...props} ><div></div></Slide>
})

export default UpSliderTransition;