
interface IDateProvider {
    compare(start_date: Date, end_Date: Date): number;
    convertToUtc(date: Date): string;
    dateNow(): Date;
    compareInDays(start_date: Date, end_Date: Date): number;
    addDays(days: number): Date;
    addHours(hours: number): Date;
}
export { IDateProvider }