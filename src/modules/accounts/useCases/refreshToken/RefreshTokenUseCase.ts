import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";
import { IUsersTokensRepository } from "../../repositories/interfaces/IUsersTokensRepository";
import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/interfaces/IDateProvider";

interface IPayLoad {
    sub: string
    email: string
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) { }
    async execute(token: string): Promise<string> {

        const { email, sub } = verify(token, auth.refresh_secret_token) as IPayLoad
        const user_id = sub
        const userToken = await this.usersTokensRepository.findUserByIdAndRefreshToken(user_id, token)
        if (!userToken) { throw new AppError("Refresh token does not exist") }
        await this.usersTokensRepository.deleteById(userToken.id)

        const { refresh_secret_token, expires_in_refresh_token, expires_refresh_token_days } = auth

        const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

        const refresh_token = sign({ email }, refresh_secret_token, {
            subject: user_id,
            expiresIn: expires_in_refresh_token
        })

        await this.usersTokensRepository.create({
            expires_date: refresh_token_expires_date,
            refresh_token,
            user_id: user_id
        })

        return refresh_token

    }
}

export { RefreshTokenUseCase }