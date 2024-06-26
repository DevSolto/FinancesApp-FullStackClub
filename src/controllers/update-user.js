import validator from "validator"
import { badRequest, ok, serverError } from "./helpers.js"
import { UpdateUserUseCase } from "../use-case/update-user.js"
import { EmailAlreadyInUseError } from "../errors/user.js"

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId

      const isIdValid = validator.isUUID(userId)

      if (!isIdValid) {
        return badRequest({
          message: ' The provide ID is not valid.'
        })
      }

      const updateUserParams = httpRequest.body

      const allowedFields = ['first_name', 'last_name', 'email', 'password']

      const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
        (field) => allowedFields.includes(field)
      )

      if (!someFieldIsNotAllowed) {
        return badRequest({
          message: 'Some provide field is not allowed'
        })
      }

      if (updateUserParams.password) {
        const passwordIsNotValid = updateUserParams.password.length < 6

        if (passwordIsNotValid) {
          return badRequest({
            message: 'Password must be at least 6 characters'
          })
        }
      }

      if (updateUserParams.email) {
        const emailIsNotValid = !validator.isEmail(updateUserParams.email)

        if (emailIsNotValid) {
          return badRequest({
            message: 'Invalid email. Please provide a valid one.'
          })
        }
      }

      const updateUserUseCase = new UpdateUserUseCase()

      const updatedUser = await updateUserUseCase.execute(userId,updateUserParams)

      return ok(updatedUser)
    } catch (error) {
      if(error instanceof EmailAlreadyInUseError){
        return badRequest({
          message: error.message
        })
      }
      console.log(error)
      return serverError()
    }
  }
}