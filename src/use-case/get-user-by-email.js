import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";

export class GetUserByEmailUseCase{
  async execute(userEmail){
    const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository()

    const user = await postgresGetUserByEmailRepository.execute(userEmail)

    return user
  }
}