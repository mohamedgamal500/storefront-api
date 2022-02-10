import express, { Application, Request, Response } from 'express'
import logger from 'morgan'

const PORT = 5000
const app: Application = express()

app.use(logger('dev'))

app.get('/', (req: Request, res: Response): void => {
  res.send('storefront api!')
})


app.listen(PORT, () => {
  console.log(`Server is runing at port:${PORT}`)
})

export default app
