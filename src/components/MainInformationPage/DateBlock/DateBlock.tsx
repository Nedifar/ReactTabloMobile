import { TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "./dateblock.scss"
import DateFormat from "../../../lib/DateFormat";
import { Dayjs } from "dayjs";

function DateBlock({ dateFormat, dateValue, handleDateChange, setValue, setOldDate}: DateBlockProps) {
    const locale = 'ru';

    return (
        <div className="dateBlock">
            <div>
                <div>
                    <p>{dateFormat.downDay}</p>
                    <p>{dateFormat.getMonth(dateFormat.dDownDay!)}</p>
                    <div>
                        <div className="circle-left"></div>
                        <div className="stripe-left"></div>
                    </div>
                </div>
            </div>
            <div>
                <div className="rightDateContainer">
                    <p>{dateFormat.upDay}</p>
                    <p>{dateFormat.getMonth(dateFormat.dUpDay!)}</p>
                    <div className="rightStripeContainer">
                        <div className="stripe-right"></div>
                        <div className="circle-right"></div>
                    </div>
                </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <MobileDatePicker className="weekDate"
                    value={dateValue}
                    onAccept={handleDateChange}
                    onChange={(newValue) => {
                        setOldDate(dateValue);
                        setValue(newValue!);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                >
                </MobileDatePicker>
            </LocalizationProvider>
        </div>)
}

type DateBlockProps = {
    dateFormat: DateFormat,
    dateValue: Dayjs,
    handleDateChange: (newValue: Dayjs|null) => void,
    setValue: React.Dispatch<React.SetStateAction<Dayjs>>,
    setOldDate: React.Dispatch<React.SetStateAction<Dayjs>>
}

export default DateBlock;