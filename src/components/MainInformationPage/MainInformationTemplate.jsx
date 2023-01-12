import React, { useEffect, useState } from "react";
import "./groupstyle.css"
import { IconButton, TextField } from "@mui/material";
import { DoorBackOutlined, } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import axios from 'axios'
import DateFormat from "./components/DateFormat";
import CustomSelcet from "../../components/UI/CustomSelect/CustomSelect"
import NewSheduleButton from "./NewSheduleButton";
import WeekBlock from "./SheduleBlock/WeekBlock";
import SheduleBlock from "./SheduleBlock/SheduleBlock";

function MainInformationTemplate(props) {
    const [dateValue, setDateValue] = useState(dayjs(new Date().toDateString()));
    const url = props.url;
    const [dateFormat, setDateFormat] = useState(new DateFormat(new Date()));
    const [oldDate, setOldDate] = useState(dayjs(new Date().toDateString()))
    const [resetGroup, setResetGroup] = useState(false);
    const [spisok, setSpisok] = useState([]);
    const iconStyle = { fontSize: 45 }

    const handleGroupChange = (dayWeeks) => { 
        setSpisok(getWeekBlocks(dayWeeks));
    }

    function getWeekBlocks(dayWeeks) {
        let counter = 0;
        return dayWeeks.map((element) => {
            WeekBlock(dayWeek = { element }, counter);
            counter++;
        })
    }

    const handleSearchEmptyCabinet = () => {
        props.emptyCabinetDialog({
            content: ":)",
            open: true,
            content: "Выберите пару, и я выведу вам свободные кабинеты во время этой пары.",
            ok: () => {
                let val = document.querySelector("#infoAlert input").value;
                if (val != null && val.length == 1) {
                    axios.get(url + `/api/lastdance/searchEmptycabinet/${val}`)
                        .then((response) => {
                            if (response.status === 200) {
                                props.emptyCabinetDialog({ open: false });
                                let result = [];
                                result.push(<p>Список свободных кабинетов во время {val} пары</p>)
                                response.data.forEach(element => {
                                    result.push(<p>{element}</p>);
                                }
                                );
                                props.infoDialog({
                                    open: true,
                                    content: result
                                })
                            }
                        }).catch((response) => {
                            props.emptyCabinetDialog({
                                content: "",
                                open: false,
                            });
                            if (response.code === "ERR_NETWORK") {
                                props.handleDialogActions({

                                    ok: () => {
                                        props.handleErrorDialog({ open: false });
                                        handleSearchEmptyCabinet();
                                    },
                                    cancel: () => {
                                        props.handleErrorDialog({ open: false });
                                        props.emptyCabinetDialog({
                                            content: "",
                                            open: false,
                                        });
                                    }
                                });
                                props.handleErrorDialog({ open: true, text: "Ошибка подключения. Проверьте подключение к сети интернет и повторите попытку." });
                            }
                        }
                        );
                }
            },
            cancel: () => { props.emptyCabinetDialog({ open: false }) }
        });
    }

    return (
        <div
            className="main" id="groupMain">
            <div className="headerGrid">
                <div className="leftIconsBlock">
                    <IconButton onClick={handleSearchEmptyCabinet}>
                        <DoorBackOutlined style={iconStyle} />
                    </IconButton>
                    <NewSheduleButton handleDateChange={handleDateChange} newShedule={props.newShedule} />
                </div>
                <div className="headerCenterBlock">
                    <span>
                        .NEDIFAR
                    </span>
                    <CustomSelcet
                    reset={resetGroup} 
                    setOOpen={props.handleErrorDialog} 
                    dialogActions={props.handleDialogActions} 
                    handleSelectorChange={handleGroupChange} />
                </div>
                <div className="rightItemsBlock">
                    <IconButton hidden className="settingsButton" onClick={(e) => {
                        props.back(true);
                        document.querySelector("#zaplatka").style = "z-index: 2";
                        e.stopPropagation();
                    }}>
                        <Settings style={{ fontSize: 35 }} />
                    </IconButton>
                </div>
            </div>
            <DateBlock dateFormat={dateFormat}
            dateValue = {dateValue}
            setOldDate = {setOldDate}
            setDateValue = {setDateValue}
            handleGroupChange = {handleGroupChange}
            setDateFormat = {setDateFormat}
            handleDialogActions = {props.handleDialogActions}
            handleErrorDialog = {props.handleErrorDialog}
            setResetGroup = {setResetGroup}
            oldDate = {oldDate}
            url = {url}
            />
            <SheduleBlock spisok={spisok}/>
        </div>
    );
}

export default MainInformationTemplate;