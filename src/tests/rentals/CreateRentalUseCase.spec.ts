import dayjs from "dayjs"
import { CarsRepositoryInMemory } from "../../modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { RentalsRepositoryInMemory } from "../../modules/rentals/repositories/in-memory/RentalRepositoryInMemory"
import { CreateRentalUseCase } from "../../modules/rentals/useCases/createRental/CreateRentalUseCase"
import { DayjsDateProvider } from "../../shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AppError } from "../../shared/errors/AppError"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dateProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory
describe("Create Rental", () => {
    const dayAdd24hours = dayjs().add(1, 'day').toDate()
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dateProvider, carsRepositoryInMemory)
    })

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "name01",
            brand: "brand01",
            category_id: "123",
            daily_rate: 100,
            description: "123",
            fine_amount: 100,
            license_plate: "123",
        })
        const rental = await createRentalUseCase.execute({ car_id: car.id, expected_return_date: dayAdd24hours, user_id: "123" })

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })
    it("shouln`t be able to create a new rental if exist a open rental for the same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "1234",
            expected_return_date: dayAdd24hours,
            user_id: "123"
        })

        await expect(
            createRentalUseCase.execute({ car_id: "123", expected_return_date: dayAdd24hours, user_id: "123" })
        ).rejects.toEqual(new AppError("Rental in progress for this user"))

    })
    it("shouln`t be able to create a new rental if exist a open rental for the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "1234",
            expected_return_date: dayAdd24hours,
            user_id: "123"
        })
        await expect(createRentalUseCase.execute({ car_id: "1234", expected_return_date: dayAdd24hours, user_id: "222" })
        ).rejects.toEqual(new AppError("Car is Unavailable"))
    })
    it("shouln`t be able to create a new rental with invalid return time", async () => {
        await expect(createRentalUseCase.execute({ car_id: "123", expected_return_date: new Date(), user_id: "333" })
        ).rejects.toEqual(new AppError("Invalid return time"))
    })

})