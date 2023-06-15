import "./maininforamtiontemplate.scss"
import { IconButton } from "@mui/material";
import { DoorBackOutlined, } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import axios from 'axios'
import CustomSelcet from "../UI/CustomSelect/CustomSelect"
import NewSheduleButton from "./NewSheduleButton";
import WeekBlock from "./SheduleBlock/WeekBlock";
import SheduleBlock from "./SheduleBlock/SheduleBlock";
import DateFormat from "../../lib/DateFormat";
import DateBlock from "./DateBlock/DateBlock";
import React, { useState } from "react";
import { DayWeekType } from "../../lib/CustomTypes";

function MainInformationTemplate({ url, emptyCabinetDialog, back, newShedule, infoDialog,
     handleDialogActions, handleErrorDialog, target}: MainInformationTemplateProps) {

    const [dateValue, setDateValue] = useState(dayjs(new Date().toDateString()));
    const [dateFormat, setDateFormat] = useState(new DateFormat(new Date()));
    const [oldDate, setOldDate] = useState(dayjs(new Date().toDateString()))
    const [resetGroup, setResetGroup] = useState(false);
    const [spisok, setSpisok] = useState<JSX.Element[]>([]);
    const iconStyle = { fontSize: 45 }

    const handleGroupChange = (dayWeeks: DayWeekType[]) => {
        setSpisok(getWeekBlocks(dayWeeks));
    }

    function getWeekBlocks(dayWeeks: DayWeekType[]) : JSX.Element[] {
        if (dayWeeks.length === 0) {
            return [];
        }
        let counter: number = -1;
        return dayWeeks.map((element: DayWeekType) => {
            counter++;
            return <WeekBlock dayWeek={element} dateFormat={dateFormat} key={counter} counter={counter} />;
        })
    }

    const handleSearchEmptyCabinet = () => {
        emptyCabinetDialog({
            open: true,
            content: "Выберите пару, и я выведу вам свободные кабинеты во время этой пары.",
            ok: () => {
                const val : string = (document.querySelector("#infoAlert input") as HTMLInputElement).value;
                if (val !== null && val.length === 1) {
                    axios.get(url + `/api/lastdance/searchEmptycabinet/${val}`)
                        .then((response) => {
                            if (response.status === 200) {
                                emptyCabinetDialog({ open: false });
                                let result : any = [];
                                result.push(<p>Список свободных кабинетов во время {val} пары</p>)
                                response.data.forEach((element: string) => {
                                    result.push(<p key={element}>{element}</p>);
                                }
                                );
                                infoDialog({
                                    open: true,
                                    content: result
                                })
                            }
                        }).catch((response) => {
                            emptyCabinetDialog({
                                content: "",
                                open: false,
                            });
                            if (response.code === "ERR_NETWORK") {
                                handleDialogActions({

                                    ok: () => {
                                        handleErrorDialog({ open: false });
                                        handleSearchEmptyCabinet();
                                    },
                                    cancel: () => {
                                        handleErrorDialog({ open: false });
                                        emptyCabinetDialog({
                                            content: "",
                                            open: false,
                                        });
                                    }
                                });
                                handleErrorDialog({
                                    open: true,
                                    text: "Ошибка подключения. Проверьте подключение к сети интернет и повторите попытку."
                                });
                            }
                        }
                        );
                }
            },
            cancel: () => { emptyCabinetDialog({ open: false }) }
        });
    }

    const handleClickSettingsButton = (e : React.MouseEvent) => {
        back(true);
        document.querySelector("#zaplatka")?.setAttribute('style', "z-index: 2");
        e.stopPropagation();
    }

    const handleDateChange = (newValue : Dayjs|null) => {
        const val : HTMLInputElement = document.querySelector(`#${target}Main .headerCenterBlock >div >input`)!;
        const img : HTMLElement = document.querySelector(`#${target}Main .reloadCat`)!;
        let itemsShedule : NodeListOf<HTMLElement> = document.querySelectorAll(`#${target}Main .shedule *:not(img)`)!
        img.setAttribute('style', "opacity: 1; z-index: 3");
        handleGroupChange([]);
        axios.get(url + `/api/lastdance/getgroupmobile?group=${val.value.replace('☆', '')}&Date=${+newValue!.month() + 1}.${newValue!.date()}.${newValue!.year()}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setDateFormat(new DateFormat(new Date(newValue!.year(), newValue!.month(), newValue!.date())));
                    setDateValue(newValue!);
                    handleGroupChange(response.data);
                }
            }).catch(err => {
                if (err.response.status === 404) {
                    if (err.response.data === "Расписание для данной недели не найдено. Повторить поиск?") {
                        handleDialogActions({
                            ok: () => {
                                handleErrorDialog({ open: false });
                                handleDateChange(newValue);
                            },
                            cancel: () => {
                                handleErrorDialog({ open: false });
                                setDateValue(oldDate);
                                handleDateChange(oldDate);
                            }
                        });
                    }
                    else if (err.response.data === "Расписания для данной группы не найдено. Повторить поиск?") {
                        handleDialogActions({
                            ok: () => {
                                handleErrorDialog({ open: false });
                                handleDateChange(newValue);
                            },
                            cancel: () => {
                                handleErrorDialog({ open: false });
                                setResetGroup(true);
                                setResetGroup(false);
                            }
                        });
                    }
                    handleErrorDialog({ open: true, text: err.response.data });
                }
                console.log(err);
            })
        setTimeout(() => {
            img.setAttribute('style', "opacity: 0; z-index: -1");
            itemsShedule = document.querySelectorAll(`#${target}Main .shedule > *:not(img)`);
            itemsShedule.forEach(element => {
                element.setAttribute('style', "");
            });
        }, 3000);
    };

    return (
        <div
            className="main" id={target + "Main"}>
            <div className="headerGrid">
                <div className="leftIconsBlock">
                    <IconButton onClick={handleSearchEmptyCabinet}>
                        <DoorBackOutlined style={iconStyle} />
                    </IconButton>
                    <NewSheduleButton handleDateChange={handleDateChange} newShedule={newShedule} />
                </div>
                <div className="headerCenterBlock">
                    <span>
                        .OKSEI
                    </span>
                    <CustomSelcet
                        reset={resetGroup}
                        setOOpen={handleErrorDialog}
                        dialogActions={handleDialogActions}
                        handleSelectorChange={handleGroupChange}
                        nameComponent={target}
                        url={url} />
                </div>
                <div className="rightItemsBlock">
                    <IconButton hidden className="settingsButton" onClick={handleClickSettingsButton}>
                        <Settings style={{ fontSize: 35 }} />
                    </IconButton>
                </div>
            </div>
            <DateBlock dateFormat={dateFormat}
                dateValue={dateValue}
                handleDateChange={handleDateChange}
                setValue={setDateValue}
                setOldDate={setOldDate}
            />
            <SheduleBlock spisok={spisok} target={target} />
        </div>
    );
}

type MainInformationTemplateProps = {
    url: string,
    emptyCabinetDialog: React.Dispatch<React.SetStateAction<{
        open: boolean;
        content?: string | undefined;
        ok?: (() => void) | undefined;
        cancel?: (() => void) | undefined;
    }>>,
    back: React.Dispatch<React.SetStateAction<boolean>>,
    newShedule: boolean,
    infoDialog: React.Dispatch<React.SetStateAction<{
        content?: string | undefined;
        open: boolean;
    }>>,
    handleDialogActions: React.Dispatch<React.SetStateAction<{
        ok: () => void;
        cancel: () => void;
    }>>,
    handleErrorDialog: React.Dispatch<React.SetStateAction<{
        open: boolean;
        text?: string | undefined;
    }>>,
    target: string
}

export default MainInformationTemplate;