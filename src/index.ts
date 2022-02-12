import express, { Application, Request, Response } from 'express'
import logger from 'morgan'
import client from './database'


const PORT = 5000
const app: Application = express()

app.use(logger('dev'))

app.get('/', async (req: Request, res: Response) => {
  try {
    const conn = await client.connect()
    const sql = 'SELECT * FROM products'
    const result = await conn.query(sql)
    conn.release()
    console.log(result.rows)
    res.send(result.rows)

  }
  catch (err) {
    console.log(err)
    res.send(err)
  }
})


app.listen(PORT, () => {
  console.log(`Server is runing at port:${PORT}`)
})

export default app
