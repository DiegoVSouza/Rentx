import { IsNull, Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm/dataSourceConfig";
import { Rental } from "../../../../../shared/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "../../../DTOs/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/interfaces/IRentalsRepository";
import { v4 } from "uuid";

const dataSource = AppDataSource
class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>
    constructor() {
        this.repository = dataSource.getRepository(Rental)
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const unavailableCar = await this.repository.findOne({
            where: { car_id, end_date: IsNull() }
        })
        return unavailableCar

    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const unavailableUser = await this.repository.findOne({ where: { user_id, end_date: IsNull() } })
        return unavailableUser
    }
    async create({ car_id, user_id, expected_return_date, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({ user_id, car_id, expected_return_date, id, end_date, total })
        await this.repository.save(rental)
        return rental
    }
    async findById(id: string): Promise<Rental> {
        const rental = this.repository.findOne({ where: { id: id } })
        return rental
    }
    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = this.repository.find({ where: { user_id }, relations: ["car"] })
        return rentals
    }
}

export { RentalsRepository }