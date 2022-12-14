import { Car } from "../../../../shared/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO"

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]>;
    findById(car_id: string): Promise<Car>;
    updateAvailable(car_id: string, available: boolean): Promise<void>;
}

export { ICarsRepository }