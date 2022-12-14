import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationRepository')
        private specificationsRepository: ISpecificationsRepository) {
    }
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlredyExist = await this.specificationsRepository.findByName(name);

        if (specificationAlredyExist) {
            throw new AppError("Specification Aleredy Existy!");

        }

        await this.specificationsRepository.create({
            name,
            description
        })


    }

}

export { CreateSpecificationUseCase }