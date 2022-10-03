import { CarsRepositoryInMemory } from "../../modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "../../modules/cars/repositories/in-memory/SpecificationRepositoryInMemory"
import { CreateCarSpecificationsUseCase } from "../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationsUseCase"
import { AppError } from "../../shared/errors/AppError"

let createCarsSpecificationUseCase: CreateCarSpecificationsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
        createCarsSpecificationUseCase = new CreateCarSpecificationsUseCase(carsRepositoryInMemory, specificationRepositoryInMemory)
    })
    it("should not be able to add new specification to a not-existent car ", async () => {
        const car_id = '123'
        const specifications_id = ["123", "123"]
        await expect(createCarsSpecificationUseCase.execute({ car_id, specifications_id })
        ).rejects.toEqual(new AppError("Car does not exist"))

    })
    it("should be able to add new specification to a car ", async () => {

        const specifications = await specificationRepositoryInMemory.create({
            description: "description01",
            name: 'name01',

        })
        const specifications_id = [specifications.id]

        const car = await carsRepositoryInMemory.create({
            name: "car01",
            description: "description01",
            daily_rate: 100,
            license_plate: "AAAA",
            fine_amount: 50,
            brand: "Nome",
            category_id: "123"
        })


        const SpecificationCars = await createCarsSpecificationUseCase.execute({ car_id: car.id, specifications_id })
        expect(SpecificationCars).toHaveProperty("specifications")
        expect(SpecificationCars.specifications.length).toBe(1)
    })
})