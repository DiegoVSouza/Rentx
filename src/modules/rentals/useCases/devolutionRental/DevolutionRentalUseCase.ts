import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/interfaces/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/interfaces/ICarsRepository";
import { IRentalsRepository } from "../../repositories/interfaces/IRentalsRepository";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) { }
    async execute({ id, user_id }: IRequest) {
        const rental = await this.rentalRepository.findById(id)
        const car = await this.carsRepository.findById(rental.car_id)
        const minimumDaily = 1
        if (!rental) throw new AppError("Rental does not exists!")
        const dateNow = this.dateProvider.dateNow()
        const delay = this.dateProvider.compareInDays(
            rental.expected_return_date,
            dateNow

        )
        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            dateNow
        )

        let total = 0
        if (daily <= 0) daily = minimumDaily
        if (delay > 0) {
            const calculateFine = delay * car.fine_amount
            total = calculateFine
        }
        total += daily * car.daily_rate
        rental.end_date = dateNow
        rental.total = total

        await this.rentalRepository.create(rental)
        await this.carsRepository.updateAvailable(car.id, true)

        return rental
    }
}
export { DevolutionRentalUseCase }