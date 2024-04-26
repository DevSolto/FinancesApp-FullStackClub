import { PostgresHelper } from "../../database/postgres/helper"

export class PostgresUpdateUserRepository{
  async execute(userId, updateUserParams){
    const updateValues = []
    const updateFields = []

    Object.keys(updateUserParams).forEach((key)=>{
      updateFields.push(`${key} = $${updateValues.length + 1}`)
      updateValues.push(updateUserParams[key])
    })

    updateValues.push(userId)

    const updateQuery=`
      update users
      set ${updateFields.join(",")}
      where id = ${updateValues.length}
    `
    const userUpdated = await PostgresHelper.query(
      updateQuery,
      updateValues
    )

    return userUpdated
  }
}