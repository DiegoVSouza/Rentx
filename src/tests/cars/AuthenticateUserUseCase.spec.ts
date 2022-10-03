
import { ICreateUserDTO } from "../../modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { AuthenticateUserUseCase } from "../../modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase"
import { CreateUserUseCase } from "../../modules/accounts/useCases/createUser/CreateUserUseCase"
import { AppError } from "../../shared/errors/AppError"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })
    it("should be able autheticate a user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "123",
            name: "Nome01",
            password: "123",
            email: "email01@gmail.com"
        }
        await createUserUseCase.execute({
            driver_license: user.driver_license,
            name: user.name,
            password: user.password,
            email: user.email
        })

        const userAutheticated = await authenticateUserUseCase.execute({ email: user.email, password: user.password })

        expect(userAutheticated).toHaveProperty('token')
    })

    it("should not be able to authenticate an nonexist", async () => {
        await expect(authenticateUserUseCase.execute({ email: "email123@gmail.com", password: "123" })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })

    it("it should not be able de authenticate with incorret password", async () => {
        const user: ICreateUserDTO = {
            name: "Nome01",
            password: "123",
            driver_license: "123",
            email: "email01@gmail.com"
        }

        await createUserUseCase.execute({
            driver_license: user.driver_license,
            name: user.name,
            password: user.password,
            email: user.email
        })
        await expect(
            authenticateUserUseCase.execute({ email: user.email, password: "1234" })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })


})

