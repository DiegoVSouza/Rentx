
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm/dataSourceConfig";
import { Category } from "../../../../../shared/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/interfaces/ICategoriesRepository";

const dataSource = AppDataSource
class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>

    constructor() {
        this.repository = dataSource.getRepository(Category)
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {

        const category = this.repository.create({
            description,
            name
        })
        await this.repository.save(category)
    }


    async list(): Promise<Category[]> {
        const categories = await this.repository.find(undefined)
        return categories
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ where: { name: name } })
        return category
    }
}

export { CategoriesRepository }