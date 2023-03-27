import { NewReleases } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
const iconStyle = { fontSize: 45 }

function NewSheduleButton(props) {

    const handleClickNewSheduleButton = () => {
        let newShedDate = dayjs(new Date().toDateString());
        props.handleDateChange(newShedDate.add(7, 'day'));
    }

    if (props.newShedule) {
        return (
            <IconButton onClick={handleClickNewSheduleButton}>
                <NewReleases style={iconStyle} />
            </IconButton>);
    }
    else {
        return null;
    }
};

export default NewSheduleButton;