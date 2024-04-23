import { PostgresHelper } from "../../database/postgres/helper.js";

export class PostgresCreateUserRepository {
  async execute(createUserPrams) {
   await PostgresHelper.query(
      "insert into users (id, first_name, last_name, email, password) values ($1, $2, $3, $4, $5)",
      [
        createUserPrams.id,
        createUserPrams.first_name,
        createUserPrams.last_name,
        createUserPrams.email,
        createUserPrams.password
      ]
    )

    const createdUser = PostgresHelper.query(
      "select * from users where id = $1",
      [
        createUserPrams.id
      ]
    )
    return createdUser
  }
}