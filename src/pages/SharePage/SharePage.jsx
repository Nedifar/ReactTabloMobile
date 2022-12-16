import { GroupsOutlined, MeetingRoomOutlined, SchoolOutlined } from "@mui/icons-material";
import { Alert, AlertTitle, BottomNavigation, BottomNavigationAction, Button, Dialog, DialogActions, Slide } from "@mui/material";
import React, { useState, useEffect } from "react";
import Group from "../Group/Group";
import "./sharePage.css"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide unmountOnExit mountOnEnter direction="up" ref={ref} {...props} />
})

function SharePage() {
    const [navigationValue, setNavigationValue] = useState('group');
    const [dialogState, setDialogState] = useState({open:false, text: "Пизда рулям"});
    const [currentView, setCurrentView] = useState(<Group handelOkDialogAction handleErrorDialog={setDialogState}/>);



    return (
        <div className="mainShare">
            {currentView}
            <BottomNavigation className="nav" value={navigationValue} onChange={(event, newValue) => {
                setNavigationValue(newValue)
            }}>
                <BottomNavigationAction label="Group" value="group" icon={<GroupsOutlined />}>
                </BottomNavigationAction>
                <BottomNavigationAction label="Cabinet" value="cabinet" icon={<MeetingRoomOutlined />}>
                </BottomNavigationAction>
                <BottomNavigationAction label="Teacher" value="teacher" icon={<SchoolOutlined />}>
                </BottomNavigationAction>
            </BottomNavigation>
            <Dialog keepMounted TransitionComponent={Transition} open={dialogState.open} onClose={()=>setDialogState({open:false})} className="error"/*autoHideDuration={6000}*/ >
                <Alert severity="error" className="errorAlert">
                    <AlertTitle>Ошибка</AlertTitle>
                    <p>us</p>
                </Alert>
                <DialogActions>
                    <Button className="alertBtn" onClick={()=>setDialogState({open:false})}>Повторить</Button>
                    <Button className="alertBtn" onClick={()=>setDialogState({open:false})}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SharePage;