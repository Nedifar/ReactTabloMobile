import { ArrowBack } from "@mui/icons-material";
import { Checkbox, FormControlLabel, FormGroup, IconButton, MenuItem, selectClasses } from "@mui/material";
import { Select } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import "./settings.css"

function Settings(props) {
    const [groupList, setGroupState] = useState([]);
    const [cabinetList, setCabinetState] = useState([]);
    const [teacherList, setTeacherState] = useState([]);
    const [countGroup, setCountGroup] = useState(0);
    const [countCabinet, setCountCabinet] = useState(0);
    const [countTeacher, setCountTeacher] = useState(0);
    const [groupSelectedValue, setGroupSelectedValue] = useState(localStorage.getItem("favoriteGroupValue"));
    const [cabinetSelectedValue, setCabinetSelectedValue] = useState(localStorage.getItem("favoriteCabinetValue"));
    const [teacherSelectedValue, setTeacherSelectedValue] = useState(localStorage.getItem("favoriteTeacherValue"));
    const [groupSelectedChecked, setGroupSelectedChecked] = useState(localStorage.getItem("favoriteGroupChecked"));
    const [cabinetSelectedChecked, setCabinetSelectedChecked] = useState(localStorage.getItem("favoriteCabinetChecked"));
    const [teacherSelectedChecked, setTeacherSelectedChecked] = useState(localStorage.getItem("favoriteTeacherChecked"));

    useEffect(() => {
        if (countGroup == 0) {
            let listResult = [];
            let currentDate = new Date();
            axios.get(`http://localhost:5014/api/lastdance/getgrouplist?date=${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`)
                .then((response) => {
                    if (response.status === 200) {
                        response.data.forEach((elem) => {
                            listResult.push(<MenuItem value={elem} key={elem}>{elem}</MenuItem>)
                        })
                        setCountGroup(1);
                        setGroupState(listResult);

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
            axios.get(`http://localhost:5014/api/lastdance/getcabinetslist?date=${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`)
                .then((response) => {
                    if (response.status === 200) {
                        response.data.forEach((elem) => {
                            listResult.push(<MenuItem value={elem} key={elem}>{elem}</MenuItem>)
                        })
                        setCountCabinet(1);
                        setCabinetState(listResult);
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
            axios.get(`http://localhost:5014/api/lastdance/getteacherslist?date=${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`)
                .then((response) => {
                    if (response.status === 200) {
                        response.data.forEach((elem) => {
                            listResult.push(<MenuItem value={elem} key={elem}>{elem}</MenuItem>)
                        })
                        setCountTeacher(1);
                        setTeacherState(listResult);
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
        if (e == null) {
            localStorage.setItem("favoriteGroupChecked", groupSelectedChecked);
            return;
        }
        setGroupSelectedValue( e.target.value );
        localStorage.setItem("favoriteGroupValue", e.target.value);
    }

    const handleCabinetSelectedChange = (e) => {
        if (e == null) {
            localStorage.setItem("favoriteCabinetChecked", cabinetSelectedChecked);
            return;
        }
        setCabinetSelectedValue( e.target.value );
        localStorage.setItem("favoriteCabinetValue", e.target.value);
    }

    const handleTeacherSelectedChange = (e) => {
        if (e == null) {
            localStorage.setItem("favoriteTeacherChecked", teacherSelectedChecked);
            return;
        }
        setTeacherSelectedValue( e.target.value );
        localStorage.setItem("favoriteTeacherValue", e.target.value);
    }

    const getListElemsForSelect = (nameSelect) => {
        return nameSelect == "group" ? groupList : (nameSelect == "cabinet" ? cabinetList : teacherList);
    }


    return (
        <div className="mainSettings">
            <div className="settingsHeader">
                <IconButton onClick={()=>props.backSettingsClick(true)}>
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
                        <MyCheckBox setLocalStorage={handleGroupSelectedChange} onChange={setGroupSelectedChecked} checked={groupSelectedValue} className="checkByRun" />
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
                        <MyCheckBox setLocalStorage={handleCabinetSelectedChange} onChange={setCabinetSelectedChecked} className="checkByRun" checked={cabinetSelectedValue} />
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
                        <MyCheckBox setLocalStorage={handleTeacherSelectedChange} onChange={setTeacherSelectedChecked} checked={teacherSelectedValue} />
                    </div>
                </div>
            </div>
        </div>);
}

function MyCheckBox(props) {
    const [checkValue, setCheckValue] = useState(props.checked);

    const handleCheckChanged = (e) => {
        let check = e.target.value == "on" ? true : false;
        setCheckValue(check);
        props.onChange(check);
        props.setLocalStorage();
    }

    return (
        <FormControlLabel control={<Checkbox checked={checkValue} onChange={handleCheckChanged} />} label="Выводить по умолчанию при загрузке?" />
    );
}

export default Settings;