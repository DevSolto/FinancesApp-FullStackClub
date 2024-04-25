import { v4 as uuidV4 } from "uuid"
import bcrypt from "bcrypt"
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js"
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js"

export class CreateUserUseCase {
  async execute(createUserParams) {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const userWithThisEmail = await getUserByEmailRepository.execute(createUserParams.email)
    
    if(userWithThisEmail){
      throw new Error("The provided email is already in use.")
    }

    const userId = uuidV4()
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    }

    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    
    const userCreated = await postgresCreateUserRepository.execute(user)
    
    return userCreated
  }
}