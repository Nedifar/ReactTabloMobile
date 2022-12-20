import { GroupsOutlined, MeetingRoomOutlined, SchoolOutlined } from "@mui/icons-material";
import { Alert, AlertTitle, BottomNavigation, BottomNavigationAction, Button, Dialog, DialogActions, Slide, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Group from "../Group/Group";
import Cabinet from "../Cabinet/Cabinet"
import Teacher from "../Teacher/Teacher"
import "./sharePage.css"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide unmountOnExit mountOnEnter direction="up" ref={ref} {...props} />
})

function SharePage() {
    const [navigationValue, setNavigationValue] = useState('group');
    const [dialogState, setDialogState] = useState({ open: false, text: "Пизда рулям" });
    const [handleDialogActions, setHandleDialogActions] = useState({ ok: () => { }, cancel: () => { } });
    const [cabinetSelectDialog, setCabinetSelectDialog] = useState({
        open: false,
        content: "",
        ok: () => { },
        cancel: () => { }
    });
    const [infoDialog, setInfoDialog] = useState({
        content: null,
        open: false
    })
    const [newShedule, setNewShedule] = useState(false);
    const [currentView, setCurrentView] = useState(<div/>);
    const [groupState, setGroupState] = useState(<Group newShedule={newShedule} infoDialog={setInfoDialog} emptyCabinetDialog={setCabinetSelectDialog} handleDialogActions={setHandleDialogActions} handleErrorDialog={setDialogState} />);
    const [cabinetState, setCabinetState] = useState(<Cabinet newShedule={newShedule} infoDialog={setInfoDialog} emptyCabinetDialog={setCabinetSelectDialog} handleDialogActions={setHandleDialogActions} handleErrorDialog={setDialogState} />);
    const [teacherState, setTeacherState] = useState(<Teacher newShedule={newShedule} infoDialog={setInfoDialog} emptyCabinetDialog={setCabinetSelectDialog} handleDialogActions={setHandleDialogActions} handleErrorDialog={setDialogState} />);
    const nodeRef = useRef(null);

    useEffect(() => {
        axios.get("http://192.168.147.51:81/api/lastdance/getnes").then((response) => {
            if (response.data == "есть новое расписание") {
                setNewShedule(true);
            }
            else {
                setNewShedule(false);
            }
        }).catch((err) => {
            console.log(err);
        })
        setCurrentView(groupState);
    }, [newShedule])

    return (
        <div className="mainShare">
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                {state=>(
                    currentView
                )}
            </Slide>
            <BottomNavigation className="nav" value={navigationValue} onChange={(event, newValue) => {
                setNavigationValue(newValue);
                if (newValue == "group") {
                    setCurrentView(groupState)
                }
                else if (newValue == "cabinet") {
                    setCurrentView(cabinetState);
                }
                else if (newValue == "teacher") {
                    setCurrentView(teacherState);
                }
            }}>
                <BottomNavigationAction label="Group" value="group" icon={<GroupsOutlined />}>
                </BottomNavigationAction>
                <BottomNavigationAction label="Cabinet" value="cabinet" icon={<MeetingRoomOutlined />}>
                </BottomNavigationAction>
                <BottomNavigationAction label="Teacher" value="teacher" icon={<SchoolOutlined />}>
                </BottomNavigationAction>
            </BottomNavigation>
            <Dialog keepMounted TransitionComponent={Transition} open={dialogState.open} onClose={() => setDialogState({ open: false })} className="error"/*autoHideDuration={6000}*/ >
                <Alert severity="error" className="errorAlert">
                    <AlertTitle>Ошибка</AlertTitle>
                    <p>{dialogState.text}</p>
                </Alert>
                <DialogActions>
                    <Button className="alertBtn" onClick={handleDialogActions.ok}>Повторить</Button>
                    <Button className="alertBtn" onClick={handleDialogActions.cancel}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <Dialog keepMounted TransitionComponent={Transition} open={cabinetSelectDialog.open} onClose={() => setCabinetSelectDialog({ open: false })} className="error"/*autoHideDuration={6000}*/ >
                <Alert severity="info" className="errorAlert" id="infoAlert">
                    <AlertTitle>Информация</AlertTitle>
                    <p>{cabinetSelectDialog.content}</p>
                    <TextField
                        autoFocus
                        label="Номер пары"
                        fullWidth
                        type="number"
                        variant="standard"
                        onChange={(e) => {
                            if (e.target.value.length > 1) {
                                e.target.value = e.target.value.slice(0, 1);
                            }
                            if (+e.target.value === 0 || +e.target.value > 6) {
                                e.target.value = e.target.value.slice(0, 0);
                            }
                        }}
                    />
                </Alert>
                <DialogActions>
                    <Button className="alertBtn" onClick={cabinetSelectDialog.ok}>Ok</Button>
                    <Button className="alertBtn" onClick={cabinetSelectDialog.cancel}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <Dialog keepMounted TransitionComponent={Transition} open={infoDialog.open} onClose={() => setInfoDialog({ open: false })} className="error"/*autoHideDuration={6000}*/ >
                <Alert severity="success" className="errorAlert">
                    <AlertTitle>Информация</AlertTitle>
                    {infoDialog.content}
                </Alert>
                <DialogActions>
                    <Button className="alertBtn" onClick={() => { setInfoDialog({ open: false }) }}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SharePage;