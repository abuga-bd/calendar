import { Temporal } from '@js-temporal/polyfill';

export default class Calendar {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    day: number;
    month: number;
    year: number;
    date: Temporal.ZonedDateTime;
    currentMonth: number;
    currentYear: number;

    constructor() {
        this.date = Temporal.Now.zonedDateTimeISO();
        this.day = this.date.day;
        this.month = this.date.month;
        this.year = this.date.year;
        this.currentMonth = this.date.month;
        this.currentYear = this.date.year;
    }

    getDaysOfMonth(month?: number, padding = true): any[] {
        const calendar = [];
        let date = this.date.with({ month: month || this.month, day: 1 });

        if (padding === false) {
            for (let day = 0; day < date.daysInMonth; day++) {
                calendar.push({
                    day: this.days[date.dayOfWeek - 1],
                    date: date.day,
                    month: date.month,
                    currentMonth: month || this.month === date.month,
                    currentDay: (month || this.month === date.month) && this.day === date.day
                })
                date = date.add({ days: 1 });
            }

            return calendar;
        }

        date = date.subtract({ days: date.dayOfWeek - 1 });
        // iterate over lines in table
        for (let row = 0; row < 6; row++) {
            // iterate over days
            for (let day = 0; day < 7; day++) {
                calendar.push({
                    day: this.days[date.dayOfWeek - 1],
                    date: date.day,
                    month: date.month,
                    currentMonth: month || this.month === date.month,
                    currentDay:
                        (month || this.month === date.month) &&
                        this.day === date.day &&
                        this.currentMonth === this.month &&
                        this.currentYear === this.year
                })
                date = date.add({ days: 1 });
            }
        }

        return calendar;
    }

    getDay(): string {
        return this.days[this.day - 1];
    }

    getMonth(): string {
        return this.months[this.month - 1];
    }

    substractMonth(month: number = 1): void {
        this.date = this.date.subtract({ months: month });
        this.day = this.date.day;
        this.month = this.date.month;
        this.year = this.date.year;
    }

    addMonth(month: number = 1): void {
        this.date = this.date.add({ months: month });
        this.day = this.date.day;
        this.month = this.date.month;
        this.year = this.date.year;
    }
}