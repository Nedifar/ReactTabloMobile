import { useEffect } from "react";
import ReloadCat from "../../../images/reloadcat.gif"
import "./sheduleblock.scss"

function SheduleBlock({ target,spisok }: SheduleBlockProps) {

    useEffect(() => {
        let list = document.querySelectorAll(`#${target}Main p[data-type="Day"]`)
        list.forEach(element => {
            element.innerHTML = element.firstChild?.textContent!.replace('\n', '<br>')!;
            if (element.innerHTML === "undefined") {
                element.innerHTML = "-";
            }
        });

        const listBlocksForColors = document.querySelectorAll(`#${target}Main .dayWeekContainer > div:first-child`);
        const listBlocksForColors1 = document.querySelectorAll(`#${target}Main .dayWeekContent > div:first-child`);
        const colors = ["#B96CBD", "#49A24D", "#FDA838", "#F75355", "#00C6AE", "#455399"];
        let counterColor = 0;
        for (let i = 0; i < listBlocksForColors.length; i++) {
            listBlocksForColors[i].setAttribute('style', `background-color: ${colors[counterColor]}`);
            listBlocksForColors1[i].setAttribute('style', `background-color: ${colors[counterColor]}`);
            if (counterColor < colors.length) {
                counterColor++;
            }
            else {
                counterColor = 0;
            }
        }
    })

    return (
        <div className="shedule">
            <p>InfoTab</p>
            <div className="contLessonsBlock">
                {spisok}
            </div>
            <img alt="catGif" className="reloadCat" src={ReloadCat}></img>
        </div>
    );
}

type SheduleBlockProps = {
    target: string,
    spisok: JSX.Element[]
}

export default SheduleBlock;
