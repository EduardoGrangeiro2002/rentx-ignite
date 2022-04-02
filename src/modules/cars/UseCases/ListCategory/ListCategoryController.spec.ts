import  Request  from "supertest"
import { app } from "@shared/infra/http/app"
import { Connection } from "typeorm"
import { hash } from "bcrypt"
import { v4 as uuidv4 } from "uuid"


import createConnection from '@shared/infra/typeorm'


let connection : Connection
describe("Create Category Controller",  () =>  {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations()


    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license ) 
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

    it("Should be able to list all Category", async () => {
      const responseToken = await Request(app).post("/sessions")
      .send({
        email: "admin@rentx.com.br",
        password: "admin"
      });

      const { refresh_token  } = responseToken.body;

      await Request(app).post("/categories")
      .send({
         name: "Category Supertest",
         description: "Description SuperTest"
      }).set({
          Authorization: `Bearer ${refresh_token}`
      });

      const response = await Request(app).get("/categories");



      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0].name).toEqual("Category Supertest");
    });
})