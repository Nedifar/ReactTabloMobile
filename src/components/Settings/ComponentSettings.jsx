import { Checkbox, FormControlLabel, Select } from "@mui/material";
import { useState } from "react";

function ComponentSettings(props) {
    let upperCase = props.target.toUpperCase()
    let targetUp = upperCase[0] + props.target.slice(1);

    const handleSelectedChange = (e) => {
        if (e == true || e == false) {
            localStorage.setItem(`favorite${targetUp}Checked`, e);
            return;
        }
        if (e.target.value == "Не выбрано") {
            localStorage.setItem(`favorite${targetUp}Checked`, false);
        }
        props.setSelectedValue(e.target.value);
        localStorage.setItem(`favorite${targetUp}Value`, e.target.value);
    }

    const favoriteGroupContent = () => {
        switch (props.content) {
            case 'Группы':
                return 'Избранная группа';
            case 'Кабинеты':
                return 'Избранный кабинет';
            case 'Преподаватели':
                return 'Избранный преподаватель';
        }
    }

    return (
        <div className={props.target + "Settings"}>
            <p>{props.content}</p>
            <div>
                <div>
                    <span>{favoriteGroupContent()}:</span>
                </div>
                <div>
                    <Select variant="standard" value={props.selectedValue} onChange={handleSelectedChange} className={props.target + "SelectSet"}>
                        {props.listElems}
                    </Select>
                </div>
                <div>
                    <MyCheckBox
                        haveValue={props.selectedValue == "" || props.selectedValue == "Не выбрано" ? true : false}
                        setLocalStorage={handleSelectedChange}
                        onChange={props.setSelectedChecked}
                        checked={props.selectedChecked === "true"}
                        className="checkByRun" />
                </div>
            </div>
        </div>);
}

function MyCheckBox(props) {
    const [checkValue, setCheckValue] = useState(props.checked ?? false);

    const handleCheckChanged = (e) => {
        let check = !checkValue;
        setCheckValue(check);
        props.onChange(check);
        props.setLocalStorage(check);
    }

    return (
        <FormControlLabel control={<Checkbox disabled={props.haveValue} checked={checkValue} onChange={handleCheckChanged} />} label="Выводить по умолчанию при загрузке?" />
    );
}

export default ComponentSettings;
