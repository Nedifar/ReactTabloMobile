import { GroupsOutlined, MeetingRoomOutlined, SchoolOutlined } from "@mui/icons-material";
import { Alert, AlertTitle, BottomNavigation, BottomNavigationAction, Button, Dialog, DialogActions, Slide } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Group from "../Group/Group";
import "./sharePage.css"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide unmountOnExit mountOnEnter direction="up" ref={ref} {...props} />
})

function SharePage() {
    const [navigationValue, setNavigationValue] = useState('group');
    const [dialogState, setDialogState] = useState({open:false, text: "Пизда рулям"});
    const [handleDialogActions, setHandleDialogActions] = useState({ok:()=>{}, cancel:()=>{}});
    const [newShedule, setNewShedule] = useState(false);
    const [currentView, setCurrentView] = useState(null);

useEffect(()=>{
    axios.get("http://192.168.147.51:81/api/lastdance/getnes").then((response)=>{
            if(response.data == "есть новое расписание"){
                setNewShedule(true);
            }
            else{
                setNewShedule(false);
            }
        }).catch((err)=>{
            console.log(err);
        })
        setCurrentView(<Group newShedule={newShedule} handleDialogActions={setHandleDialogActions} handleErrorDialog={setDialogState}/>);
}, [newShedule])

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
                    <p>{dialogState.text}</p>
                </Alert>
                <DialogActions>
                    <Button className="alertBtn" onClick={handleDialogActions.ok}>Повторить</Button>
                    <Button className="alertBtn" onClick={()=>setDialogState({open:false})}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SharePage;