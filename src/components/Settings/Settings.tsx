import { ArrowBack } from "@mui/icons-material";
import { IconButton, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ComponentSettings from "./ComponentSettings";
import "./settings.scss"

const url = process.env.REACT_APP_API_LOCAL || window.location.origin + '/infotabloserver';

function Settings({ backSettingsClick, dialogActions, setOOpen }: SettingsProps) {
    const [groupList, setGroupState] = useState<JSX.Element[]>([]);
    const [cabinetList, setCabinetState] = useState<JSX.Element[]>([]);
    const [teacherList, setTeacherState] = useState<JSX.Element[]>([]);
    const [countGroup, setCountGroup] = useState<number>(0);
    const [countCabinet, setCountCabinet] = useState<number>(0);
    const [countTeacher, setCountTeacher] = useState<number>(0);
    const [groupSelectedValue, setGroupSelectedValue] = useState<string>("");
    const [cabinetSelectedValue, setCabinetSelectedValue] = useState<string>("");
    const [teacherSelectedValue, setTeacherSelectedValue] = useState<string>("");
    const [groupSelectedChecked, setGroupSelectedChecked] = useState<string | null>(localStorage.getItem("favoriteGroupChecked"));
    const [cabinetSelectedChecked, setCabinetSelectedChecked] = useState<string | null>(localStorage.getItem("favoriteCabinetChecked"));
    const [teacherSelectedChecked, setTeacherSelectedChecked] = useState<string | null>(localStorage.getItem("favoriteTeacherChecked"));

    function Universal(target: string, setCount: React.Dispatch<React.SetStateAction<number>>,
        setState: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
        setSelectedValue: React.Dispatch<React.SetStateAction<string>>, count: number) {

        if (count === 0) {
            const upperCase: string = target.toUpperCase();
            const targetUp: string = upperCase[0] + target.slice(1);
            const listResult: JSX.Element[] = [];
            const currentDate: Date = new Date();
            axios.get(url + `/api/lastdance/get${target}slist?date=${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`)
                .then((response) => {
                    if (response.status === 200) {
                        listResult.push(<MenuItem value="Не выбрано" key="Не выбрано">Не выбрано</MenuItem>)
                        response.data.forEach((elem: any) => {
                            listResult.push(<MenuItem value={elem} key={elem}>{elem}</MenuItem>)
                        })
                        setCount(1);
                        setState(listResult);
                        setSelectedValue(localStorage.getItem(`favorite${targetUp}Value`) ?? "");
                    }
                }).catch(() => {
                    dialogActions({
                        ok: () => {
                            setOOpen({ open: false });
                        },
                        cancel: () => {
                            setOOpen({ open: false });
                        }
                    });
                    setOOpen({ open: true, text: "Ошибка подключения, вы хотите повторить?" });

                })
        }
    }

    useEffect(() => { // eslint-disable-line react-hooks/exhaustive-deps
        Universal("group", setCountGroup, setGroupState, setGroupSelectedValue, countGroup);
    });

    useEffect(() => { // eslint-disable-line react-hooks/exhaustive-deps
        Universal("cabinet", setCountCabinet, setCabinetState, setCabinetSelectedValue, countCabinet);
    })

    useEffect(() => { // eslint-disable-line react-hooks/exhaustive-deps
        Universal("teacher", setCountTeacher, setTeacherState, setTeacherSelectedValue, countTeacher);
    })

    return (
        <div className="mainSettings">
            <div className="settingsHeader">
                <IconButton onClick={() => {
                    document.querySelector("#zaplatka")?.setAttribute('style', "z-index: 0");
                    backSettingsClick(false)
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

type SettingsProps = {
    backSettingsClick: React.Dispatch<React.SetStateAction<boolean>>;
    dialogActions: React.Dispatch<React.SetStateAction<{
        ok: () => void;
        cancel: () => void;
    }>>;
    setOOpen: React.Dispatch<React.SetStateAction<{
        open: boolean;
        text?: string;
    }>>
}

export default Settings;