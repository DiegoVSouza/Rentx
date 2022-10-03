import { container } from "tsyringe";
import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationsUseCase";
import { Response, Request } from "express"


class CreateCarSpecificationsController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { specifications_id } = req.body
        const createCarsSpecificationUseCase = container.resolve(CreateCarSpecificationsUseCase)
        const car = await createCarsSpecificationUseCase.execute({ car_id: id, specifications_id })
        return res.status(200).json(car)
    }
}

export { CreateCarSpecificationsController }