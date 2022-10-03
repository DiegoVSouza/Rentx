import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { compare } from "bcrypt"
import { sign } from 'jsonwebtoken'
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/interfaces/IUsersTokensRepository";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/interfaces/IDateProvider";


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string,
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email)
        const { expires_in_token, refresh_secret_token, secret_token, expires_in_refresh_token, expires_refresh_token_days } = auth
        if (!user) { throw new AppError("Email or password incorrect") }

        const passwordMath = await compare(password, user.password)
        if (!passwordMath) { throw new AppError("Email or password incorrect") }

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        })

        const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

        const refresh_token = sign({ email }, refresh_secret_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        await this.usersTokensRepository.create({
            expires_date: refresh_token_expires_date,
            refresh_token,
            user_id: user.id
        })

        return {
            user,
            token,
            refresh_token
        }
    }
}

export { AuthenticateUserUseCase } 