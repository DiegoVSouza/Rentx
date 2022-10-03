import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "../../repositories/interfaces/IRentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository
    ) { }
    async execute(user_id: string) {
        const rentalsByUser = await this.rentalRepository.findByUser(user_id)
        return rentalsByUser
    }
}
export { ListRentalsByUserUseCase }