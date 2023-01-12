import React, { useEffect, useState } from "react";
import "./groupstyle.css"
import { IconButton, TextField } from "@mui/material";
import { DoorBackOutlined, } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import axios from 'axios'
import DateFormat from "./components/DateFormat";
import CustomSelcet from "../../components/UI/CustomSelect/CustomSelect"
import NewSheduleButton from "./NewSheduleButton";

const url = "http://192.168.147.51:81";

function MainInformationTemplate(props) {
    const [value, setValue] = useState(dayjs(new Date().toDateString()));
    const locale = 'ru';
    const [dateFormat, setDateFormat] = useState(new DateFormat(new Date()));
    const [oldDate, setOldDate] = useState(dayjs(new Date().toDateString()))
    const [resetGroup, setResetGroup] = useState(false);
    const iconStyle = { fontSize: 45 }

    const handleGroupChange = (dayWeeks) => { //!!!!!!!!!!
        setSpisok(getWeekBlocks(dayWeeks));
    }

    useEffect(() => {
        let list = document.querySelectorAll('#groupMain p[data-type="Day"]')
        list.forEach(element => {
            element.innerHTML = element.firstChild?.data.replace('\n', '<br>');
            if (element.innerHTML == "undefined") {
                element.innerHTML = "-";
            }
        });
        let listBlocksForColors = document.querySelectorAll('#groupMain .dayWeekContainer > div:first-child');
        let listBlocksForColors1 = document.querySelectorAll('#groupMain .dayWeekContent > div:first-child');
        let colors = ["#B96CBD", "#49A24D", "#FDA838", "#F75355", "#00C6AE", "#455399"];
        let counterColor = 0;
        for (let i = 0; i < listBlocksForColors.length; i++) {
            listBlocksForColors[i].style.backgroundColor = colors[counterColor];
            listBlocksForColors1[i].style.backgroundColor = colors[counterColor];
            if (counterColor < colors.length) {
                counterColor++;
            }
            else {
                counterColor = 0;
            }
        }
    })

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

    const handleDateChange = (newValue) => {
        let val = document.querySelector('#groupMain .headerCenterBlock >div >input');
        let img = document.querySelector('#groupMain .reloadCat');
        let itemsShedule = document.querySelectorAll('#groupMain .shedule *:not(img)')
        img.style = "opacity: 1; z-index: 3";
        handleGroupChange([]);
        let doc = document.querySelector('#groupMain .dateBlock input').value.split('.');
        axios.get(url + `/api/lastdance/getgroupmobile?group=${val.value}&Date=${+newValue.month() + 1}.${newValue.date()}.${newValue.year()}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setDateFormat(new DateFormat(new Date(newValue.year(), newValue.month(), newValue.date())));
                    setValue(newValue);
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
                                setValue(oldDate);
                                handleDateChange(oldDate);
                            }
                        });
                    }
                    else if (err.response.data == "Расписания для данной группы не найдено. Повторить поиск?") {
                        props.handleDialogActions({

                            ok: () => {
                                props.handleErrorDialog({ open: false });
                                handleDateChange(newValue);
                            },
                            cancel: () => {
                                props.handleErrorDialog({ open: false });
                                setResetGroup(true);
                                setResetGroup(false);
                            }
                        });
                    }
                    props.handleErrorDialog({ open: true, text: err.response.data });
                }
                console.log(err);
            })
        setTimeout(() => {
            img.style = "opacity: 0; z-index: 1";
            itemsShedule = document.querySelectorAll('#groupMain .shedule > *:not(img)');
            itemsShedule.forEach(element => {
                element.style = "";
            });
        }, 3000);
    };

    const getLessonBlock = (lessons) => {
        let lessonBlocks = [];
        let counter = 0;
        lessons.forEach(element => {
            lessonBlocks.push(
                <div key={element.Day + element.beginMobile}>
                    <p>{element.number}</p>
                    <p data-type="Day" data-typedata={element.Day}>{element.day.replace('\n', "<br>")}</p>
                    <p>{element.beginMobile}-{element.endMobile}</p>
                </div>);
        });
        return lessonBlocks;
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
                    <CustomSelcet reset={resetGroup} setOOpen={props.handleErrorDialog} dialogActions={props.handleDialogActions} handleSelectorChange={handleGroupChange} />
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
            <div className="dateBlock">
                <div>
                    <div>
                        <p>{dateFormat.downDay}</p>
                        <p>{dateFormat.getMonth(dateFormat.dDownDay)}</p>
                        <div>
                            <div className="circle"></div>
                            <div className="stripe"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="rightDateContainer">
                        <p>{dateFormat.upDay}</p>
                        <p>{dateFormat.getMonth(dateFormat.dUpDay)}</p>
                        <div className="rightStripeContainer">
                            <div className="stripe-right"></div>
                            <div className="circle-right"></div>
                        </div>
                    </div>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                    <MobileDatePicker className="weekDate"
                        value={value}
                        onAccept={handleDateChange}
                        onChange={(newValue) => {
                            setOldDate(value);
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    >
                    </MobileDatePicker>
                </LocalizationProvider>
            </div>
            <SheduleBlock/>
        </div>
    );
}

function handleOpenDayWeekContainer(e) {
    var content = e.currentTarget.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

export default MainInformationTemplate;