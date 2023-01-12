import ReloadCat from "../../../images/reloadcat.gif"

function SheduleBlock(props) {

    useEffect(() => {
        let list = document.querySelectorAll('#groupMain p[data-type="Day"]')
        list.forEach(element => {
            element.innerHTML = element.firstChild?.data.replace('\n', '<br>');
            if (element.innerHTML == "undefined") {
                element.innerHTML = "-";
            }
        });

        let listBlocksForColors = document.querySelectorAll('#groupMain .dayWeekContainer > div:first-child');
        let listBlocksForColors1 = document.querySelectorAll('#groupMain .dayWeekContent > div:first-child');
        let colors = ["#B96CBD", "#49A24D", "#FDA838", "#F75355", "#00C6AE", "#455399"];
        let counterColor = 0;
        for (let i = 0; i < listBlocksForColors.length; i++) {
            listBlocksForColors[i].style.backgroundColor = colors[counterColor];
            listBlocksForColors1[i].style.backgroundColor = colors[counterColor];
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
            <p>LastDance</p>
            <div className="contLessonsBlock">
                {props.spisok}
            </div>
            <img className="reloadCat" src={ReloadCat}></img>
        </div>
    );
}

export default SheduleBlock;
