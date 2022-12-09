import React, { useState } from "react";
import Button from '@mui/material/Button'
import "./groupstyle.css"
import { IconButton, TextField } from "@mui/material";
import { DoorBackOutlined, Sledding } from "@mui/icons-material";
import NewReleases from "@mui/icons-material/NewReleasesOutlined";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

function Group() {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(dayjs('2022-04-07'));
    const [locale, setLocale] = useState('ru');

    const getWeekBlocks = () => {
        let content = [];
        for (let i = 0; i < 6; i++) {
            content.push(
                <Accordion className="expander">
                    <AccordionSummary>
                    <div className="dayWeekContainer">
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
                                    Понедельник
                                </div>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>ss</div>
                    </AccordionDetails>
                </Accordion>

            );
        }
        return content;
    };
    const iconStyle = { fontSize: 45 }
    return (
        <div className="main">
            <div className="headerGrid">
                <div className="leftIconsBlock">
                    <IconButton aria-aria-label="cabinetsButton">
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
                    <Select variant="standard" value="1" IconComponent={null} className="groupSelect">
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </div>
                <div className="rightItemsBlock">
                    <IconButton classsName="settingsButton">
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
                {getWeekBlocks()}
            </div>
        </div>
    );
}

export default Group;