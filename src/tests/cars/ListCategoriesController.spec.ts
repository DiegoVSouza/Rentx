import { hash } from 'bcrypt'
import { response } from 'express'
import request from 'supertest'
import { app } from '../../shared/infra/http/app'
import { AppDataSource } from '../../shared/infra/typeorm/dataSourceConfig'
import { v4 as uuidV4 } from "uuid";


let appDataSource = AppDataSource
describe("List Category Controller", () => {
    beforeAll(async () => {
        await appDataSource.initialize()
        await appDataSource.runMigrations()
        const id = uuidV4()
        const password = await hash('admin', 8)
        await appDataSource.createQueryBuilder().insert().into('users').values([{ id: id, name: 'admin', password: password, email: 'admin@gmail.com', isAdmin: true, created_at: new Date(), driver_license: '123' }]).execute()

    })
    beforeEach(async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@gmail.com",
            password: "admin"
        })
        const { refresh_token } = responseToken.body
        await request(app).post("/categories").send({
            name: "test",
            description: "test Category"
        }).set({
            Authorization: `Bearer ${refresh_token}`
        })
    })

    afterAll(async () => {
        await appDataSource.dropDatabase()
        await appDataSource.destroy()
    })
    it("should be able to list all the categories", async () => {

        const responseToken = await request(app).post("/sessions").send({
            email: "admin@gmail.com",
            password: "admin"
        })
        const { refresh_token } = responseToken.body
        await request(app).post("/categories").send({
            name: "test",
            description: "test Category"
        }).set({
            Authorization: `Bearer ${refresh_token}`
        })
        const response = await request(app).get("/categories")
        console.log(response.body)
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0].name).toEqual("test")
    })

})