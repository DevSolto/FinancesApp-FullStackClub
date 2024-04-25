import { PostgresHelper } from "../../database/postgres/helper.js";

export class PostgresGetUserByEmailRepository{
  async execute(userEmail){
    const user = await PostgresHelper.query(
      "Select * from users where email = $1",
      [
        userEmail
      ]
    )
    return user[0]
  }
}