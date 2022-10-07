import { IDateProvider } from "../interfaces/IDateProvider";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { AppError } from '../../../../errors/AppError'
dayjs.extend(utc)


class DayjsDateProvider implements IDateProvider {
    compare(start_date: Date, end_Date: Date): number {
        const formattedEndDate = this.convertToUtc(end_Date)
        const formattedStarDate = this.convertToUtc(start_date)
        return dayjs(formattedEndDate).diff(formattedStarDate, "hours")
    }
    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format()
    }
    dateNow(): Date {
        return dayjs().toDate()
    }
    compareInDays(start_date: Date, end_Date: Date): number {
        const formattedEndDate = this.convertToUtc(end_Date)
        const formattedStarDate = this.convertToUtc(start_date)
        return dayjs(formattedEndDate).diff(formattedStarDate, "days")
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate()
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate()
    }
    compateIfBefore(start_date: Date, end_Date: Date): boolean {
        return dayjs(start_date).isBefore(end_Date)
    }

}
export { DayjsDateProvider }