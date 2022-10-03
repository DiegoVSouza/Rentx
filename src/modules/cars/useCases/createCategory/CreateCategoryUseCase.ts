import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {
    }
    async execute({ description, name }: IRequest): Promise<void> {
        const categoryAlredyExist = await this.categoriesRepository.findByName(name);
        if (categoryAlredyExist) {
            throw new AppError("Category Already Exists!")
        }

        this.categoriesRepository.create({ name, description })

    }
}

export { CreateCategoryUseCase }