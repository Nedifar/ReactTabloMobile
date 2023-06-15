import { LessonBlockProps, WeekBlockProps } from "../../../lib/CustomTypes";
import "./sheduleblock.scss"

function WeekBlock({ dayWeek, dateFormat, counter }: WeekBlockProps) {
    return (
        <div className="buttonDayWeekContainer" key={dayWeek.dayWeekName}>
            <button type="button" onClick={handleOpenDayWeekContainer} className="dayWeekContainer">
                <div>

                </div>
                <div>
                    <div>
                        <p>{dateFormat.addDays(counter).getDate()}</p>
                        <span>{dateFormat.getMonth(dateFormat.addDays(counter))}</span>
                    </div>
                    <div>

                    </div>
                    <div>
                        {dayWeek.dayWeekName}
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
                        {getLessonBlock(dayWeek.dayWeekClasses)}
                    </div>
                </div>
            </div>
        </div>
    );

    function handleOpenDayWeekContainer(e: React.MouseEvent) {
        const content: HTMLElement = e.currentTarget.nextElementSibling! as HTMLElement;
        if (content.style.maxHeight) {
            content.style.maxHeight = "";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    function getLessonBlock(lessons: LessonBlockProps[]) {
        return lessons.map(element => {
            return (
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