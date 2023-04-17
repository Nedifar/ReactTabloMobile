class DateFormat {
    months = ['январь', 'феваль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    downDay: number | undefined;
    dDownDay: Date | undefined;
    upDay: number | undefined;
    dUpDay: Date | undefined;

    constructor(date: Date) {
        this.GetDate(date)
    }

    GetDate(date: Date) {
        let changableDate;
        switch (date.getDay()) {
            case 0:
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() + 1);
                this.downDay = changableDate.getDate();
                this.dDownDay = changableDate;
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() + 6);
                this.upDay = changableDate.getDate();
                this.dUpDay = changableDate;
                break;
            case 1:
                changableDate = new Date(date);
                changableDate.setDate(date.getDate());
                this.downDay = changableDate.getDate();
                this.dDownDay = changableDate;
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() + 5)
                this.upDay = changableDate.getDate();
                this.dUpDay = changableDate;
                break;
            case 2:
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() - 1);
                this.downDay = changableDate.getDate();
                this.dDownDay = changableDate;
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() + 4)
                this.upDay = changableDate.getDate();
                this.dUpDay = changableDate;
                break;
            case 3:
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() - 2);
                this.downDay = changableDate.getDate();
                this.dDownDay = changableDate;
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() + 3)
                this.upDay = changableDate.getDate();
                this.dUpDay = changableDate;
                break;
            case 4:
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() - 3);
                this.downDay = changableDate.getDate();
                this.dDownDay = changableDate;
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() + 2)
                this.upDay = changableDate.getDate();
                this.dUpDay = changableDate;
                break;
            case 5:
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() - 4);
                this.downDay = changableDate.getDate();
                this.dDownDay = changableDate;
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() + 1)
                this.upDay = changableDate.getDate();
                this.dUpDay = changableDate;
                break;
            case 6:
                changableDate = new Date(date);
                changableDate.setDate(date.getDate() - 5);
                this.downDay = changableDate.getDate();
                this.dDownDay = changableDate;
                changableDate = new Date(date);
                changableDate.setDate(date.getDate())
                this.upDay = changableDate.getDate();
                this.dUpDay = changableDate;
                break;
        }
    }

    addDays(days: number) {
        let dt = new Date(this.dDownDay!);
        dt.setDate(dt.getDate() + days);
        return dt;
    }

    getMonth(date: Date): string {
        return this.months[date.getMonth()];
    }

    getDay(date : Date) {
        let day : number = date.getDate()
    }
}

export default DateFormat;