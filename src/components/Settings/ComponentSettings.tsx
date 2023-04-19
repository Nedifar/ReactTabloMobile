import { Checkbox, FormControlLabel, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

function ComponentSettings({ target, setSelectedValue, content,
    selectedValue, listElems, setSelectedChecked, selectedChecked }: ComponentSettingsProps) {

    const upperCase: string = target.toUpperCase()
    const targetUp: string = upperCase[0] + target.slice(1);

    const handleSelectedChange = (e: SelectChangeEvent<string> | boolean): void => {
        if (e === true || e === false) {
            localStorage.setItem(`favorite${targetUp}Checked`, e.toString());
            return;
        }
        if (e.target.value === "Не выбрано") {
            localStorage.setItem(`favorite${targetUp}Checked`, 'false');
        }
        setSelectedValue(e.target.value);
        localStorage.setItem(`favorite${targetUp}Value`, e.target.value);
    }

    const favoriteGroupContent = () => {
        switch (content) {
            case 'Группы':
                return 'Избранная группа';
            case 'Кабинеты':
                return 'Избранный кабинет';
            case 'Преподаватели':
                return 'Избранный преподаватель';
        }
    }

    return (
        <div className="universalSettingsSection">
            <p>{content}</p>
            <div>
                <div>
                    <span>{favoriteGroupContent()}:</span>
                </div>
                <div className={target + "SelectContainer"}>
                    <Select variant="standard" value={selectedValue} onChange={handleSelectedChange} className='universalSelectSet'>
                        {listElems}
                    </Select>
                </div>
                <div>
                    <MyCheckBox
                        haveValue={selectedValue === "" || selectedValue === "Не выбрано" ? true : false}
                        setLocalStorage={handleSelectedChange}
                        onChange={setSelectedChecked}
                        checked={selectedChecked === "true"}
                        className="checkByRun" />
                </div>
            </div>
        </div>);
}

function MyCheckBox({ haveValue, setLocalStorage, onChange, checked, className }: MyCheckBoxProps) {
    const [checkValue, setCheckValue] = useState(checked ?? false);

    const handleCheckChanged = () => {
        let check = !checkValue;
        setCheckValue(check);
        onChange(check.toString());
        setLocalStorage(check);
    }

    return (
        <FormControlLabel control={<Checkbox disabled={haveValue} checked={checkValue} onChange={handleCheckChanged} />} label="Выводить по умолчанию при загрузке?" />
    );
}

type MyCheckBoxProps = {
    haveValue: boolean,
    setLocalStorage: (e: SelectChangeEvent<string> | boolean) => void,
    onChange: React.Dispatch<React.SetStateAction<string | null>>,
    checked: boolean,
    className: string
}

type ComponentSettingsProps = {
    target: string,
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>,
    content: string,
    selectedValue: string,
    listElems: JSX.Element[],
    setSelectedChecked: React.Dispatch<React.SetStateAction<string | null>>,
    selectedChecked: string | null
}

export default ComponentSettings;
