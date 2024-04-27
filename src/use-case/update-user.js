import bcrypt from "bcrypt"
import { EmailAlreadyInUseError } from "../errors/user.js"
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js"
import { PostgresUpdateUserRepository } from "../repositories/postgres/update-user"

export class UpdateUserUseCase {
  async execute(userId, updateUserParams) {
    if (updateUserParams.email) {
      const postgresGetUserByIdRepository = new PostgresGetUserByEmailRepository()

      const userWithProvidedEmail = await postgresGetUserByIdRepository.execute(updateUserParams.email)

      if (userWithProvidedEmail) {
        throw new EmailAlreadyInUseError(updateUserParams.email)
      }
    }

    const user = {
      ...updateUserParams
    }
    if (updateUserParams.passWord) {
      const hashedPassword = await bcrypt.hash(updateUserParams.passWord, 10)
      user.passWord = hashedPassword
    }

    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

    const updatedUser = postgresUpdateUserRepository.execute(user)

    return updatedUser
  }
}