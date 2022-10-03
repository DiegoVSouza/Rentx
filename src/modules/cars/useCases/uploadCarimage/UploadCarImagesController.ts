import { container } from "tsyringe";
import { Response, Request } from "express"
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
    filename: string
}
class UploadCarImagesController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const images = req.files as IFiles[]
        const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)

        const images_name = images.map((file) => file.filename)
        await uploadCarImagesUseCase.execute({ car_id: id, images_name })

        res.status(200).send()
    }
}

export { UploadCarImagesController }