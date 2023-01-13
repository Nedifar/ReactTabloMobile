import { ArrowBack } from "@mui/icons-material";
import { IconButton, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ComponentSettings from "./ComponentSettings";
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

    function Universal(target, setCount, setState, setSelectedValue, count) {
        if (count == 0) {
            let upperCase = target.toUpperCase();
            let targetUp = upperCase[0] + target.slice(1);
            let listResult = [];
            let currentDate = new Date();
            axios.get(url + `/api/lastdance/get${target}slist?date=${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`)
                .then((response) => {
                    if (response.status === 200) {
                        listResult.push(<MenuItem value="Не выбрано" key="Не выбрано">Не выбрано</MenuItem>)
                        response.data.forEach((elem) => {
                            listResult.push(<MenuItem value={elem} key={elem}>{elem}</MenuItem>)
                        })
                        setCount(1);
                        setState(listResult);
                        setSelectedValue(localStorage.getItem(`favorite${targetUp}Value`) ?? "");
                    }
                }).catch(() => {
                    props.dialogActions({
                        ok: () => {
                            this.props.setOOpen({ open: false });
                            this.componentDidMount();
                        },
                        cancel: () => {
                            this.props.setOOpen({ open: false });
                        }
                    });
                    props.setOOpen({ open: true, text: "Ошибка подключения, вы хотите повторить?" });
                })
        }

    }

    useEffect(() => {
        Universal("group", setCountGroup, setGroupState, setGroupSelectedValue, countGroup);
    });

    useEffect(() => {
        Universal("cabinet", setCountCabinet, setCabinetState, setCabinetSelectedValue, countCabinet);
    })

    useEffect(() => {
        Universal("teacher", setCountTeacher, setTeacherState, setTeacherSelectedValue, countTeacher);
    })

    return (
        <div className="mainSettings">
            <div className="settingsHeader">
                <IconButton onClick={() => {
                    document.querySelector("#zaplatka").style = "z-index: 0";
                    props.backSettingsClick(false)
                }}>
                    <ArrowBack />
                </IconButton>
                <div>
                    <span>Настройки</span>
                </div>
            </div>
            <ComponentSettings
                target="group"
                content="Группы"
                selectedValue={groupSelectedValue}
                setSelectedValue={setGroupSelectedValue}
                setSelectedChecked={setGroupSelectedChecked}
                selectedChecked={groupSelectedChecked}
                listElems={groupList} />

            <ComponentSettings
                target="cabinet"
                content="Кабинеты"
                selectedValue={cabinetSelectedValue}
                setSelectedValue={setCabinetSelectedValue}
                setSelectedChecked={setCabinetSelectedChecked}
                selectedChecked={cabinetSelectedChecked}
                listElems={cabinetList} />

            <ComponentSettings
                target="teacher"
                content="Преподаватели"
                selectedValue={teacherSelectedValue}
                setSelectedValue={setTeacherSelectedValue}
                setSelectedChecked={setTeacherSelectedChecked}
                selectedChecked={teacherSelectedChecked}
                listElems={teacherList} />
        </div>);
}

export default Settings;