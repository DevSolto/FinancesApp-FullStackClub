import 'dotenv/config'

import express from "express"
import { CreateUserController } from './controllers/create-user.js'
import { GetUserByIdController } from './controllers/get-user-by-id.js'

const app = express()

app.use(express.json())

app.post("/api/users",async (req, res)=>{
  const createUserController = new CreateUserController()

  const response = await createUserController.execute(req)

  res.status(response.statusCode).json(response.body)
})

app.get("/api/users/:userId", async (req, res)=>{
  const getUserByIdController = new GetUserByIdController()
  
  const response = await getUserByIdController.execute(req) 
  
  res.status(response.statusCode).json(response.body)
})

app.listen(process.env.PORT,()=>{
  console.log(`Listening port ${process.env.PORT}`);
})