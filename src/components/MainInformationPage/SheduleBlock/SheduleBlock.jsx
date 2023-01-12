import ReloadCat from "../../../images/reloadcat.gif"

function SheduleBlock(props) {
    return (
        <div className="shedule">
            <p>LastDance</p>
            <div className="contLessonsBlock">
                {spisok}
            </div>
            <img className="reloadCat" src={ReloadCat}></img>
        </div>
    );
}

export default SheduleBlock;
