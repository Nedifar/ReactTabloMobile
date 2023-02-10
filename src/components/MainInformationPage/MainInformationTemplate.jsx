import React, { useState } from "react";
import "./maininforamtiontemplate.css"
import { IconButton } from "@mui/material";
import { DoorBackOutlined, } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import axios from 'axios'
import CustomSelcet from "../../components/UI/CustomSelect/CustomSelect"
import NewSheduleButton from "./NewSheduleButton";
import WeekBlock from "./SheduleBlock/WeekBlock";
import SheduleBlock from "./SheduleBlock/SheduleBlock";
import DateFormat from "../../lib/DateFormat";
import DateBlock from "./DateBlock/DateBlock";

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
        if(dayWeeks.length === 0){
            return [];
        }
        let counter = -1;
        return dayWeeks.map((element) => {
            counter++;
            return <WeekBlock dayWeek = {element} dateFormat={dateFormat} key={counter} counter={counter}/>;
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
                                    result.push(<p key={element}>{element}</p>);
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
                                props.handleErrorDialog({ 
                                    open: true, 
                                    text: "Ошибка подключения. Проверьте подключение к сети интернет и повторите попытку." 
                                });
                            }
                        }
                        );
                }
            },
            cancel: () => { props.emptyCabinetDialog({ open: false }) }
        });
    }

    const handleClickSettingsButton = (e)=>{
        props.back(true);
        document.querySelector("#zaplatka").style = "z-index: 2";
        e.stopPropagation();
    }

    const handleDateChange = (newValue) => {
        let val = document.querySelector(`#${props.target}Main .headerCenterBlock >div >input`);
        let img = document.querySelector(`#${props.target}Main .reloadCat`);
        let itemsShedule = document.querySelectorAll(`#${props.target}Main .shedule *:not(img)`)
        img.style = "opacity: 1; z-index: 3";
        handleGroupChange([]);
        axios.get(props.url + `/api/lastdance/getgroupmobile?group=${val.value.replace('☆', '')}&Date=${+newValue.month() + 1}.${newValue.date()}.${newValue.year()}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setDateFormat(new DateFormat(new Date(newValue.year(), newValue.month(), newValue.date())));
                    setDateValue(newValue);
                    handleGroupChange(response.data);
                }
            }).catch(err => {
                if (err.response.status === 404) {
                    if (err.response.data == "Расписание для данной недели не найдено. Повторить поиск?") {
                        props.handleDialogActions({
                            ok: () => {
                                props.handleErrorDialog({ open: false });
                                handleDateChange(newValue);
                            },
                            cancel: () => {
                                props.handleErrorDialog({ open: false });
                                props.setDateValue(oldDate);
                                handleDateChange(oldDate);
                            }
                        });
                    }
                    else if (err.response.data == "Расписания для данной группы не найдено. Повторить поиск?") {
                        props.handleDialogActions({
                            ok: () => {
                                props.handleErrorDialog({ open: false });
                                props.handleDateChange(newValue);
                            },
                            cancel: () => {
                                props.handleErrorDialog({ open: false });
                                props.setResetGroup(true);
                                props.setResetGroup(false);
                            }
                        });
                    }
                    props.handleErrorDialog({ open: true, text: err.response.data });
                }
                console.log(err);
            })
        setTimeout(() => {
            img.style = "opacity: 0; z-index: -1";
            itemsShedule = document.querySelectorAll(`#${props.target}Main .shedule > *:not(img)`);
            itemsShedule.forEach(element => {
                element.style = "";
            });
        }, 3000);
    };

    return (
        <div
            className="main" id={props.target + "Main"}>
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
                    handleSelectorChange={handleGroupChange} 
                    nameComponent = {props.target}
                    url = {url}/>
                </div>
                <div className="rightItemsBlock">
                    <IconButton hidden className="settingsButton" onClick={handleClickSettingsButton}>
                        <Settings style={{ fontSize: 35 }} />
                    </IconButton>
                </div>
            </div>
            <DateBlock dateFormat={dateFormat}
            dateValue = {dateValue}
            handleDateChange = {handleDateChange}
            setValue = {setDateValue}
            setOldDate = {setOldDate}
            url = {url}
            target = {props.target}
            />
            <SheduleBlock spisok={spisok} target={props.target}/>
        </div>
    );
}

export default MainInformationTemplate;