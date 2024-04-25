import { badRequest, notFound, ok, serverError } from "./helpers.js";
import { GetUserByIdUseCase } from "../use-case/get-user-by-id.js"
import validator from "validator";


export class GetUserByIdController{
  async execute(httpRequest){
    try {
      const userId = httpRequest.params.userId
      const isIdValid = validator.isUUID(userId)
      if(!isIdValid){
        return badRequest({
          message:'The provided  id is not valid.'
        })
      }
      const getUserByIdUseCase = new GetUserByIdUseCase()

      const user = await getUserByIdUseCase.execute(userId)
      console.log(user);
      if(!user){
        return notFound({
          message:"User not Found"
        })
      }

      return ok(user)
    } catch (error) {
      console.log(error);
      return serverError()
    }
  }
}