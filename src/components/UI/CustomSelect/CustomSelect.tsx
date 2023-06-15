import { MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React from 'react'
import "./CustomSelect.scss"
import { DayWeekType } from '../../../lib/CustomTypes';

type CustomSelectProps = {
    url: string,
    nameComponent: string,
    reset?: boolean,
    handleSelectorChange: (arg1: DayWeekType[]) => void,
    dialogActions: React.Dispatch<React.SetStateAction<{
        ok: () => void;
        cancel: () => void;
    }>>,
    setOOpen: (arg1: {
        open: boolean,
        text?: string
    }) => void
}

type CustomSelectState = {
    list: string[],
    selectValue: string,
    currentDate: string,
}

class CustomSelect extends React.Component<CustomSelectProps, CustomSelectState> {
    constructor(props: CustomSelectProps) {
        super(props);
        let upperNameComp = this.props.nameComponent.toUpperCase();
        let targetUp = upperNameComp[0] + this.props.nameComponent.slice(1);
        this.favorite = { value: localStorage.getItem(`favorite${targetUp}Value`), viewWithRun: localStorage.getItem(`favorite${targetUp}Checked`) };
    }

    state = {
        list: [""],
        selectValue: "",
        currentDate: (+(new Date().getMonth()) + 1) + "." + new Date().getDate() + "." + new Date().getFullYear()
    };

    url = this.props.url;
    favorite: { value: string | null, viewWithRun: string | null };

    componentDidMount() {
        loadSelectData(this.props.nameComponent, this);
    }

    componentDidUpdate(prevProps: CustomSelectProps, prevState: CustomSelectState): void {
        if (prevState.currentDate !== this.state.currentDate)
            loadSelectData(this.props.nameComponent, this);
        if (prevProps.reset) {
            this.handleChange({ target: "" });
        }
    }

    handleChange = (e: { target: any }): void => {
        const img: HTMLElement = document.querySelector(`#${this.props.nameComponent}Main .reloadCat`)!;
        let itemsShedule: NodeListOf<HTMLElement> = document.querySelectorAll(`#${this.props.nameComponent}Main.shedule *:not(img)`);
        const shed: HTMLElement = document.querySelector(`#${this.props.nameComponent}Main .shedule`)!;
        img.setAttribute('style', `opacity: 1; z-index: 3`);
        shed.setAttribute('style', "overflow: hidden");
        const doc: string[] = (document.querySelector(`#${this.props.nameComponent}Main .dateBlock input`) as HTMLInputElement)
            .value.split('.');
        axios.get(this.url + `/api/lastdance/get${this.props.nameComponent}mobile?${this.props.nameComponent}=${e.target.value.replace('☆', '')}&Date=${doc[1]}.${doc[0]}.${doc[2]}`)
            .then((response) => {
                if (response.status === 200) {
                    this.props.handleSelectorChange([]);
                    console.log(response.data);
                    this.props.handleSelectorChange(response.data);
                    this.setState({ selectValue: e.target.value, })
                }
            }).catch(() => {
                this.props.dialogActions({
                    ok: () => {
                        this.props.setOOpen({ open: false });
                        this.handleChange(e);
                    },
                    cancel: () => {
                        this.props.setOOpen({ open: false });
                    }
                });
                setTimeout(() => this.props.setOOpen({ open: true, text: "Ошибка подключения, вы хотите повторить?" }), 3000);
            })

        setTimeout(() => {
            img.setAttribute('style', "opacity: 0; z-index: 1");
            itemsShedule = document.querySelectorAll(`#${this.props.nameComponent}Main .shedule > *:not(img)`);
            itemsShedule.forEach(element => {
                element.setAttribute('style', "");
            });
            shed.setAttribute('style', "overflow: scroll");
        }, 3000);
    }

    selectItem() {
        return this.state.list.map(element => {
            return <MenuItem value={element} key={element}>{element}</MenuItem>;
        });
    }

    render() {
        return (
            <Select variant="standard"
                value={this.state.selectValue}
                onChange={this.handleChange}
                IconComponent={undefined}
                className="customSelect" >
                {this.selectItem()}
            </Select>
        );
    }
}

function loadSelectData(nameComponent: string, select: CustomSelect) {
    axios.get(select.url + `/api/lastdance/get${nameComponent}slist?date=${select.state.currentDate}`).then((response) => {
        if (response.status === 200) {
            let indexRemove = response.data.indexOf(select.favorite.value);
            if (select.favorite.value !== null && indexRemove !== -1) {
                response.data.unshift("☆" + select.favorite.value);
                response.data.splice(indexRemove + 1, 1);
            }
            select.setState({ list: response.data });
            if (select.favorite.viewWithRun === "true") {
                select.handleChange({ target: { value: "☆" + select.favorite.value } });
            }
        }
    }).catch(() => {
        select.props.dialogActions({
            ok: () => {
                select.props.setOOpen({ open: false });
                select.componentDidMount();
            },
            cancel: () => {
                select.props.setOOpen({ open: false });
            }
        });
        select.props.setOOpen({ open: true, text: "Ошибка подключения, вы хотите повторить?" });
        console.log("err")
    })
}

export default CustomSelect;