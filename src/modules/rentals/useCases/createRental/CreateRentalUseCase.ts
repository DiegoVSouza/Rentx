import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/interfaces/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../../../shared/infra/typeorm/entities/Rental";
import { ICarsRepository } from "../../../cars/repositories/interfaces/ICarsRepository";
import { IRentalsRepository } from "../../repositories/interfaces/IRentalsRepository";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }
    async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
        if (carUnavailable) throw new AppError("Car is Unavailable")
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)
        if (rentalOpenToUser) throw new AppError("Rental in progress for this user")

        const minimumHour = 24
        const compareHours = this.dateProvider.compare(this.dateProvider.dateNow(), expected_return_date)

        if (compareHours < minimumHour) throw new AppError("Invalid return time")
        const rental = await this.rentalsRepository.create({ user_id, car_id, expected_return_date })
        await this.carsRepository.updateAvailable(car_id, false)
        return rental
    }
}

export { CreateRentalUseCase }