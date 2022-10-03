import { CarsRepositoryInMemory } from "../../modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "../../modules/cars/useCases/createCar/CreateCarUseCase"
import { AppError } from "../../shared/errors/AppError"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })
    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "car01",
            description: "description01",
            daily_rate: 100,
            license_plate: "AAAA",
            fine_amount: 50,
            brand: "Nome",
            category_id: "123"
        })

        expect(car).toHaveProperty("id")
    })

    it("shouldn`t be able to create a car with existing license plate", async () => {
        await createCarUseCase.execute({
            name: "car01",
            description: "description01",
            daily_rate: 100,
            license_plate: "AAAA",
            fine_amount: 50,
            brand: "Nome",
            category_id: "123"
        })
        await expect(createCarUseCase.execute({
            name: "car01",
            description: "description01",
            daily_rate: 100,
            license_plate: "AAAA",
            fine_amount: 50,
            brand: "Nome",
            category_id: "123"
        })
        ).rejects.toEqual(new AppError("Car already exists"))
    })

    it("should be able to create a car with avalible true by default", async () => {

        const car = await createCarUseCase.execute({
            name: "car01",
            description: "description01",
            daily_rate: 100,
            license_plate: "AAAAB",
            fine_amount: 50,
            brand: "Nome",
            category_id: "123"
        })
        expect(car.available).toBe(true)
    })
})