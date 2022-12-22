import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button'
import "./cabinetstyle.css"
import { Alert, AlertTitle, Dialog, DialogActions, DialogContent, Grow, IconButton, List, Slide, Snackbar, TextField } from "@mui/material";
import { DoorBackOutlined, SettingsAccessibility, Sledding } from "@mui/icons-material";
import NewReleases from "@mui/icons-material/NewReleasesOutlined";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import axios from 'axios'
import DateFormat from "./components/DateFormat";
import ReloadCat from "./components/reloadcat.gif"

function Cabinet(props) {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(dayjs(new Date().toDateString()));
    const [locale, setLocale] = useState('ru');
    const [spisok, setSpisok] = useState([]);
    const [dateFormat, setDateFormat] = useState(new DateFormat(new Date()));
    const [oldDate, setOldDate] = useState(dayjs(new Date().toDateString()))
    const [resetCabinet, setResetCabinet] = useState(false);
    const iconStyle = { fontSize: 45 }

    const handleCabinetChange = (dayWeeks) => {
        setSpisok(getWeekBlocks(dayWeeks));
    }

    const NewSheduleButton = () => {
        if (props.newShedule) {
            return (
                <IconButton>
                    <NewReleases style={iconStyle} />
                </IconButton>);
        }
        else {
            return null;
        }
    };

    useEffect(() => {
        let list = document.querySelectorAll('#cabinetMain p[data-type="Day"]')
        list.forEach(element => {
            element.innerHTML = element.firstChild?.data.replace('\n', '<br>');
            if (element.innerHTML == "undefined") {
                element.innerHTML = "-";
            }
        });
        let listBlocksForColors = document.querySelectorAll('#cabinetMain .dayWeekContainer > div:first-child');
        let listBlocksForColors1 = document.querySelectorAll('#cabinetMain .dayWeekContent > div:first-child');
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
                let val = document.querySelector("#cabinetMain #infoAlert input").value;
                if (val != null && val.length == 1) {
                    axios.get(`http://localhost:5014/api/lastdance/searchEmptycabinet/${val}`)
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
        let val = document.querySelector('#cabinetMain .headerCenterBlock >div >input');
        let img = document.querySelector('#cabinetMain .reloadCat');
        let itemsShedule = document.querySelectorAll('#cabinetMain .shedule *:not(img)')
        img.style = "opacity: 1; z-index: 3";
        handleCabinetChange([]);
        let doc = document.querySelector('#cabinetMain .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').value.split('.');
        axios.get(`http://localhost:5014/api/lastdance/getcabinetmobile?cabinet=${val.value}&Date=${+newValue.month() + 1}.${newValue.date()}.${newValue.year()}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setDateFormat(new DateFormat(new Date(newValue.year(), newValue.month(), newValue.date())));
                    setValue(newValue);
                    handleCabinetChange(response.data);
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
                                setResetCabinet(true);
                                setResetCabinet(false);
                            }
                        });
                    }
                    props.handleErrorDialog({ open: true, text: err.response.data });
                }
                console.log(err);
            })
        setTimeout(() => {
            img.style = "opacity: 0; z-index: 1";
            itemsShedule = document.querySelectorAll('#cabinetMain .shedule > *:not(img)');
            itemsShedule.forEach(element => {
                element.style = "";
            });
        }, 3000);
    };

    const getWeekBlocks = (dayWeeks) => {
        let content = [];
        let counter = 0;
        dayWeeks.forEach(element => {
            content.push(
                <div className="buttonDayWeekContainer" key={element.dayWeekName}>
                    <button type="button" onClick={expander} className="dayWeekContainer">
                        <div>

                        </div>
                        <div>
                            <div>
                                <p>{dateFormat.addDays(counter).getDate()}</p>
                                <span>{dateFormat.getMonth(dateFormat.addDays(counter))}</span>
                            </div>
                            <div>

                            </div>
                            <div>
                                {element.dayWeekName}
                            </div>
                        </div>
                    </button>
                    <div className="dayWeekContent">
                        <div></div>
                        <div>
                            <div></div>
                            <div>

                            </div>
                            <div className="intoDayWeekContent">
                                <p>
                                    SHEDULE
                                </p>

                                {getLessonBlock(element.dayWeekClasses)}
                            </div>

                        </div>
                    </div>
                </div>

            );
            counter++;
        });
        return content;
    };

    const getLessonBlock = (lessons) => {
        let lessonBlocks = [];
        let counter = 0;
        lessons.forEach(element => {
            lessonBlocks.push(
                <div key={element.Day + element.beginMobile}>
                    <p>{element.number}</p>
                    <p data-type="Day" data-typedata={element.Day}>{element.day.replace('\n', "<br>").replace('\n', "<br>")}</p>
                    <p>{element.beginMobile}-{element.endMobile}</p>
                </div>);
        });
        return lessonBlocks;

    }

    return (
        <div className="main" id="cabinetMain">
            <div className="headerGrid">
                <div className="leftIconsBlock">
                    <IconButton onClick={handleSearchEmptyCabinet}>
                        <DoorBackOutlined  style={iconStyle} />
                    </IconButton>
                    <NewSheduleButton />
                </div>
                <div className="headerCenterBlock">
                    <span>
                        .NEDIFAR
                    </span>
                    <CabinetSelect resetCabinet={resetCabinet} setOOpen={props.handleErrorDialog} dialogActions={props.handleDialogActions} handleCabinetChange={handleCabinetChange} />
                </div>
                <div className="rightItemsBlock">
                    <IconButton hidden className="settingsButton">
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
            <div className="shedule">
                <p>LastDance</p>
                <div className="contLessonsBlock">
                    {spisok}
                </div>
                <img className="reloadCat" src={ReloadCat}></img>
            </div>
        </div>
    );
}

function expander(e) {
    var content = e.currentTarget.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

class CabinetSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [""],
            cabinet: "",
            currentDate: (+(new Date().getMonth()) + 1) + "." + new Date().getDate() + "." + new Date().getFullYear()
        };
    }

    componentDidMount() {
        let doc = document.querySelector('#cabinetMain .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').value.split('.');
        axios.get(`http://localhost:5014/api/lastdance/getcabinetslist?date=${this.state.currentDate}`).then((response) => {
            if (response.status === 200) {
                this.setState({ list: response.data });

            }
        }).catch(err => {
            this.props.dialogActions({
                ok: () => {
                    this.props.setOOpen({ open: false });
                    this.componentDidMount();
                },
                cancel: () => {
                    this.props.setOOpen({ open: false });
                }
            });
            this.props.setOOpen({ open: true, text: "Ошибка подключения, вы хотите повторить?" });
            console.log("err")
        })
    }

    componentDidUpdate(prevProps, prevState) {

        let doc = document.querySelector('#cabinetMain .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').value.split('.');
        if (`${doc[1]}.${doc[0]}.${doc[2]}` !== this.state.currentDate) {
            this.setState({ currentDate: `${doc[1]}.${doc[0]}.${doc[2]}` });
            axios.get(`http://localhost:5014/api/lastdance/getcabinetslist?date=${doc[1]}.${doc[0]}.${doc[2]}`).then((response) => {
                if (response.status === 200) {
                    this.setState({ list: response.data });

                }
            }).catch(err => {
                this.props.dialogActions({
                    ok: () => {
                        this.props.setOOpen({ open: false });
                        this.componentDidMount();
                    },
                    cancel: () => {
                        this.props.setOOpen({ open: false });
                    }
                });
                this.props.setOOpen({ open: true, text: "Ошибка подключения, вы хотите повторить?" });
                console.log("err")
            })
        }
        if (prevProps.resetGroup) {
            this.handleChange({ target: "" });
        }
    }

    handleChange = (e) => {
        let img = document.querySelector('#cabinetMain .reloadCat');
        let itemsShedule = document.querySelectorAll('#cabinetMain .shedule *:not(img)')
        let shed = document.querySelector("#cabinetMain .shedule");
        img.style = "opacity: 1; z-index: 3";
        shed.style = "overflow: hidden";
        let doc = document.querySelector('#cabinetMain .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').value.split('.');
        this.props.handleCabinetChange([]);
        axios.get(`http://localhost:5014/api/lastdance/getcabinetmobile?cabinet=${e.target.value}&Date=${doc[1]}.${doc[0]}.${doc[2]}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.props.handleCabinetChange(response.data);
                    this.setState({ cabinet: e.target.value, })
                }
            }).catch(err => {
            })
        setTimeout(() => {
            img.style = "opacity: 0; z-index: 1";
            itemsShedule = document.querySelectorAll('.shedule > *:not(img)');
            itemsShedule.forEach(element => {
                element.style = "";
            });
            shed.style = "overflow: scroll";
        }, 3000);
    }

    selectItem() {
        let listMenuItems = []
        this.state.list.forEach(element => {
            listMenuItems.push(<MenuItem value={element} key={element}>{element}</MenuItem>);
        });
        return listMenuItems;
    }
    render() {
        return (
            <Select variant="standard" value={this.state.cabinet} onChange={this.handleChange} IconComponent={undefined} className="groupSelect" >
                {this.selectItem()}
            </Select>
        );
    }
}


export default Cabinet;