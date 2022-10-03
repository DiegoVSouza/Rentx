import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm/dataSourceConfig";
import { CarImage } from "../../../../../shared/infra/typeorm/entities/CarImage";
import { ICarsImageRepository } from "../../../repositories/interfaces/ICarsImageRepository";

const dataSource = AppDataSource
class CarsImageRepository implements ICarsImageRepository {
    private repository: Repository<CarImage>
    constructor() {
        this.repository = dataSource.getRepository(CarImage)
    }

    async create(car_id: string, images_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            images_name
        })
        await this.repository.save(carImage)
        return carImage
    }
}
export { CarsImageRepository }