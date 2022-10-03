import { In, Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm/dataSourceConfig";
import { Specification } from "../../../../../shared/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/interfaces/ISpecificationsRepository";


const dataSource = AppDataSource
class SpecificationsRepository implements ISpecificationsRepository {

    private repository: Repository<Specification>

    constructor() {
        this.repository = dataSource.getRepository(Specification)
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name
        })

        await this.repository.save(specification)
        return specification
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ where: { name: name } })
        return specification
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findBy({ id: In(ids) })
        return specifications
    }
}



export { SpecificationsRepository }