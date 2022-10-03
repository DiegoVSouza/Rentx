import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository"
import { CarsRepositoryInMemory } from "../../modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "../../modules/cars/useCases/listAvalibleCars/ListAvailableCarsUseCase"

let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })
    it("should be able to list all avalibe cars", async () => {
        const car = await carsRepositoryInMemory.create(
            {
                name: "car01",
                description: "description01",
                daily_rate: 100,
                license_plate: "AAAA",
                fine_amount: 50,
                brand: "Nome",
                category_id: "123"
            }
        )

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car])

    })

    it("should be able to list all avalible cars by brand", async () => {
        const car = await carsRepositoryInMemory.create(
            {
                name: "car01",
                description: "description01",
                daily_rate: 100,
                license_plate: "AAAA",
                fine_amount: 50,
                brand: "Nome2",
                category_id: "123"
            }
        )

        const cars = await listCarsUseCase.execute({
            brand: "Nome2"
        });
        expect(cars).toEqual([car])
    })
    it("should be able to list all avalible cars by name", async () => {
        const car = await carsRepositoryInMemory.create(
            {
                name: "car01",
                description: "description01",
                daily_rate: 100,
                license_plate: "AAAA",
                fine_amount: 50,
                brand: "Nome2",
                category_id: "123"
            }
        )

        const cars = await listCarsUseCase.execute({
            name: "car02"
        });
        expect(cars).toEqual([car])
    })
    it("should be able to list all avalible cars by category id", async () => {
        const car = await carsRepositoryInMemory.create(
            {
                name: "car01",
                description: "description01",
                daily_rate: 100,
                license_plate: "AAAA",
                fine_amount: 50,
                brand: "Nome2",
                category_id: "1234"
            }
        )

        const cars = await listCarsUseCase.execute({
            category_id: "1234"
        });
        expect(cars).toEqual([car])
    })
})