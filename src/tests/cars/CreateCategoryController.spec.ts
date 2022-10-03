import { hash } from 'bcrypt'
import { response } from 'express'
import request from 'supertest'
import { app } from '../../shared/infra/http/app'
import { AppDataSource } from '../../shared/infra/typeorm/dataSourceConfig'
import { v4 as uuidV4 } from "uuid";


let appDataSource = AppDataSource
describe("Create Category Controller", () => {
    beforeAll(async () => {
        await appDataSource.initialize()
        await appDataSource.runMigrations()
        const id = uuidV4()
        const password = await hash('admin', 8)
        await appDataSource.createQueryBuilder().insert().into('users').values([{ id: id, name: 'admin', password: password, email: 'admin@gmail.com', isAdmin: true, created_at: new Date(), driver_license: '123' }]).execute()
    })

    afterAll(async () => {
        await appDataSource.dropDatabase()
        await appDataSource.destroy()
    })
    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@gmail.com",
            password: "admin"
        })
        const { token } = responseToken.body

        const response = await request(app).post("/categories").send({
            name: "test",
            description: "test Category"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(201)
    })
    it("shouldn`t be able to create a new category with name exist", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@gmail.com",
            password: "admin"
        })
        const { token } = responseToken.body

        const response = await request(app).post("/categories").send({
            name: "test",
            description: "test Category"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(400)
    })
})