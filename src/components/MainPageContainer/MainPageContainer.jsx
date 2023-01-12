import { Slide } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Group from "../../pages/Group/Group";
import Cabinet from "../../pages/Cabinet/Cabinet";
import Teacher from "../../pages/Teacher/Teacher";
import "./mainpagecontainer.css"
import { useTheme } from "@emotion/react";
import SwipeableViews from "react-swipeable-views";
import Settings from "../../pages/Settings/Settings";
import UpSliderTransition from "../../lib/Transition";
import ErrorDialog from "../UI/CustomDialogs/ErrorDialog";
import InfoDialog from "../UI/CustomDialogs/InfoDialog";
import EmptyCabinetDialog from "../UI/CustomDialogs/EmptyCabinetDialog";
import CustomBottomNavigation from "./CustomBottomNavigation";

function MainPageContainer(props) {
    const url = props.url;
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
        axios.get(url + "/api/lastdance/getnes").then((response) => {
            if (response.data == "есть новое расписание") {
                setNewShedule(true);
            }
            else {
                setNewShedule(false);
            }

            setGroupState(
            <Group 
            back={setSettingsOpen} 
            newShedule={newShedule} 
            infoDialog={setInfoDialog} 
            emptyCabinetDialog={setCabinetSelectDialog} 
            handleDialogActions={setHandleDialogActions} 
            handleErrorDialog={setDialogState} />);

            setCabinetState(
            <Cabinet 
            
            back={setSettingsOpen} 
            newShedule={newShedule} 
            infoDialog={setInfoDialog} 
            emptyCabinetDialog={setCabinetSelectDialog} 
            handleDialogActions={setHandleDialogActions} 
            handleErrorDialog={setDialogState} />);

            setTeacherState(
            <Teacher 
            back={setSettingsOpen} 
            newShedule={newShedule} 
            infoDialog={setInfoDialog} 
            emptyCabinetDialog={setCabinetSelectDialog} 
            handleDialogActions={setHandleDialogActions} 
            handleErrorDialog={setDialogState} />);
            
        }).catch((err) => {
            console.log(err);
        })
    }, [newShedule])

    const handleChangeIndex = (index) => {
        setNavigationValue(index==0?"group":(index==1?"cabinet":"teacher"));
    };

    const handleClickCloseSettings = () => {
        document.querySelector("#zaplatka").style = "z-index: 0";
        setSettingsOpen(false);
    }

    return (
        <div className="mainShare">
            <div id="zaplatka" onClick={handleClickCloseSettings}></div>
            <Slide className="slide" direction="left" in={settingsOpen} mountOnEnter unmountOnExit>
                <div className="settings">
                    <Settings backSettingsClick={setSettingsOpen} />
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
            <CustomBottomNavigation mainPageContainer={{
                navigationValue : navigationValue,
                setNavigationValue : setNavigationValue,
                setIndexPage : setIndexPage
            }}/>
            <ErrorDialog mainPageContainer={{
                upSliderTransition: UpSliderTransition,
                dialogState: dialogState,
                ok: handleDialogActions.ok,
                cancel: handleDialogActions.cancel,
                setDialogState: setDialogState,
            }} />
            <InfoDialog mainPageContainer={{
                upSliderTransition: UpSliderTransition,
                infoDialog: infoDialog,
                setInfoDialog: setInfoDialog,
            }} />
            <EmptyCabinetDialog mainPageContainer={{
                upSliderTransition: UpSliderTransition,
                dialogState: dialogState,
                cabinetSelectDialog : cabinetSelectDialog,
                ok: handleDialogActions.ok,
                cancel: handleDialogActions.cancel,
                setCabinetSelectDialog: setCabinetSelectDialog,
            }}/>
        </div>
    );
}

export default MainPageContainer;