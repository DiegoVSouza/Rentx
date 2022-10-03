import { User } from "../../../../shared/infra/typeorm/entities/User";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../interfaces/IUsersRepository";


class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = []

    async create({ name, email, password, driver_license, }: ICreateUserDTO): Promise<void> {
        const user = new User()
        Object.assign(user, {
            driver_license, name, password, email
        })

        this.users.push(user)
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email)
    }

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id)
    }

}

export { UsersRepositoryInMemory }