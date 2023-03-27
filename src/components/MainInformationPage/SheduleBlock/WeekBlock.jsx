import "./sheduleblock.scss"

function WeekBlock(props) {
    return (
        <div className="buttonDayWeekContainer" key={props.dayWeek.dayWeekName}>
            <button type="button" onClick={handleOpenDayWeekContainer} className="dayWeekContainer">
                <div>

                </div>
                <div>
                    <div>
                        <p>{props.dateFormat.addDays(props.counter).getDate()}</p>
                        <span>{props.dateFormat.getMonth(props.dateFormat.addDays(props.counter))}</span>
                    </div>
                    <div>

                    </div>
                    <div>
                        {props.dayWeek.dayWeekName}
                    </div>
                </div>
            </button>
            <div className="dayWeekContent">
                <div>

                </div>
                <div>
                    <div>

                    </div>
                    <div>

                    </div>
                    <div className="intoDayWeekContent">
                        <p>
                            SHEDULE
                        </p>
                        {getLessonBlock(props.dayWeek.dayWeekClasses)}
                    </div>
                </div>
            </div>
        </div>
    );

    function handleOpenDayWeekContainer(e) {
        var content = e.currentTarget.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    function getLessonBlock(lessons) {
        return lessons.map(element => {
            return(
                <div key={element.Day + element.beginMobile}>
                    <p>
                        {element.number}
                    </p>
                    <p data-type="Day" data-typedata={element.Day}>
                        {element.day.replace('\n', "<br>").replace('\n', "<br>").replace('\n', "<br>")}
                    </p>
                    <p>
                        {element.beginMobile}-{element.endMobile}
                    </p>
                </div>);
        });
    }
}

export default WeekBlock;