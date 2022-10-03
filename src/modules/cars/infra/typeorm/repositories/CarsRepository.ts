import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm/dataSourceConfig";
import { Car } from "../../../../../shared/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/interfaces/ICarsRepository";

const dataSource = AppDataSource
class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>
    constructor() {
        this.repository = dataSource.getRepository(Car)
    }

    async create({ name, description, category_id, daily_rate, fine_amount, brand, license_plate, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name, description, category_id, daily_rate, fine_amount, brand, license_plate, specifications, id
        })

        await this.repository.save(car)

        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ where: { license_plate: license_plate } })
        return car
    }

    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository.createQueryBuilder("c")
            .where("available = :available", { available: true })

        if (brand) { carsQuery.andWhere("c.brand = :brand", { brand }) }
        if (name) { carsQuery.andWhere("c.name = :name", { name }) }
        if (category_id) { carsQuery.andWhere("c.category_id = :category_id", { category_id }) }

        const cars = await carsQuery.getMany()
        return cars
    }

    async findById(car_id: string): Promise<Car> {
        const car = await this.repository.findOne({ where: { id: car_id } })
        return car
    }
    async updateAvailable(car_id: string, available: boolean): Promise<void> {
        await this.repository.createQueryBuilder().update().set({ available }).where("id=:id")
            .setParameter("id", car_id).execute()

        return
    }

}

export { CarsRepository }