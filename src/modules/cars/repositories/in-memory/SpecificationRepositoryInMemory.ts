import { Specification } from "../../../../shared/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../interfaces/ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    specification: Specification[] = []

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification()
        Object.assign(specification, { name, description })
        this.specification.push(specification)
        return specification
    }

    async findByName(name: string): Promise<Specification> {
        return this.specification.find(specification => specification.name === name)
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.specification.filter(specification => ids.includes(specification.id))
        return specifications
    }
}

export { SpecificationRepositoryInMemory }