import { container } from "tsyringe";
import '../container/providers'

import { ICategoriesRepository } from "../../modules/cars/repositories/interfaces/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/interfaces/ISpecificationsRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/interfaces/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsRepository } from "../../modules/cars/repositories/interfaces/ICarsRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { CarsImageRepository } from "../../modules/cars/infra/typeorm/repositories/CarsImageRepository";
import { ICarsImageRepository } from "../../modules/cars/repositories/interfaces/ICarsImageRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/interfaces/IRentalsRepository";
import { RentalsRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/interfaces/IUsersTokensRepository";
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationRepository",
    SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)


container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)
container.registerSingleton<ICarsImageRepository>(
    "CarsImageRepository",
    CarsImageRepository
)
container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)
container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
)