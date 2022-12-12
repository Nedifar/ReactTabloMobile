import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button'
import "./groupstyle.css"
import { IconButton, TextField } from "@mui/material";
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

function Group() {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(dayjs('2022-04-07'));
    const [locale, setLocale] = useState('ru');
    const [spisok, setSpisok] = useState([]);

    const handleGroupChange = (dayWeeks) => {
        setSpisok(getWeekBlocks(dayWeeks));
    }

    const getWeekBlocks = (dayWeeks) => {
        let content = [];
        dayWeeks.forEach(element => {
            content.push(
                <div className="buttonDayWeekContainer" key={element.dayWeekName}>
                    <button type="button" onClick={expander} className="dayWeekContainer">
                        <div>

                        </div>
                        <div>
                            <div>
                                <p>05</p>
                                <span>декабрь</span>
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
        });
        return content;
    };

    const getLessonBlock = (lessons) => {
        let lessonBlocks = [];
        lessons.forEach(element => {
            lessonBlocks.push(
                <div>
                    <p>{element.number}</p>
                    <p>08:30-09:15</p>
                    <p>
                        {element.decipline}
                    </p>
                </div>);
        });
        return lessonBlocks;
        
    }

    const iconStyle = { fontSize: 45 }

    return (
        <div className="main">
            <div className="headerGrid">
                <div className="leftIconsBlock">
                    <IconButton>
                        <DoorBackOutlined style={iconStyle} />
                    </IconButton>
                    <IconButton>
                        <NewReleases style={iconStyle} />
                    </IconButton>
                </div>
                <div className="headerCenterBlock">
                    <span>
                        .NEDIFAR
                    </span>
                    <GroupSelect handleGroupChange={handleGroupChange} />
                </div>
                <div className="rightItemsBlock">
                    <IconButton className="settingsButton">
                        <Settings style={{ fontSize: 35 }} />
                    </IconButton>
                </div>
            </div>
            <div className="dateBlock">
                <div>
                    <div>
                        <p>5</p>
                        <p>сентябрь</p>
                        <div>
                            <div className="circle"></div>
                            <div className="stripe"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="rightDateContainer">
                        <p>10</p>
                        <p>декабрь</p>
                        <div className="rightStripeContainer">
                            <div className="stripe-right"></div>
                            <div className="circle-right"></div>
                        </div>
                    </div>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                    <MobileDatePicker className="weekDate"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    >

                    </MobileDatePicker>
                </LocalizationProvider>

            </div>
            <div className="shedule">
                <p>LastDance</p>
                {spisok}
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
        this.setState({ group: e.target.value })
        axios.get(`http://192.168.147.51:81/api/lastdance/getgroup/${e.target.value}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.props.handleGroupChange(response.data);
                }
            }).catch(err => {
                console.log(err);
            })

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
            <Select variant="standard" value={this.group} onChange={this.handleChange} IconComponent={undefined} className="groupSelect" >
                {this.selectItem()}
            </Select>
        );
    }
}


export default Group;