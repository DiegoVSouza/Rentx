import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
    "type": "postgres",
    "port": 5432,
    "host": "localhost",
    "username": "docker",
    "password": "ignite",
    "database": "rentx",
    "migrations": [
        "./src/database/migrations/*.ts"
    ],
})