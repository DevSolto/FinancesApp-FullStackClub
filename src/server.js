import 'dotenv/config'

import express from "express"

import {PostgresHelper} from "./database/postgres/helper.js"

const app = express()

app.get("/", async (req, res) => {
  try {
    const results = await PostgresHelper.query("SELECT * FROM users;");
    res.send(JSON.stringify(results));
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).send('Erro ao processar a solicitação');
  }
});

app.listen(3333,()=>{
  console.log("deu certo");
})