import { Request, Response } from "express"
import { container } from "tsyringe"
import { ImportCategoryUseCase } from "./importCategoryUseCase"




class ImportCategoryController {


    async handle(req: Request, res: Response): Promise<Response> {

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

        const { file } = req

        await importCategoryUseCase.execute(file).catch((err) => {
            return res.status(400).send()

        }
        )

        return res.send()
    }
}

export { ImportCategoryController }