import { Category } from "../../../../shared/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../interfaces/ICategoriesRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository {

    categories: Category[] = []

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {

        const category = new Category()
        Object.assign(category, {
            description,
            name
        })
        this.categories.push(category)
    }


    async list(): Promise<Category[]> {
        const categories = this.categories
        return categories
    }

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name === name)
        return category
    }

}

export { CategoriesRepositoryInMemory } 