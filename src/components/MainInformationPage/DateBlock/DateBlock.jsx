import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

function DateBlock(props) {
    const locale = 'ru';

    const handleDateChange = (newValue) => {
        let val = document.querySelector('#groupMain .headerCenterBlock >div >input');
        let img = document.querySelector('#groupMain .reloadCat');
        let itemsShedule = document.querySelectorAll('#groupMain .shedule *:not(img)')
        img.style = "opacity: 1; z-index: 3";
        props.handleGroupChange([]);
        let doc = document.querySelector('#groupMain .dateBlock input').value.split('.');
        axios.get(props.url + `/api/lastdance/getgroupmobile?group=${val.value}&Date=${+newValue.month() + 1}.${newValue.date()}.${newValue.year()}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    props.setDateFormat(new DateFormat(new Date(newValue.year(), newValue.month(), newValue.date())));
                    props.setDateValue(newValue);
                    props.handleGroupChange(response.data);
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
                                props.setDateValue(props.oldDate);
                                handleDateChange(props.oldDate);
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
            img.style = "opacity: 0; z-index: 1";
            itemsShedule = document.querySelectorAll('#groupMain .shedule > *:not(img)');
            itemsShedule.forEach(element => {
                element.style = "";
            });
        }, 3000);
    };

    return (
        <div className="dateBlock">
            <div>
                <div>
                    <p>{props.dateFormat.downDay}</p>
                    <p>{props.dateFormat.getMonth(dateFormat.dDownDay)}</p>
                    <div>
                        <div className="circle"></div>
                        <div className="stripe"></div>
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
                    onAccept={handleDateChange}
                    onChange={(newValue) => {
                        props.setOldDate(value);
                        props.setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                >
                </MobileDatePicker>
            </LocalizationProvider>
        </div>)
}

export default DateBlock;