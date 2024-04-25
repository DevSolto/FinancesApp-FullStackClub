import { PostgresHelper } from "../../database/postgres/helper.js";

export class PostgresGetUserByIdRepository{
  async execute(userId){
    const user = await PostgresHelper.query(
      "select * from users where id = $1",
      [
        userId
      ]
    )
    return user[0]
  }
}