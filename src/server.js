import 'dotenv/config'

import express from "express"
import { CreateUserController } from './controllers/create-user.js'

const app = express()

app.use(express.json())

app.post("/api/users",async (req, res)=>{
  const createUserController = new CreateUserController()

  const response = await createUserController.execute(req)

  res.status(response.statusCode).json(response.body)
})

app.listen(process.env.PORT,()=>{
  console.log(`Listening port ${process.env.PORT}`);
})