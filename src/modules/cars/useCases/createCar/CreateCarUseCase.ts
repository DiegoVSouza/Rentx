import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { Car } from "../../../../shared/infra/typeorm/entities/Car"
import { ICarsRepository } from "../../repositories/interfaces/ICarsRepository"

interface IRequest {
    name: string,
    description: string,
    daily_rate: number,
    license_plate: string,
    fine_amount: number,
    brand: string,
    category_id: string
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: IRequest): Promise<Car> {
        const carAlredyExists = await this.carsRepository.findByLicensePlate(license_plate)

        if (carAlredyExists) throw new AppError("Car already exists")

        const car = await this.carsRepository.create({ name, description, category_id, daily_rate, fine_amount, brand, license_plate })

        return car
    }
}

export { CreateCarUseCase }