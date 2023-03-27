import { TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "./dateblock.scss"

function DateBlock(props) {
    const locale = 'ru';

    return (
        <div className="dateBlock">
            <div>
                <div>
                    <p>{props.dateFormat.downDay}</p>
                    <p>{props.dateFormat.getMonth(props.dateFormat.dDownDay)}</p>
                    <div>
                        <div className="circle-left"></div>
                        <div className="stripe-left"></div>
                    </div>
                </div>
            </div>
            <div>
                <div className="rightDateContainer">
                    <p>{props.dateFormat.upDay}</p>
                    <p>{props.dateFormat.getMonth(props.dateFormat.dUpDay)}</p>
                    <div className="rightStripeContainer">
                        <div className="stripe-right"></div>
                        <div className="circle-right"></div>
                    </div>
                </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <MobileDatePicker className="weekDate"
                    value={props.dateValue}
                    onAccept={props.handleDateChange}
                    onChange={(newValue) => {
                        props.setOldDate(props.dateValue);
                        props.setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                >
                </MobileDatePicker>
            </LocalizationProvider>
        </div>)
}

export default DateBlock;