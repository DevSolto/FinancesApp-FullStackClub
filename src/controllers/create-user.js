import { CreateUserUseCase } from "../use-case/create-user.js"

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const requiredFields = ["first_name", "last_name", "email", "password"]

      for (const field in requiredFields) {
        if (!params[requiredFields[field]] || params[requiredFields[field]].trim().length === 0) {
          return {
            statusCode: 400,
            body: {
              errorMessage: `Missing param: ${requiredFields[field]}`
            }
          }
        }
      }

      const createUserUseCase = new CreateUserUseCase()

      const createdUser = await createUserUseCase.execute(params)

      return {
        statusCode: 201,
        body: {
          errorMessage: createdUser
        }
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        body: {
          errorMessage: "Internal server error"
        }
      }
    }
  }
}