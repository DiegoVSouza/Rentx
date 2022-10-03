
import { Request, Response } from "express"
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase"

class CreateSpecificationController {


    async handle(req: Request, res: Response): Promise<Response> {
        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)
        const { name, description } = req.body;
        await createSpecificationUseCase.execute({ name, description });
        return res.status(201).send();

    }
}

export { CreateSpecificationController }