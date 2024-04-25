import validator from "validator"
import { CreateUserUseCase } from "../use-case/create-user.js"
import { badRequest, created, serverError } from "./helpers.js"

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const requiredFields = [
        "first_name", 
        "last_name", 
        "email", 
        "password"
      ]

      for (const field in requiredFields) {
        if (!params[requiredFields[field]] || params[requiredFields[field]].trim().length === 0) {
          return badRequest({
            message:`Missing param: ${requiredFields[field]}`
          })
        }
      }

      const passwordIsValide = params.password.length > 6

      if(!passwordIsValide){
        return badRequest({
          message:"Password must be at least 6 characters."
        })
      }

      const emailIsValid = validator.isEmail(params.email)

      if (!emailIsValid){
        return badRequest({
          message:"Invalide email. Please provide a valide one."
        })
      }

      const createUserUseCase = new CreateUserUseCase()

      const createdUser = await createUserUseCase.execute(params)

      return created(createdUser)

    } catch (error) {

      console.log(error)
      return serverError()
    }
  }
}