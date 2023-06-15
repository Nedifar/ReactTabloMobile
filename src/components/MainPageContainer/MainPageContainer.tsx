import { Slide } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, Suspense } from "react";
import "./mainpagecontainer.scss"
import SwipeableViews from "react-swipeable-views";
import { Theme, useTheme } from "@mui/material/styles";
import UpSliderTransition from "../../lib/Transition";
import ErrorDialog from "../UI/CustomDialogs/ErrorDialog";
import InfoDialog from "../UI/CustomDialogs/InfoDialog";
import EmptyCabinetDialog from "../UI/CustomDialogs/EmptyCabinetDialog";
import CustomBottomNavigation from "./CustomBottomNavigation";
import MainInformationTemplate from "../MainInformationPage/MainInformationTemplate";
import Settings from "../Settings/Settings";

function MainPageContainer({ url }: MainPageContainerProps) {

    const [navigationValue, setNavigationValue] = useState<string>('group');
    const [dialogState, setDialogState] = useState<{ open: boolean, text?: string }>({ open: false, text: "" });
    const [handleDialogActions, setHandleDialogActions] = useState({ ok: () => { }, cancel: () => { } });
    const [cabinetSelectDialog, setCabinetSelectDialog] = useState<{
        open: boolean;
        content?: string;
        ok?: () => void;
        cancel?: () => void;
    }>({
        open: false,
        content: "",
        ok: () => { },
        cancel: () => { }
    });

    const [infoDialog, setInfoDialog] = useState<{
        content?: string;
        open: boolean;
    }>({
        content: '',
        open: false
    });

    const theme: Theme = useTheme();
    const [indexPage, setIndexPage] = React.useState<number>(0);
    const [newShedule, setNewShedule] = useState<boolean>(true);
    const [groupState, setGroupState] = useState<JSX.Element>(<div />);
    const [cabinetState, setCabinetState] = useState<JSX.Element>(<div />);
    const [teacherState, setTeacherState] = useState<JSX.Element>(<div />);
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    useEffect((): void => {
        axios.get(url + "/api/lastdance/getnes").then((response) => {
            if (response.data === "есть новое расписание") {
                setNewShedule(true);
            }
            else {
                setNewShedule(false);
            }
            let targets: JSX.Element[] = [];
            targets = ['group', 'cabinet', 'teacher'].map((elem) => {
                return <MainInformationTemplate
                    back={setSettingsOpen}
                    newShedule={newShedule}
                    infoDialog={setInfoDialog}
                    emptyCabinetDialog={setCabinetSelectDialog}
                    handleDialogActions={setHandleDialogActions}
                    handleErrorDialog={setDialogState}
                    url={url}
                    target={elem} />;

            })
            setGroupState(targets[0]);
            setCabinetState(targets[1]);
            setTeacherState(targets[2]);

        }).catch((err) => {
            console.log(err);
        })
    }, [newShedule] ) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeIndex = (index: number) => {
        setNavigationValue(index === 0 ? "group" : (index === 1 ? "cabinet" : "teacher"));
    };

    const handleClickCloseSettings = () => {
        document.querySelector("#zaplatka")?.setAttribute('style', "z-index: 0");
        setSettingsOpen(false);
    }

    return (
        <div className="mainShare">
            <div id="zaplatka" onClick={handleClickCloseSettings}></div>
            <Slide className="slide" direction="left" in={settingsOpen} mountOnEnter unmountOnExit>
                <div className="settings">
                    <Settings backSettingsClick={setSettingsOpen} dialogActions={setHandleDialogActions} setOOpen={setDialogState} />
                </div>
            </Slide>
            <Suspense fallback={<div>load</div>}>
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
            </Suspense>
            <CustomBottomNavigation mainPageContainer={{
                navigationValue: navigationValue,
                setNavigationValue: setNavigationValue,
                setIndexPage: setIndexPage
            }} />
            <ErrorDialog mainPageContainer={{
                upSliderTransition: UpSliderTransition,
            }}
                dialogState={dialogState}
                ok={handleDialogActions.ok}
                cancel={handleDialogActions.cancel}
                setDialogState={setDialogState} />
            <InfoDialog mainPageContainer={{
                upSliderTransition: UpSliderTransition,
            }}
                infoDialog={infoDialog}
                setInfoDialog={setInfoDialog} />
            <EmptyCabinetDialog mainPageContainer={{
                upSliderTransition: UpSliderTransition
            }}
                dialogState={dialogState}
                cabinetSelectDialog={cabinetSelectDialog}
                setCabinetSelectDialog={setCabinetSelectDialog}
            />
        </div>
    );
}

type MainPageContainerProps = {
    url: string
}

export default MainPageContainer;