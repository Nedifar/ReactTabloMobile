import { GroupsOutlined, MeetingRoomOutlined, SchoolOutlined } from "@mui/icons-material";
import { Alert, AlertTitle, BottomNavigation, BottomNavigationAction, Button, Collapse, Dialog, DialogActions, Fade, Slide, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Group from "../Group/Group";
import Cabinet from "../Cabinet/Cabinet"
import Teacher from "../Teacher/Teacher"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import "./sharePage.css"
import { useTheme } from "@emotion/react";
import SwipeableViews from "react-swipeable-views";
import Settings from "../Settings/Settings";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide unmountOnExit mountOnEnter direction="up" ref={ref} {...props} />
})

const SettingsTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide unmountOnExit mountOnEnter direction="up" ref={ref} {...props} >
        
    </Slide>
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
    });
    const theme = useTheme();
    const [indexPage, setIndexPage] = React.useState(0);
    const [newShedule, setNewShedule] = useState(true);
    const [groupState, setGroupState] = useState(<div />);
    const [cabinetState, setCabinetState] = useState(<div />);
    const [teacherState, setTeacherState] = useState(<div />);
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        axios.get("http://192.168.147.51:81/api/lastdance/getnes").then((response) => {
            if (response.data == "есть новое расписание") {
                setNewShedule(true);
            }
            else {
                setNewShedule(false);
            }
            setGroupState(<Group back={setSettingsOpen} newShedule={newShedule} infoDialog={setInfoDialog} emptyCabinetDialog={setCabinetSelectDialog} handleDialogActions={setHandleDialogActions} handleErrorDialog={setDialogState} />);
            setCabinetState(<Cabinet back={setSettingsOpen} newShedule={newShedule} infoDialog={setInfoDialog} emptyCabinetDialog={setCabinetSelectDialog} handleDialogActions={setHandleDialogActions} handleErrorDialog={setDialogState} />);
            setTeacherState(<Teacher back={setSettingsOpen} newShedule={newShedule} infoDialog={setInfoDialog} emptyCabinetDialog={setCabinetSelectDialog} handleDialogActions={setHandleDialogActions} handleErrorDialog={setDialogState} />);
        }).catch((err) => {
            console.log(err);
        })
    }, [newShedule])

    const handleChangeIndex = (index) => {
        if (index == 0) {
            setNavigationValue("group");
        }
        else if (index == 1) {
            setNavigationValue("cabinet");
        }
        else if (index == 2) {
            setNavigationValue("teacher");
        }
        //setIndexPage(index);
    };

    return (
        <div className="mainShare">
        <Slide className="slide" direction="left" in={settingsOpen} mountOnEnter unmountOnExit>
                <div className="settings">
                    <Settings backSettingsClick={setSettingsOpen}/>
                </div>
            </Slide>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={indexPage}
                className="divContainerForPages"
                onChangeIndex={handleChangeIndex}
            >
                {groupState}
                {cabinetState}
                {teacherState}
            </SwipeableViews>
            
            <BottomNavigation className="nav" value={navigationValue} onChange={(event, newValue) => {
                setNavigationValue(newValue);
                if (newValue == "group") {
                    setIndexPage(0);
                }
                else if (newValue == "cabinet") {
                    setIndexPage(1);
                }
                else if (newValue == "teacher") {
                    setIndexPage(2);
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