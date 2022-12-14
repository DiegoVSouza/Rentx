import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import auth from "../../../../config/auth";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

interface IPayload {
    sub: string
}

export async function ensureAutheticate(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    const usersTokensRepository = new UsersTokensRepository()

    if (!authHeader) {
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(' ')
    try {
        const { sub: user_id } = verify(token, auth.refresh_secret_token) as IPayload
        const user = await usersTokensRepository.findUserByIdAndRefreshToken(user_id, token)
        if (!user) { throw new AppError('User does not exists', 401) }

        req.user = {
            id: user_id
        }

        next()
    } catch {
        throw new AppError("Invalid Token", 401)
    }

}