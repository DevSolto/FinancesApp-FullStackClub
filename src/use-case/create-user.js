import { v4 as uuidV4 } from "uuid"
import bcrypt from "bcrypt"
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js"

export class CreateUserUseCase {
  async execute(createUserParams) {
    // TODO: Verificar se o email ja existe


    const userId = uuidV4()
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    }

    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    return await postgresCreateUserRepository.execute(user)
  }
}