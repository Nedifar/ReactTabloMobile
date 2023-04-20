import { TransitionProps } from "@mui/material/transitions";
import DateFormat from "./DateFormat";

export interface DialogProps {
    mainPageContainer: {
        upSliderTransition: React.ForwardRefExoticComponent<TransitionProps & {
            children: React.ReactElement<any, any>;
        } & React.RefAttributes<unknown>>;
    }
}

export type WeekBlockProps = {
    dayWeek: DayWeekType,
    dateFormat: DateFormat,
    counter: number
}

export type DayWeekType = {
    dayWeekName: string,
    dayWeekClasses: LessonBlockProps[]
}

export type LessonBlockProps = {
    beginMobile: string,
    endMobile: string,
    number: number | null,
    Day: string,
    day: string,
    teacherMobile: string,
}