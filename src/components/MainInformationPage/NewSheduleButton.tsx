import { NewReleases } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
const iconStyle = { fontSize: 45 }

function NewSheduleButton({handleDateChange, newShedule}: NewSheduleButtonProps) {

    const handleClickNewSheduleButton = () => {
        const newShedDate : Dayjs = dayjs(new Date().toDateString());
        handleDateChange(newShedDate.add(7, 'day'));
    }

    if (newShedule) {
        return (
            <IconButton onClick={handleClickNewSheduleButton}>
                <NewReleases style={iconStyle} />
            </IconButton>);
    }
    else {
        return null;
    }
};

type NewSheduleButtonProps = {
    handleDateChange: (newValue: Dayjs) => void,
    newShedule: boolean
}

export default NewSheduleButton;