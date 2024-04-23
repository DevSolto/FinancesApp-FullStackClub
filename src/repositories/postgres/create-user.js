import { PostgresHelper } from "../../database/postgres/helper";

export class PostgresCreateUserRepository {
  async execute(createUserPrams) {
    const results = await PostgresHelper.query(
      "insert into users (id, first_name, last_name, email, password) values ($1, $2, $3, $4, $5)",
      [
        createUserPrams.id,
        createUserPrams.firstName,
        createUserPrams.lastName,
        createUserPrams.email,
        createUserPrams.password
      ]
    )
    return results[0]
  }
}