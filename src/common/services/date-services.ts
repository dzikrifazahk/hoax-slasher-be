const padTo2Digit = (number: number) =>
  number < 10 ? `0${number}` : String(number);

export class DateService {
  static getTodayMidnightDate() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  static formatYYMMDD(date: Date, separator = '/') {
    const theDate = padTo2Digit(date.getDate());
    const theMonth = padTo2Digit(date.getMonth() + 1);
    const theYear = padTo2Digit(date.getFullYear() % 100);

    return [theYear, theMonth, theDate].join(separator);
  }

  static formatDDMMYYYY(date: Date, separator = '/') {
    const theDate = padTo2Digit(date.getDate());
    const theMonth = padTo2Digit(date.getMonth() + 1);
    const theYear = padTo2Digit(date.getFullYear());

    return [theDate, theMonth, theYear].join(separator);
  }

  static formatDDMMYY(date: Date, separator = '/') {
    const theDate = padTo2Digit(date.getDate());
    const theMonth = padTo2Digit(date.getMonth() + 1);
    const theYear = padTo2Digit(date.getFullYear() % 100);

    return [theDate, theMonth, theYear].join(separator);
  }

  static toMidnight(date: Date) {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  static toLastTimeOfTheDay(date: Date) {
    date.setHours(23, 59, 59, 59);
    return date;
  }

  static getDaysBetweenDates(startDate: Date, endDate: Date) {
    const dates: string[] = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(d.toDateString());
    }
    return dates;
  }

  static getThreeMonthsAfterDate(startDate: Date) {
    const months: Date[] = [];
    const startMonth = startDate.getMonth();
    const maxMonth = startMonth + 3;
    for (let index = startMonth; index < maxMonth; index++) {
      months.push(new Date(startDate.getFullYear(), index, 1));
    }
    return months;
  }

  static getMonthsInYear(startDate: Date) {
    const months: Date[] = [];
    const startMonth = startDate.getMonth();
    const maxMonth = startMonth + 12;
    for (let index = startMonth; index < maxMonth; index++) {
      months.push(new Date(startDate.getFullYear(), index, 1));
    }
    return months;
  }
}
