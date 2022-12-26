import { ArrowBack } from "@mui/icons-material";
import { Checkbox, FormControlLabel, FormGroup, IconButton, MenuItem, selectClasses } from "@mui/material";
import { Select } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import "./settings.css"

const url = "http://192.168.147.51:81";

function Settings(props) {
    const [groupList, setGroupState] = useState([]);
    const [cabinetList, setCabinetState] = useState([]);
    const [teacherList, setTeacherState] = useState([]);
    const [countGroup, setCountGroup] = useState(0);
    const [countCabinet, setCountCabinet] = useState(0);
    const [countTeacher, setCountTeacher] = useState(0);
    const [groupSelectedValue, setGroupSelectedValue] = useState("");
    const [cabinetSelectedValue, setCabinetSelectedValue] = useState("");
    const [teacherSelectedValue, setTeacherSelectedValue] = useState("");
    const [groupSelectedChecked, setGroupSelectedChecked] = useState(localStorage.getItem("favoriteGroupChecked"));
    const [cabinetSelectedChecked, setCabinetSelectedChecked] = useState(localStorage.getItem("favoriteCabinetChecked"));
    const [teacherSelectedChecked, setTeacherSelectedChecked] = useState(localStorage.getItem("favoriteTeacherChecked"));

    useEffect(() => {
        if (countGroup == 0) {
            let listResult = [];
            let currentDate = new Date();
            axios.get(url + `/api/lastdance/getgrouplist?date=${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`)
                .then((response) => {
                    if (response.status === 200) {
                        listResult.push(<MenuItem value="Не выбрано" key="Не выбрано">Не выбрано</MenuItem>)
                        response.data.forEach((elem) => {
                            listResult.push(<MenuItem value={elem} key={elem}>{elem}</MenuItem>)
                        })
                        setCountGroup(1);
                        setGroupState(listResult);
                        setGroupSelectedValue(localStorage.getItem("favoriteGroupValue")?? "");
                    }
                }).catch(() => {
                    this.props.dialogActions({
                        ok: () => {
                            this.props.setOOpen({ open: false });
                            this.componentDidMount();
                        },
                        cancel: () => {
                            this.props.setOOpen({ open: false });
                        }
                    });
                    this.props.setOOpen({ open: true, text: "Ошибка подключения, вы хотите повторить?" });
                })
        }
    });

    useEffect(() => {
        if (countCabinet == 0) {
            let listResult = [];
            let currentDate = new Date();
            axios.get(url + `/api/lastdance/getcabinetslist?date=${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`)
                .then((response) => {
                    if (response.status === 200) {
                        listResult.push(<MenuItem value="Не выбрано" key="Не выбрано">Не выбрано</MenuItem>)
                        response.data.forEach((elem) => {
                            listResult.push(<MenuItem value={elem} key={elem}>{elem}</MenuItem>)
                        })
                        setCountCabinet(1);
                        setCabinetState(listResult);
                        setCabinetSelectedValue(localStorage.getItem("favoriteCabinetValue")?? "");
                    }
                }).catch(() => {
                    this.props.dialogActions({
                        ok: () => {
                            this.props.setOOpen({ open: false });
                            this.componentDidMount();
                        },
                        cancel: () => {
                            this.props.setOOpen({ open: false });
                        }
                    });
                    this.props.setOOpen({ open: true, text: "Ошибка подключения, вы хотите повторить?" });
                })
        }
    })

    useEffect(() => {
        if (countTeacher == 0) {
            let listResult = [];
            let currentDate = new Date();
            axios.get(url + `/api/lastdance/getteacherslist?date=${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`)
                .then((response) => {
                    if (response.status === 200) {
                        listResult.push(<MenuItem value="Не выбрано" key="Не выбрано">Не выбрано</MenuItem>)
                        response.data.forEach((elem) => {
                            listResult.push(<MenuItem value={elem} key={elem}>{elem}</MenuItem>)
                        })
                        setCountTeacher(1);
                        setTeacherState(listResult);
                        setTeacherSelectedValue(localStorage.getItem("favoriteTeacherValue")?? "");
                    }
                }).catch(() => {
                    this.props.dialogActions({
                        ok: () => {
                            this.props.setOOpen({ open: false });
                            this.componentDidMount();
                        },
                        cancel: () => {
                            this.props.setOOpen({ open: false });
                        }
                    });
                    this.props.setOOpen({ open: true, text: "Ошибка подключения, вы хотите повторить?" });
                })
        }
    })

    const handleGroupSelectedChange = (e) => {
        if (e == true || e == false) {
            localStorage.setItem("favoriteGroupChecked", e);
            return;
        }
        if (e.target.value == "Не выбрано") {
            localStorage.setItem("favoriteGroupChecked", false);
        }
        setGroupSelectedValue(e.target.value);
        localStorage.setItem("favoriteGroupValue", e.target.value);
    }

    const handleCabinetSelectedChange = (e) => {
        if (e == true || e == false) {
            localStorage.setItem("favoriteCabinetChecked", e);
            return;
        }
        if (e.target.value == "Не выбрано") {
            localStorage.setItem("favoriteCabinetChecked", false);
        }
        setCabinetSelectedValue(e.target.value);
        localStorage.setItem("favoriteCabinetValue", e.target.value);
    }

    const handleTeacherSelectedChange = (e) => {
        if (e == true || e == false) {
            localStorage.setItem("favoriteTeacherChecked", e);
            return;
        }
        if (e.target.value == "Не выбрано") {
            localStorage.setItem("favoriteTeacherChecked", false);
        }
        setTeacherSelectedValue(e.target.value);
        localStorage.setItem("favoriteTeacherValue", e.target.value);
    }

    const getListElemsForSelect = (nameSelect) => {
        return nameSelect == "group" ? groupList : (nameSelect == "cabinet" ? cabinetList : teacherList);
    }


    return (
        <div className="mainSettings">
            <div className="settingsHeader">
                <IconButton onClick={() => props.backSettingsClick(false)}>
                    <ArrowBack />
                </IconButton>
                <div>
                    <span>Настройки</span>
                </div>
            </div>
            <div className="groupSettings">
                <p>Группы</p>
                <div>
                    <div>
                        <span>Избранная группа:</span>
                    </div>
                    <div>
                        <Select variant="standard" value={groupSelectedValue} onChange={handleGroupSelectedChange} className="groupSelectSet">
                            {getListElemsForSelect("group")}
                        </Select>
                    </div>
                    <div>
                        <MyCheckBox haveValue={groupSelectedValue == "" || groupSelectedValue == "Не выбрано" ? true : false} setLocalStorage={handleGroupSelectedChange} onChange={setGroupSelectedChecked} checked={groupSelectedChecked === "true"} className="checkByRun" />
                    </div>
                </div>
            </div>
            <div className="cabinetSettings">
                <p>Кабинеты</p>
                <div>
                    <div>
                        <span>Избранный кабинет:</span>
                    </div>
                    <div>
                        <Select variant="standard" value={cabinetSelectedValue} onChange={handleCabinetSelectedChange} className="cabinetSelectSet">
                            {getListElemsForSelect("cabinet")}
                        </Select>
                    </div>
                    <div>
                        <MyCheckBox haveValue={cabinetSelectedValue == "" || cabinetSelectedValue == "Не выбрано" ? true : false} setLocalStorage={handleCabinetSelectedChange} onChange={setCabinetSelectedChecked} className="checkByRun" checked={cabinetSelectedChecked === "true"} />
                    </div>
                </div>
            </div>
            <div className="teacherSettings">
                <p>Преподаватели</p>
                <div>
                    <div>
                        <span>Избранный преподаватель:</span>
                    </div>
                    <div>
                        <Select variant="standard" value={teacherSelectedValue} onChange={handleTeacherSelectedChange} className="teacherSelectSet">
                            {getListElemsForSelect("teacher")}
                        </Select>
                    </div>
                    <div>
                        <MyCheckBox haveValue={teacherSelectedValue == "" || teacherSelectedValue == "Не выбрано" ? true : false} setLocalStorage={handleTeacherSelectedChange} onChange={setTeacherSelectedChecked} checked={teacherSelectedChecked === "true"} />
                    </div>
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

export default Settings;