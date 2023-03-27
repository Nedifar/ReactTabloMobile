import { MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React from 'react'
import "./CustomSelect.scss"

class CustomSelect extends React.Component { //props nameComponent
    constructor(props) {
        super(props);
        this.state = {
            list: [""],
            selectValue: "",
            currentDate: (+(new Date().getMonth()) + 1) + "." + new Date().getDate() + "." + new Date().getFullYear()
        };
        this.url = props.url;
        let upperNameComp = this.props.nameComponent.toUpperCase();
        let targetUp = upperNameComp[0] + this.props.nameComponent.slice(1);
        this.favorite = { value: localStorage.getItem(`favorite${targetUp}Value`), viewWithRun: localStorage.getItem(`favorite${targetUp}Checked`) };
    }


    componentDidMount() {
        loadSelectData(this.props.nameComponent, this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentDate !== this.state.currentDate)
            loadSelectData(this.props.nameComponent, this);
        if (prevProps.reset) {
            this.handleChange({ target: "" });
        }
    }

    handleChange = (e) => {
        let img = document.querySelector(`#${this.props.nameComponent}Main .reloadCat`);
        let itemsShedule = document.querySelectorAll(`#${this.props.nameComponent}Main.shedule *:not(img)`);
        let shed = document.querySelector(`#${this.props.nameComponent}Main .shedule`);
        img.style = `opacity: 1; z-index: 3`;
        shed.style = "overflow: hidden";
        let doc = document.querySelector(`#${this.props.nameComponent}Main .dateBlock input`).value.split('.');
        axios.get(this.url + `/api/lastdance/get${this.props.nameComponent}mobile?${this.props.nameComponent}=${e.target.value.replace('☆', '')}&Date=${doc[1]}.${doc[0]}.${doc[2]}`)
            .then((response) => {
                if (response.status === 200) {
                    this.props.handleSelectorChange([]);
                    console.log(response.data);
                    this.props.handleSelectorChange(response.data);
                    this.setState({ selectValue: e.target.value, })
                }
            }).catch(err => {
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
            img.style = "opacity: 0; z-index: 1";
            itemsShedule = document.querySelectorAll(`#${this.props.nameComponent}Main .shedule > *:not(img)`);
            itemsShedule.forEach(element => {
                element.style = "";
            });
            shed.style = "overflow: scroll";
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

function loadSelectData(nameComponent, select) {
    axios.get(select.url + `/api/lastdance/get${nameComponent}slist?date=${select.state.currentDate}`).then((response) => { //переделай запрос с getgrouplist на getgroupslist.
        if (response.status === 200) {
            let indexRemove = response.data.indexOf(select.favorite.value);
            if (select.favorite.value != null && indexRemove != -1) {
                response.data.unshift("☆" + select.favorite.value);
                response.data.splice(indexRemove + 1, 1);
            }
            select.setState({ list: response.data });
            if (select.favorite.viewWithRun === "true") {
                select.handleChange({ target: { value: "☆" + select.favorite.value } });
            }
        }
    }).catch(err => {
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