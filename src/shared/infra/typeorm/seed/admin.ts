import { AppDataSource } from "../dataSourceConfig";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
const appDataSource = AppDataSource

console.log('ok')

async function create() {
    const id = uuidV4()
    const password = await hash('admin', 8)
    await appDataSource.initialize()
    await appDataSource.createQueryBuilder().insert().into('users').values([{ id: id, name: 'admin', password: password, email: 'admin@gmail.com', isAdmin: true, created_at: new Date(), driver_license: '123' }]).execute()

}

create().then(() => console.log("User admin created"))
