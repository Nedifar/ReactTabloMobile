import axios from 'axios';
import React from 'react'

class CustomSelect extends React.Component { //props nameComponent
    constructor(props) {
        super(props);
        this.state = {
            list: [""],
            selectValue: "",
            currentDate: (+(new Date().getMonth()) + 1) + "." + new Date().getDate() + "." + new Date().getFullYear()
        };
    }
    favorite = { value: localStorage.getItem(`${this.props.nameComponent}FavoriteValue`), viewWithRun: localStorage.getItem(`${this.props.nameComponent}FavoriteChecked`) }; //groupFavoriteValue

    componentDidMount() {
        loadSelectData(this.props.nameComponent, this);
    }

    componentDidUpdate(prevProps, prevState) {
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
        this.props.handleSelectorChange([]);
        axios.get(url + `/api/lastdance/get${this.props.nameComponent}mobile?${this.props.nameComponent}=${e.target.value.replace('☆', '')}&Date=${doc[1]}.${doc[0]}.${doc[2]}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.props.handleSelectorChange(response.data);
                    this.setState({ selectValue: e.target.value, })
                }
            }).catch(err => {

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
            <MenuItem value={element} key={element}>{element}</MenuItem>;
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
    let doc = document.querySelector(`#${nameComponent}Main .dateBlock input`)?.value.split('.');
    axios.get(url + `/api/lastdance/get${nameComponent}slist?date=${select.state.currentDate}`).then((response) => { //переделай запрос с getgrouplist на getgroupslist.
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