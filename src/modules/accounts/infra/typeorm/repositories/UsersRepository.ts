import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm/dataSourceConfig";
import { User } from "../../../../../shared/infra/typeorm/entities/User";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";

const appdatasource = AppDataSource
class UsersRepository implements IUsersRepository {

    private repository: Repository<User>
    constructor() {
        this.repository = appdatasource.getRepository(User)
    }

    async create({ name, email, driver_license, password, avatar, id }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id
        });

        await this.repository.save(user)
    }
    async update({ name, email, driver_license, password, avatar, id }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id
        });

        await this.repository.save(user)
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ where: { email: email } })
        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ where: { id: id } })
        return user
    }

}

export { UsersRepository }