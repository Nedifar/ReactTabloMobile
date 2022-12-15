import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button'
import "./groupstyle.css"
import { Alert, IconButton, Snackbar, TextField } from "@mui/material";
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

function Group() {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(dayjs(new Date().toDateString()));
    const [locale, setLocale] = useState('ru');
    const [spisok, setSpisok] = useState([]);
    const [dateFormat, setDateFormat] = useState(new DateFormat(new Date()));
    const [newSheduleIconVisible, setNewSheduleIconVisible] = useState(false);
    const [alertText, setAlertText] = useState("Aloxa");
    const [alertOpen, setAlertOpen] = useState(true);
    const handleGroupChange = (dayWeeks) => {
        setSpisok(getWeekBlocks(dayWeeks));
    }
    const NewSheduleButton = () => {
        if (newSheduleIconVisible) {
            return (
                <IconButton>
                    <NewReleases style={iconStyle} />
                </IconButton>);
        }
        else {
            return null;
        }
    };

    const snackbarOnClose =(event, reason) =>{
        if(reason === "clickaway"){
            return;
        }

        setAlertOpen(false);
    }

    const CustomSnackbar = () => {
        return (
            <Snackbar open={alertOpen} onClose={snackbarOnClose} autoHideDuration={6000} className="errorAlert">
                <Alert>{alertText}</Alert>
            </Snackbar>
        )
    }

    useEffect(() => {
        let list = document.querySelectorAll('p[data-type="Day"]')
        list.forEach(element => {
            element.innerHTML = element.firstChild?.data.replace('\n', '<br>');
            if (element.innerHTML == "undefined") {
                element.innerHTML = "-";
            }
        });
        let listBlocksForColors = document.querySelectorAll('.dayWeekContainer > div:first-child');
        let listBlocksForColors1 = document.querySelectorAll('.dayWeekContent > div:first-child');
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

    const handleDateChange = (newValue) => {
        setDateFormat(new DateFormat(new Date(newValue.year(), newValue.month(), newValue.date())));
        setValue(newValue);
        let val = document.querySelector('.headerCenterBlock >div >input');
        let img = document.querySelector('.reloadCat');
        let itemsShedule = document.querySelectorAll('.shedule *:not(img)')
        img.style = "opacity: 1; z-index: 3";
        handleGroupChange([]);
        let doc = document.querySelector('.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').value.split('.');
        axios.get(`http://192.168.147.51:81/api/lastdance/getgroupmobile/${val.value}?Date=${doc[1]}.${doc[0]}.${doc[2]}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    handleGroupChange(response.data);
                }
            }).catch(err => {

                console.log(err);
            })
        setTimeout(() => {
            img.style = "opacity: 0; z-index: 1";
            itemsShedule = document.querySelectorAll('.shedule > *:not(img)');
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
                    <p data-type="Day" data-typedata={element.Day}>{element.day.replace('\n', "<br>")}</p>
                    <p>{element.beginMobile}-{element.endMobile}</p>
                </div>);

        });
        return lessonBlocks;

    }

    const iconStyle = { fontSize: 45 }

    return (
        <div className="main">
            <div className="headerGrid">
                <div className="leftIconsBlock">
                    <IconButton >
                        <DoorBackOutlined style={iconStyle} />
                    </IconButton>
                    <NewSheduleButton />
                </div>
                <div className="headerCenterBlock">
                    <span>
                        .NEDIFAR
                    </span>
                    <GroupSelect handleGroupChange={handleGroupChange} />
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
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    >
                    </MobileDatePicker>
                </LocalizationProvider>
            </div>
            <div className="shedule">
                <p>LastDance</p>
                {spisok}
                <img className="reloadCat" src={ReloadCat}></img>
            </div>
            <CustomSnackbar />
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

class GroupSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [""],
            group: ""
        };
    }

    componentDidMount() {
        axios.get("http://192.168.147.51:81/api/lastdance/getgrouplist").then((response) => {
            if (response.status === 200) {
                this.setState({ list: response.data });
            }
        }).catch(err => {
            console.log("err")
        })
    }

    handleChange = (e) => {
        let img = document.querySelector('.reloadCat');
        let itemsShedule = document.querySelectorAll('.shedule *:not(img)')
        img.style = "opacity: 1; z-index: 3";
        let doc = document.querySelector('.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input').value.split('.');
        this.setState({ group: e.target.value, })
        this.props.handleGroupChange([]);
        axios.get(`http://192.168.147.51:81/api/lastdance/getgroupmobile/${e.target.value}?Date=${doc[1]}.${doc[0]}.${doc[2]}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.props.handleGroupChange(response.data);

                }
            }).catch(err => {
                console.log(err);
            })
        setTimeout(() => {
            img.style = "opacity: 0; z-index: 1";
            itemsShedule = document.querySelectorAll('.shedule > *:not(img)');
            itemsShedule.forEach(element => {
                element.style = "";
            });
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
            <Select variant="standard" value={this.state.group} onChange={this.handleChange} IconComponent={undefined} className="groupSelect" >
                {this.selectItem()}
            </Select>
        );
    }
}


export default Group;